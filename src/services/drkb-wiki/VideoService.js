import {API_URLS} from "../../constants/ApiUrls";
import {apiRequest} from "../ApiService";

/*
export const saveVideo = async (environmentModelId, file) => {
    const formData = new FormData();
    formData.append("createVideoDto.environmentModelId", environmentModelId);
    formData.append("file", file); // Важно: имя должно совпадать с параметром контроллера
    return await apiRequest(`${API_URLS.VIDEO}/save-video`, {
        method: "POST",
        body: formData,
        headers: {
            "Accept": "*!/!*",
            "enctype": "multipart/form-data"
        }
    })
}*/
