import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

    api.interceptors.response.use((response) => response,
        (error) => {
            if (error?.response?.status === 401) {
                redirect('/sign-in')
            }
        })

    return api;
};

