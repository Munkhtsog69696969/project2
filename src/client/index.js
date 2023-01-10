import axios from "axios";

export const client = axios.create({
    baseURL: "https://spotify5.onrender.com",
    headers: {
        Accept: "application/json",
    }
})
