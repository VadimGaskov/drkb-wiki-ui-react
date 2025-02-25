import {API_URLS} from "../../constants/ApiUrls";
import {apiRequest, configureUrlParams} from "../ApiService";

export const getAllCommonDocument = async () => {
    return await apiRequest(`${API_URLS.COMMON_DOCUMENT}/get-all`);

    /*try {
        const response = await fetch(`${API_URLS.COMMON_DOCUMENT}/get-all`);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        return "Ошибка";
    }*/
}

export const getAllByEnvironmentModel = async (idModel) => {
    const params = configureUrlParams({environmentModelId: idModel});
    return await apiRequest(`${API_URLS.COMMON_DOCUMENT}/get-all-by-environment-model?${params}`);
    /*try {
        const params = new URLSearchParams({environmentModelId: idModel}).toString();
        const response = await fetch(`${API_URLS.COMMON_DOCUMENT}/get-all-by-environment-model?${params}`);
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }*/
}

export const createDocument = async ({documentName, file, environmentModelId }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", documentName);
    if (environmentModelId) {
        formData.append("environmentModelId", environmentModelId);
    }
    return await apiRequest(`${API_URLS.COMMON_DOCUMENT}/create`, {
        method: "POST",
        body: formData
    });
    /*try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", documentName);
        if(environmentModelId) {
            formData.append("environmentModelId", environmentModelId);
        }

        const response = await fetch(`${API_URLS.COMMON_DOCUMENT}/create`, {
            method: "POST",
            body: formData
        });

        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.ok;


    } catch (error) {
        console.error(error)
    }*/
}