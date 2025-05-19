import {apiRequest, configureUrlParams} from "../ApiService";
import {API_URLS} from "../../constants/ApiUrls";

export const getAllArticlesByCourse = async (courseId) => {
    const params = configureUrlParams({courseId: courseId})
    return await apiRequest(`${API_URLS.COURSE}/get-all-article-by-course?${params}`);
}

export const getAllArticles = async () => {
    return await apiRequest(`${API_URLS.COURSE}/get-all-article`);
}

export const getArticleById = async (articleId) => {
    const params = configureUrlParams({idArticle: articleId});
    return await apiRequest(`${API_URLS.COURSE}/get-by-id-article?${params}`);
}

export const updateArticle = async (article) => {
    return await apiRequest(`${API_URLS.COURSE}/update-article`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(article)
    }, false)
}

export const createArticle = async (article) => {
    return await apiRequest(`${API_URLS.COURSE}/create-article`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(article)
    }, false);
}