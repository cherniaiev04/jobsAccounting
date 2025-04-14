import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5001/api', // Change based on your backend
    withCredentials: true, // ✅ Allows sending cookies with requests
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;
