"use client"

import { useEffect, useState } from 'react';
import useUserStore from '../../../stores/useUserStore';
import Link from 'next/link';
import styles from "./createOrder.module.css"

export default function CreateOrder() {
    const users = useUserStore((state) => state.apiResponse);
    const setApiResponse = useUserStore((state) => state.setApiResponse);
    const [status, setStatus] = useState("");
    const [orderData, setOrderData] = useState({
        startDate: "",
        endDate: "",
        totalAmount: "",
        description: "",
    });

    const [quoteId, setQuoteId] = useState(null);

    useEffect(() => {
        // Ensure the user data is valid before accessing it
        if (users && users.length > 1 && users[1] && users[1].data && users[1].data.user) {
            setQuoteId(users[1].data.user.id);
        } else {
            setQuoteId(null); // Fallback in case the data is not available
        }
    }, [users]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setOrderData((prev) => ({
            ...prev,
            [id]: id === "totalAmount" ? parseFloat(value) || "" : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await sendOrder(orderData);
            setApiResponse(response);
            setOrderData({
                startDate: "",
                endDate: "",
                totalAmount: "",
                description: "",
            });
            setStatus("Your order has been sent");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.nav}>
                <div className={styles.logo}><Link href="/ClientDashboard"><img src="../images/home_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" title="Dashboard" /></Link></div>
                <div className={styles.navList}><Link href="/ClientDashboard"><img src="../images/history_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" /></Link></div>
                <div className={styles.logOut}><Link href="/createOrder"><img src="../images/add_circle_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" title="create new order" /></Link></div>
            </div>
            <div className={styles.main}>
                <div className={styles.head}>
                    <div>Dashboard</div>
                    <div>
                        {users && users.length > 1 && users[1] && users[1].data ? (
                            <div>{users[1]?.data?.user?.name}</div>
                        ) : (
                            <div>Loading...</div>
                        )}
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
                            <div><label htmlFor="totalAmount">How many pieces would you like to order</label></div>
                            <div><input id="totalAmount" type="number" value={orderData.totalAmount} placeholder="how much Goods do you want to purchase" onChange={handleChange} required /></div>
                        </div>
                        <div>
                            <div><label htmlFor="description">Describe the product you want to order</label></div>
                            <div><textarea id="description" rows="5" cols="30" maxLength="200" wrap="hard" spellCheck="true" value={orderData.description} onChange={handleChange} placeholder="I would like to order...." required /></div>
                        </div>
                        <div><button type="submit" onClick={handleSubmit}>Send order</button></div>
                        <div>{status}</div>
                    </form>
                </div>
            </div>
        </div>
    );
}

async function sendOrder(orderData) {
    // Replace this with the actual API call to send the order
    return new Promise((resolve) => {
        setTimeout(() => resolve({ message: 'Order sent successfully' }), 2000);
    });
}