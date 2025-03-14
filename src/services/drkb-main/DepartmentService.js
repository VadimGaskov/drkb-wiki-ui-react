import {apiRequest, configureUrlParams} from "../ApiService";
import {API_URLS} from "../../constants/ApiUrls";

export const getAllDepartment = async () => {
    return await apiRequest(`${API_URLS.DEPARTMENT}/get-all`);
}

export const getDepartmentById = async (departmentId) => {
    const params = configureUrlParams({departmentId: departmentId});
    return await apiRequest(`${API_URLS.DEPARTMENT}/get-by-id?${params}`);
}