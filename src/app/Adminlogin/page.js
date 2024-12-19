"use client"

import styles from "./AdminLogin.module.css"
import useUserStore from "../../../stores/useUserStore"
import { Open_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";

const OpenSans = Open_Sans ({
    subsets: ["latin", "greek"],
    weight: ["400", "600", "800"],
    style: ["italic", "normal"]
})

export default function Adminlogin () {

    const populateUserAdmin = useUserStore((state) => state.populateUserAdmin);
    const user = useUserStore((state) => state.user);
    const router = useRouter()

      useEffect(() => {
        populateUserAdmin();
      }, [populateUserAdmin]);

      function keycheck(objA, objB) {
        for (const key in objA) {
            if (objA[key] !== objB[key]) {
                return false;
            }
        }
        return true;
    }
    
      function checkuser() {
        for (let i = 0; i < user.length; i++) {
            if (keycheck(formData, user[i])) {
                return true;
            }
        }
        return false;
    }

    const [formData, setFormData] = useState({
        fullName: "",
        password: ""
    })

    const handleChange = (e) => {
        const { id, value,} = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isUserValid = keycheck()
        if (isUserValid) {
            router.push("/ClientDashboard");
        }
        else {
            console.log("your userNmae or password was incorrect")
        }
        
    }

    return(
        <div className={styles.wrapper}>
            <div className="">Login to your Admin profile profile</div>
            <form className={styles.forms} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fullName">Username</label>
                    <input type="text" id="fullName" placeholder="Your full name you registered with" value={formData.fullName} onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Your password you registered with" value={formData.password} onChange={handleChange} required/>
                </div>
                <div><button type="submit" >login</button></div>
            </form>

                    <style jsx global>{`
      body {
        background-image: url('./images/diogo-nunes-2BAqw7DwMdg-unsplash.jpg');
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
      }
    `}</style>
        </div>
    )
}