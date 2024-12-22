"use client"

import useUserStore from "../../../stores/useUserStore"
import Link from "next/link";
import { useState } from "react";
import { Open_Sans } from "next/font/google";
import styles from "./createOrder.module.css"
import { sendOrder } from "../../../functions/api/sendOrder";

const OpenSans = Open_Sans ({
    subsets: ["latin", "greek"],
    weight: ["400", "600", "800"],
    style: ["italic", "normal"]
})

export default function CreateOrder () {
    const users = useUserStore((state) => state.apiResponse)
    const setApiResponse = useUserStore((state) => state.setApiResponse);
    const quoteId = users[1].data.user.id || null
    const [orderData, setOrderData] = useState({
        startDate: "",
        endDate: "",
        totalAmount: "",
        description: "",
    })

    orderData.quoteId = quoteId

    const handleChange = (e) => {
        const { id, value } = e.target;
        setOrderData((prev) => ({
            ...prev,
            [id]: id === "totalAmount" ? parseFloat(value) || "" : value,
        }));
    };

    console.log(typeof orderData.totalAmount)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(orderData);
            const response = await sendOrder(orderData);
            setApiResponse(response);
        } catch (error) {
            console.error("Error:", error)
        }
    }

    console.log(users);
    
    return(
        <div className={styles.wrapper}>
            <div className={styles.nav}>
                <div className={styles.logo}><Link href="/ClientDashboard"><img src="/images/home_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" title="Dashboard" /></Link></div>
                <div className={styles.navList}><Link href="/ClientDashboard"><img src="/images/history_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" /></Link></div>
                <div className={styles.logOut}><Link href="/createOrder"><img src="/images/add_circle_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" title="create new order" /></Link></div>
            </div>
            <div className={styles.main}>
                    <div>
                <div className={styles.head}>
                    <div>Dashboard</div>
                    <div>
                        <div>{users[1].data.user.name}</div>
                        <img src="../images/Empty Profile Icon.jpeg" />
                    </div>
                    </div>
                    <div className={styles.formDiv}>
                        <form>
                            <div className={styles.title}>Create an Order</div>
                            <div className={styles.dates}>
                            <div>
                                <div><label htmlFor="startDate">Start Date</label></div>
                                <div><input id="startDate" type="date" value={orderData.startDate} placeholder="Enter the starting date" onChange={handleChange} required /></div>
                            </div>
                            <div>
                                <div><label htmlFor="endDate">End Date</label></div>
                                <div><input id="endDate" type="date" value={orderData.endDate} placeholder="Enter the Ending date" onChange={handleChange} required /></div>
                            </div>
                            </div>
                            <div>
                                <div><label htmlFor="totalAmount">How many peices would you like to order</label></div>
                                <div><input id="totalAmount" type="number" value={orderData.totalAmount} placeholder="how much Goods do you wan to purchase" onChange={handleChange} required /></div>
                            </div>
                            <div>
                                <div><label htmlFor="description">Describe the product you want to order</label></div>
                                <div><textarea id="description" rows="5" cols="30" maxLength="200" wrap="hard" spellCheck="true" value={orderData.description} onChange={handleChange} placeholder="i would like to order...." required /></div>
                            </div>
                            <div><button type="submit" onClick={handleSubmit}>Send order</button></div>
                        </form>
                    </div>
                </div>
            </div>
            <style jsx global>{`
                    html, body {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                }

                body {
                    overflow-x: hidden;
                    overflow-y: auto;
                }
            `}</style>
        </div>
    )
}