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

export const getEnvironmentModelById = async (id) => {
    try {
        const params = new URLSearchParams({ environmentModelId: id }).toString();
        const response = await fetch(`${API_URLS.ENVIRONMENT_MODEL}/get-by-id?${params}`);
        if (!response.ok) {
            console.error("ОШИБКА НА ОК");
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("ОШИБКИ НЕТ!!!!");
        return await response.json();
    } catch (error) {
        throw error; // Бросаем ошибку для обработки на уровне компонента
    }
};

export const SaveShortInstruction = async (environmentModelId,content) => {
    try {
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
    }

}

export const createEnvironmentModel = async (newEnvironmentModel) => {
    try {
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
    }
}