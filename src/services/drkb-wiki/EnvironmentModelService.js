import {API_URLS} from "../../constants/ApiUrls";
import {apiRequest, configureUrlParams} from "../ApiService";

export const getAllEnvironmentModels = async () => {
    return await apiRequest(`${API_URLS.ENVIRONMENT_MODEL}/get-all`);

};

export const getEnvironmentModelById = async (id) => {
    const params = configureUrlParams({environmentModelId: id});
    return await apiRequest(`${API_URLS.ENVIRONMENT_MODEL}/get-by-id?${params}`)
};

export const SaveShortInstruction = async (environmentModelId,content) => {
    return await apiRequest(`${API_URLS.ENVIRONMENT_MODEL}/save-instruction`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({environmentModelId: `${environmentModelId}`, shortInstruction: content})
    }, false);

}

export const createEnvironmentModel = async (newEnvironmentModel) => {
    return await apiRequest(`${API_URLS.ENVIRONMENT_MODEL}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newEnvironmentModel)
    }, false);

}