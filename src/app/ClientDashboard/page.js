"use client"

import styles from "./ClientDashboard.module.css"
import { Open_Sans } from "next/font/google"
import useUserStore from "../../../stores/useUserStore"
import Link from "next/link"

const OpenSans = Open_Sans ({
    style: ["italic", "normal"],
    weight: ["300","400","500","600","700","800"],
    subsets: ["greek", "latin"]
})
export default function ClientDashboard () {
    const userData = useUserStore((state) => state.apiResponse)
    const userOrder = useUserStore((state) => state.apiResponse[0])
    console.log(userData);
    
    return(
        <div className={styles.wrapper}>
            <div className={styles.nav}>
                <div className={styles.logo}><Link href="/ClientDashboard"><img src="../images/home_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" title="Dashboard" /></Link></div>
                <div className={styles.navList}><Link href="/ClientDashboard"><img src="../images/history_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" /></Link></div>
                <div className={styles.logOut}><Link href="/createOrder"><img src="../images/add_circle_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" title="create new order" /></Link></div>
            </div>
            <div className={styles.main}>
                    <div>
                <div className={styles.head}>
                    <div>Dashboard</div>
                    <div>
                        {userData&&<div>{userData[1].data?.user?.name}</div>}
                        <img src="../images/Empty Profile Icon.jpeg" />
                    </div>
                    </div>
                    <div className={styles.ourProducts}>
                        <div>Our Products</div>
                        <div>
                        <div><img src="../images/pexels-expect-best-79873-323776.jpg" /></div>
                        <div><img src="../images/pexels-cal-david-231581-735319.jpg" /></div>
                        <div><img src="../images/pexels-pixasquare-1115804.jpg" /></div>
                        <div><img src="../images/pexels-steffen-coonan-1005786-2098624.jpg" /></div>
                        </div>
                    </div>
                    <div className={styles.third}>
                    <div className={styles.myOrders}>
                        <div>My orders</div>
                        {userOrder && Object.keys(userOrder).length > 0 ? (
                            Object.entries(userOrder).map(([key, value]) => (
                                <div key={key}>
                                    {key}: {value}
                                </div>
                            ))
                        ) : (
                            <div>You have no order</div>
                        )}
                        <div><Link href="/createOrder">create a order</Link></div>
                    </div>
                    <div className={styles.tracking}>
                        <div>Status on your order</div>
                    </div>
                    <div className={styles.quotes}>
                        <div>Contractor Quotes</div>
                    </div>
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