import axios from 'axios';

const FTrClient = axios.create({
    baseURL: process.env.BACKEND_URL,
    timeout: 1000
});


export default FTrClient;