import {apiRequest, configureUrlParams} from "../ApiService";
import {API_URLS} from "../../constants/ApiUrls";
import {buildListQueryParams} from "../../utils/queryParamsHelper";

export const getAllDepartment = async () => {
    return await apiRequest(`${API_URLS.DEPARTMENT}/get-all`);
}

export const getAllDepartmentByUserDepartments  = async (departmentIds) => {
    const urlParams = buildListQueryParams(departmentIds)
    return await apiRequest(`${API_URLS.DEPARTMENT}/get-all-by-user-departments?${urlParams}`);
}

export const getAllDepartmentWithUsers = async () => {
    return await apiRequest(`${API_URLS.DEPARTMENT}/get-all-with-users`);
}


export const getDepartmentById = async (departmentId) => {
    const params = configureUrlParams({departmentId: departmentId});
    return await apiRequest(`${API_URLS.DEPARTMENT}/get-by-id?${params}`);
}