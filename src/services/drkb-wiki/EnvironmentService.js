import {API_URLS} from "../../constants/ApiUrls";
import {apiRequest, configureUrlParams} from "../ApiService";

export const getAllEnvironmentsByModelId = async (environmentModelId) => {
    const params = configureUrlParams({environmentModelId: environmentModelId});
    return await apiRequest(`${API_URLS.ENVIRONMENT}/get-all-by-model-id?${params}`);
    /*try {
        const params = new URLSearchParams({environmentModelId: environmentModelId}).toString();
        const response = await fetch(`${API_URLS.ENVIRONMENT}/get-all-by-model-id?${params}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw error; // Бросаем ошибку для обработки на уровне компонента
    }*/
};