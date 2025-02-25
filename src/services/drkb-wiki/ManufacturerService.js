import {API_URLS} from "../../constants/ApiUrls";
import {apiRequest} from "../ApiService";

export const getAllManufacturers = async () => {
    return await apiRequest(`${API_URLS.MANUFACTURER}/get-all`);
    /*try {
        const response = await fetch(`${API_URLS.MANUFACTURER}/get-all`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw error; // Бросаем ошибку для обработки на уровне компонента
    }*/
};