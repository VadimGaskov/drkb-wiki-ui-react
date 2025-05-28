import {apiRequest, configureUrlParams} from "../ApiService";
import {API_URLS} from "../../constants/ApiUrls";

export const getAllUsers = async () => {
    return await apiRequest(`${API_URLS.USER}/get-all-user`);
}

export const getUserById = async (userId) => {
    const params = configureUrlParams({idUser: userId});
    return await apiRequest(`${API_URLS.USER}/get-user?${params}`);
}

export const createUser = async (user) => {
    return await apiRequest(`${API_URLS.USER}/create-user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }, false);
}

export const updateUser = async (user) => {
    return await apiRequest(`${API_URLS.USER}/update-user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }, false);
} 