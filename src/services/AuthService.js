import {API_URLS} from "../constants/ApiUrls";
import axios from "axios";
import {apiRequest} from "./ApiService";
import {jwtDecode} from "jwt-decode";
import {clearToken} from "../utils/authHelper";

export const login = async (login, password) => {
    return await apiRequest(`${API_URLS.AUTH}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({login: login, password: password}),
    });
}

export const logout = () => {
    clearToken();
}
