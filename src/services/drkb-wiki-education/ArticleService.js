import {apiRequest, configureUrlParams} from "../ApiService";
import {API_URLS} from "../../constants/ApiUrls";

export const getAllArticlesByCourse = async (courseId) => {
    const params = configureUrlParams({courseId: courseId})
    return await apiRequest(`${API_URLS.COURSE}/get-all-article-by-course?${params}`);
}

export const getArticleById = async (articleId) => {
    const params = configureUrlParams({idArticle: articleId});
    return await apiRequest(`${API_URLS.COURSE}/get-by-id-article?${params}`);
}