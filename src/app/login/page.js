"use client"
import styles from "./clientLogin.module.css"
import useUserStore from "../../../stores/useUserStore"
import { Open_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState,} from "react";
import { sendLoginForm } from "../../../functions/api/sendLoginform";

const OpenSans = Open_Sans ({
    subsets: ["latin", "greek"],
    weight: ["400", "600", "800"],
    style: ["italic", "normal"]
})

export default function Login () {

    const setApiResponse = useUserStore((state) => state.setApiResponse);
    const router = useRouter()
    const [status, setStatus] = useState("")



    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { id, value,} = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await sendLoginForm(formData);
            setApiResponse(response);
            // console.log("apiResponse:", response);
    
            if (response.message === "Login successful") {
                if (response.data.role === "Admin") {
                    router.push("/AdminDashboard");
                } else {
                    router.push("/ClientDashboard");
                }
            } else {
                setStatus("The password or email you entered is incorrect");
            }
        } catch (error) {
            console.error("Error:", error);
            setStatus("An error occurred while logging in. Please try again.");
        }
    };

    return(
        <div className={styles.wrapper}>
            <div className>Login to your profile</div>
            <form className={styles.forms} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Eneter the email you registered with" value={formData.email} onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Your password you registered with" value={formData.password} onChange={handleChange} required/>
                </div>
                <div><button type="submit" >login</button></div>
            </form>
            <div> {status} </div>

                    <style jsx global>{`
      body {
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