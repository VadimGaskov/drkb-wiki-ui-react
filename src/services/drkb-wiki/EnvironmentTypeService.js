import {API_URLS} from "../../constants/ApiUrls";

export const getAllEnvironmentType = async () => {
    try {
        const response = await fetch(`${API_URLS.ENVIRONMENT_TYPE}/get-all`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw error; // Бросаем ошибку для обработки на уровне компонента
    }
};