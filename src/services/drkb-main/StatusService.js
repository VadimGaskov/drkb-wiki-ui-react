import {apiRequest} from "../ApiService";
import {API_URLS} from "../../constants/ApiUrls";

export const getAllStatuses = async () => {
    return await apiRequest(`${API_URLS.STATUSES}/get-all-right`);
}