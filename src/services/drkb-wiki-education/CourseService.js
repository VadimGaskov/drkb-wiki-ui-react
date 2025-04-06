import {apiRequest, configureUrlParams} from "../ApiService";
import {API_URLS} from "../../constants/ApiUrls";

export const getAllCourses = async () => {
    return await apiRequest(`${API_URLS.COURSE}/get-all-courses`);
}

export const getCourseById = async (courseId) => {
    const params = configureUrlParams({idCourse: courseId});
    return await apiRequest(`${API_URLS.COURSE}/get-by-id-course?${params}`);
}