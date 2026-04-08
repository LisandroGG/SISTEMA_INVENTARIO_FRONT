import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "htpp://localhost:3000",
    withCredentials: true,
})

export default axiosInstance;