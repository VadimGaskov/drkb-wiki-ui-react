import {API_URLS} from "../../constants/ApiUrls";
import {apiRequest, configureUrlParams} from "../ApiService";

export const getAllTest = async () => {
    return await apiRequest(`${API_URLS.TEST}/get-all-test`);
}

export const getTestById = async (testId) => {
    const params = configureUrlParams({idTest: testId});
    return await apiRequest(`${API_URLS.TEST}/get-by-id-test?${params}`);
}

export const getTestByArticle = async (articleId) => {
    const params = configureUrlParams({articleId: articleId});
    return await apiRequest(`${API_URLS.TEST}/get-all-test-by-article?${params}`);
}