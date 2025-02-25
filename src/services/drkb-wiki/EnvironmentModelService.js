import {API_URLS} from "../../constants/ApiUrls";
import {apiRequest, configureUrlParams} from "../ApiService";

export const getAllEnvironmentModels = async () => {
    return await apiRequest(`${API_URLS.ENVIRONMENT_MODEL}/get-all`);


    /*try {
        const response = await fetch(`${API_URLS.ENVIRONMENT_MODEL}/get-all`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw error; // Бросаем ошибку для обработки на уровне компонента
    }*/
};

export const getEnvironmentModelById = async (id) => {
    const params = configureUrlParams({environmentModelId: id});
    return await apiRequest(`${API_URLS.ENVIRONMENT_MODEL}/get-by-id?${params}`)

    /*try {
        const params = new URLSearchParams({ environmentModelId: id }).toString();
        const response = await fetch(`${API_URLS.ENVIRONMENT_MODEL}/get-by-id?${params}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw error; // Бросаем ошибку для обработки на уровне компонента
    }*/
};

export const SaveShortInstruction = async (environmentModelId,content) => {
    return await apiRequest(`${API_URLS.ENVIRONMENT_MODEL}/save-instruction`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({environmentModelId: `${environmentModelId}`, shortInstruction: content})
    })

    /*try {
        const response = await fetch(`${API_URLS.ENVIRONMENT_MODEL}/save-instruction`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({environmentModelId: `${environmentModelId}`, shortInstruction: content})
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response;

    } catch(error) {
        throw error;
    }*/

}

export const createEnvironmentModel = async (newEnvironmentModel) => {
    return await apiRequest(`${API_URLS.ENVIRONMENT_MODEL}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newEnvironmentModel)
    }, false);

    /*try {
        const response = await fetch(`${API_URLS.ENVIRONMENT_MODEL}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEnvironmentModel)
        })

        if (!response.ok) {
            console.error("ОШИБКА СОХРАНЕНИЯ МОДЕЛИ ОБОРУДОВАНИЯ")
        }
        else  {
            return response.ok;
        }
    } catch (error) {
        console.error(error);
    }*/
}