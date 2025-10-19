import axios from "axios";
 

// axios.defaults.baseURL = 'https://notehub-public.goit.study/api'
// axios.defaults.baseURL = 'http://localhost:3000/api'
export const nextServer = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
    withCredentials: true,
})

