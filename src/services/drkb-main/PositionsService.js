import {apiRequest} from "../ApiService";
import {API_URLS} from "../../constants/ApiUrls";

export const getAllPositions = async () => {
    return await apiRequest(`${API_URLS.POSITIONS}/get-all-position`);
}