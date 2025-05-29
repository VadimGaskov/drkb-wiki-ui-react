import {apiRequest, configureUrlParams} from "../ApiService";
import {API_URLS} from "../../constants/ApiUrls";

export const createFile = async (idRelated,file) => {
    const formData = new FormData();
    formData.append("idRelated", idRelated);
    formData.append("file", file); // Важно: имя должно совпадать с параметром контроллера
    return await apiRequest(`${API_URLS.FILE_SAVER}/save`, {
        method: "POST",
        body: formData,
        headers: {
            "Accept": "*!/!*",
        }
    })
}

export const getAllFilesByRelatedId = async (idRelated) => {
    const ulrParams = configureUrlParams({idRelated: idRelated});
    return await apiRequest(`${API_URLS.FILE_SAVER}/get-files?${ulrParams}`);
}