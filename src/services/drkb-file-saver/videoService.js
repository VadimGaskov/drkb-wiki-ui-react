import {apiRequest} from "../ApiService";
import {API_URLS} from "../../constants/ApiUrls";

export const saveVideo = async (file) => {
    const formData = new FormData();
    formData.append("video", file); // Важно: имя должно совпадать с параметром контроллера
    return await apiRequest(`${API_URLS.VIDEO_SAVER}/save`, {
        method: "POST",
        body: formData,
        headers: {
            "Accept": "*!/!*",
            "enctype": "multipart/form-data"
        }
    })
}

