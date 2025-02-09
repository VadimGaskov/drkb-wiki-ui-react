import {API_URLS} from "../../constants/ApiUrls";

export const getAllEnvironmentModels = async () => {
    try {
        const response = await fetch(`${API_URLS.ENVIRONMENT_MODEL}/get-all`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw error; // Бросаем ошибку для обработки на уровне компонента
    }
};