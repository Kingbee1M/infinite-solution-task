import axios from "axios";

export const sendOrder = async (orderData) => {
    try {
        const resp = await axios.post('https://mesh-1-1.onrender.com/mesh/api/orders', orderData)
        console.log();
        
        return resp.data
    } catch (error){
        console.error('error sending form data', error)
        throw error
    }
}