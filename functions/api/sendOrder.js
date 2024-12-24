import axios from "axios";
import useUserStore from "../../stores/useUserStore"

export const sendOrder = async (orderData) => {
    try {
        const users = useUserStore.getState().apiResponse;
        const token = users[1]?.data?.access_token;

        if (!token) {
            throw new Error("Authorization token is missing");
        }

    
        const resp = await axios.post(
            'https://mesh-1-1.onrender.com/mesh/api/orders',
            orderData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Order successfully sent:', resp.data);
        return resp.data;
    } catch (error) {
        console.error('Error sending form data:', error);
        throw error;
    }
};