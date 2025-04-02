import {API_URLS} from "../../constants/ApiUrls";
import {apiRequest, configureUrlParams} from "../ApiService";

export const getAllTest = async () => {
    return await apiRequest(`${API_URLS.TEST}/get-all-test`);
}