"use client";

import { useState } from "react";
import styles from "./signup.module.css";
import useUserStore from "../../../stores/useUserStore";
import { useRouter } from "next/navigation";
import { sendFormData } from "../../../functions/api/sendFormData";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const setApiResponse = useUserStore((state) => state.setApiResponse);
  const router = useRouter();
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRadioChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      role: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendFormData(formData); // Send form data to the API
      setApiResponse(response); // Store the API response in Zustand state
      console.log(response);

      if (response?.message === "User registered successfully") {
        router.push("/login");
      } else {
        setStatus("This email is already in use");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("An error occurred during registration. Please try again."); // Handle API errors
    }
  };

  return (
    <div className={styles.formDiv}>
      <form className={styles.forms} onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="name">Name</label>
          </div>
          <div>
            <input
              type="text"
              id="name"
              required
              placeholder="First-Name Last_Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <input
              type="email"
              id="email"
              required
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="password">Password</label>
          </div>
          <div>
            <input
              type="password"
              id="password"
              required
              placeholder="Please use a strong password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.labelbtn}>
          <fieldset>
            <legend>You are signing up as:</legend>
            <label>
              <input
                type="radio"
                name="role"
                value="Client"
                checked={formData.role === "Client"}
                onChange={handleRadioChange}
                required
              />
              Client
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="Admin"
                checked={formData.role === "Admin"}
                onChange={handleRadioChange}
                required
              />
              Admin
            </label>
          </fieldset>
        </div>
        <div>{status}</div>
        <button type="submit">Register</button>
      </form>
      <style jsx global>{`
        body {
        background-color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
      `}</style>
    </div>
  );
}