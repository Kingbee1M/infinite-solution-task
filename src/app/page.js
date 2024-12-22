"use client"

// import Image from "next/image";
import { Open_Sans } from "next/font/google";
import styles from "./landingPage.module.css"
import Link from "next/link";
import { usePathname } from "next/navigation";

  const OpenSans = Open_Sans({
    subsets: ["latin", "greek"],
    weight: ["300", "400", "600", "800"],
    style: ["italic", "normal"]
  })

export default function Home() {

  return (
    <div className={styles.divClass}>
      <div  className={styles.wel}>Welcome to david's Fish feed Production industry</div>
      <div>would you like to login as a :</div>
      <div className={styles.choice}>
        <div><Link href="/login"><button>Client</button></Link></div>
        <div><Link href="/Adminlogin"><button className={styles.button}>Admin</button></Link></div>
      </div>
      <div>don't have an account? <Link href="/signup"><button>sign up</button></Link></div>
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
