import axios from "axios";

export const sendLoginForm = async (formData) => {
    try {
        const resp = await axios.post('https://mesh-1-1.onrender.com/mesh/api/auth/login', formData)
        console.log();
        
        return resp.data
    } catch (error){
        console.error('error sending form data', error)
        throw error
    }
}

// response
// {
//     "statusCode": 201,
//     "message": "Login successful",
//     "data": {
//         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhpdHRlckBnbWFpbC5jb20iLCJzdWIiOjQwLCJpYXQiOjE3MzQ3MTIyMTYsImV4cCI6MTczNDcxNTgxNn0.WmOQSrTvGPPq4RO9GRtufA8CMd6ytu_3-TaEtGi3GsY",
//         "user": {
//             "id": 40,
//             "email": "hitter@gmail.com",
//             "name": "habeeb idris",
//             "role": "Client"
//         }
//     }
// }