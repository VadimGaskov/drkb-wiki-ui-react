import {apiRequest, configureUrlParams} from "../ApiService";
import {API_URLS} from "../../constants/ApiUrls";

export const getAllRights = async () => {
    return await apiRequest(`${API_URLS.RIGHTS}/get-all-right`);
}

export const getRightById = async (rightId) => {
    const params = configureUrlParams({idRight: rightId});
    return await apiRequest(`${API_URLS.RIGHTS}/get-right?${params}`);
}