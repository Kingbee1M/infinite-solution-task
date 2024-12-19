"use client"

import { useState, useEffect } from 'react';
import styles from './login.module.css';
import useUserStore from '../../../stores/useUserStore';
import { useRouter } from 'next/navigation';

export default function signup () {
  const [formData, setFormData] = useState({
    fullName: '',
    Address: '',
    businessName: '',
    password: '',
    profilPic: null,
  });

  const addUser = useUserStore((state) => state.addUser);
  const populateUser = useUserStore((state) => state.populateUser);
  const user = useUserStore((state) => state.user);
  const router=useRouter()

  useEffect(() => {
    populateUser();
  }, [populateUser]);

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
  
    if (type === 'file' && files[0]) {
      const file = files[0];
  
      // Create a FileReader to convert the image to Base64
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          [id]: reader.result,
        }));
      };
  
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(formData);
    router.push("/ClientLogin")


    setTimeout(() => {
      console.log(user);
    }, 100);
  };

  return (
    <div className={styles.formDiv}>
      <form className={styles.forms} onSubmit={handleSubmit}>
        <div>
          <div><label htmlFor="fullName">Name</label></div>
          <div><input type="text" id="fullName" required placeholder="First-Name Last_Name" value={formData.fullName} onChange={handleChange} /></div>
        </div>
        <div>
          <div><label htmlFor="Address">Address</label></div>
          <div><input type="text" id="Address" required placeholder="e.g shop no. street name, city, state" value={formData.Address} onChange={handleChange} /></div>
        </div>
        <div>
          <div><label htmlFor="businessName">What is the name of your retail business?</label></div>
          <div><input type="text" id="businessName" required placeholder="e.g Catlyn Ventures" value={formData.businessName} onChange={handleChange} /></div>
        </div>
        <div>
          <div><label htmlFor="password">Password</label></div>
          <div><input type="password" id="password" required placeholder="Please use a password containing a capital letter, symbols, and numbers" value={formData.password} onChange={handleChange} /></div>
        </div>
        <div>
          <div><label htmlFor="profilPic">Please upload your photo</label></div>
          <div><input type="file" id="profilPic" accept="image/*" onChange={handleChange} required /></div>
        </div>
        <button type="submit">Register</button>
      </form>
      <style jsx global>{`
        body {
          background-image: url('./images/diogo-nunes-2BAqw7DwMdg-unsplash.jpg');
          background-size: cover;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
      `}</style>
    </div>
  );
}