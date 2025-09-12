import axios from "axios";
import { cookies } from "next/headers";

export const univerAPI = axios.create({
    baseURL: process.env.API_BASE_URL
})


export const getApiSSR = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;

    const api = axios.create({
        baseURL: process.env.API_BASE_URL,
    });

    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    return api;
};