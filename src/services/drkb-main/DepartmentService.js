import {apiRequest} from "../ApiService";
import {API_URLS} from "../../constants/ApiUrls";

export const getAllDepartment = async () => {
    return await apiRequest(`${API_URLS.DEPARTMENT}/get-all`);
}