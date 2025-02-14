import EnvironmentNav from "../EnvironmentNav";
import DocumentationElement from "./documentation-element/DocumentationElement";
import "./Documentation.css";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {API_URLS} from "../../../../constants/ApiUrls";
import {getAllByEnvironmentModel} from "../../../../services/drkb-wiki/CommonDocumentService";
import ModalWindow from "../../../ModalWindow/ModalWindow";

const Documentation = () => {
    const { id } = useParams();
    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        const fetchDocumentsByEnvironmentModel = async () => {
            try {
                const data = await getAllByEnvironmentModel(id);
                setDocuments(data);
            }
            catch (error) {
                console.error(error)
            }
        }

        fetchDocumentsByEnvironmentModel();
    }, [id]); // добавил зависимость от id для корректной работы при смене параметра

    const addDocument = () => {
        const fileInput = document.createElement("input");
        fileInput.setAttribute("type", "file");
        fileInput.setAttribute("accept", "video/*");
        fileInput.click();

        fileInput.onchange = async () => {
            /*const file = fileInput.files[0];
            const environmentModelId = id; // ID из URL-параметра

            if (file && environmentModelId) {
                const formData = new FormData();
                formData.append("file", file); // Важно: имя должно совпадать с параметром контроллера
                formData.append("createVideoDto.environmentModelId", environmentModelId);
                // Указываем имя как "createVideoDto.environmentModelId" для корректной сериализации

                try {
                    const response = await fetch(`${API_URLS.VIDEO}/save-video`, {
                        method: "POST",
                        body: formData,
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const videoUrl = `${data.url}`;
                        const range = quill.getSelection(true);
                        quill.insertEmbed(range.index, "video", videoUrl);
                    } else {
                        alert("Ошибка загрузки видео");
                    }
                } catch (error) {
                    console.error("Ошибка при загрузке видео:", error);
                }
            } else {
                alert("Не выбран файл или отсутствует ID модели.");
            }*/
        };
    }

    return(
        <>
            <ModalWindow title="Загрузить документ" environmentModelId={id}/>
            <ul>
                {documents.length > 0 ? (
                    <ul>
                        {documents.map(document => (
                            <DocumentationElement key={document.id} title={document.name} downloadSrc={document.documentPath}/>
                        ))}
                    </ul>
                ) : (
                    <p>Документы не найдены.</p>
                )}
            </ul>
        </>
    )
}

export default Documentation;