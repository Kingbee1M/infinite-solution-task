import axios from "axios";

export const sendFormData = async (formData) => {
    try {
        const resp = await axios.post('https://mesh-1-1.onrender.com/mesh/api/auth/register', formData)
        console.log();
        
        return resp.data
    } catch (error){
        console.error('error sending form data', error)
        throw error
    }
}

        // {
        //     "statusCode": 201,
        //     "message": "User registered successfully",
        //     "data": {
        //         "id": 40,
        //         "email": "hitter@gmail.com",
        //         "name": "habeeb idris",
        //         "role": "Client"
        //     }
        // }