import {apiRequest, configureUrlParams} from "../ApiService";
import {API_URLS} from "../../constants/ApiUrls";

export const getAllCourses = async () => {
    return await apiRequest(`${API_URLS.COURSE}/get-all-courses`);
}

export const getCourseById = async (courseId) => {
    const params = configureUrlParams({idCourse: courseId});
    return await apiRequest(`${API_URLS.COURSE}/get-by-id-course?${params}`);
}

export const createCourse = async (course) => {
    console.log(`${API_URLS.COURSE}/create-course-with-user-and-articles`);
    return await apiRequest(`${API_URLS.COURSE}/create-course-with-user-and-articles`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(course)
    }, false);
}