import axios from "axios";

export const mockAPI = axios.create({
    baseURL: process.env.API_BASE_URL
})