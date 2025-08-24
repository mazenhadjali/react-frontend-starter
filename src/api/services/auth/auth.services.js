// services/auth.js

import axiosClient from "@/api/axiosClient";
import { AuthEndpoints } from "../../endpoints";

const STORAGE_KEYS = {
    ACCESS_TOKEN: "access_token",
};

const setTokens = ({ token }) => {
    if (token) localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
};

const clearTokens = () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
};

export const auth = {
    async login({ username, password }) {
        // Expect API to return: { accessToken, refreshToken, user }
        const { data } = await axiosClient.post(AuthEndpoints.login(), { username, password });
        setTokens(data);
        return data; // { token }
    },

    async me() {
        const { data } = await axiosClient.get(AuthEndpoints.me());
        return data;
    },

    async logout() {
        clearTokens();
    },

    isAuthenticated() {
        return Boolean(localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN));
    },
};
