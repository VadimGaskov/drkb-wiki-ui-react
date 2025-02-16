import {API_URLS} from "../../constants/ApiUrls";

export const getAllEnvironmentsByModelId = async (environmentModelId) => {
    try {
        const params = new URLSearchParams({environmentModelId: environmentModelId}).toString();
        const response = await fetch(`${API_URLS.ENVIRONMENT}/get-all-by-model-id?${params}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw error; // Бросаем ошибку для обработки на уровне компонента
    }
};