import {useContext, useEffect, useRef, useState} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Импорт стилей Quill
import "./QuillTextEditor.css";
import {API_URLS} from "../../../../../constants/ApiUrls";
import {getEnvironmentModelById, SaveShortInstruction} from "../../../../../services/drkb-wiki/EnvironmentModelService";
import {useParams} from "react-router-dom";
import {Button} from "@mui/material";
import {EnvironmentModelContext} from "../../../../../context/EnvironmentModelContext";


///TODO Добавить удаление видео из сервера при отмене изменений.
///Добавить препросмотр видео в редакторе.
const QuillTextEditor = () => {
    const editorRef = useRef(null);
    const [value, setValue] = useState("");
    const {id} = useParams();
    const environmentModel = useContext(EnvironmentModelContext);
    useEffect(() => {
        if (editorRef.current) {
            const quill = new Quill(editorRef.current, {
                theme: "snow",
                placeholder: "Введите текст здесь...",
                modules: {
                    toolbar: {
                        container: [
                            [{ header: [1, 2, 3, false] }],
                            ["bold"],
                            [{ align: "" }, { align: "center" }, { align: "right" }],
                            /*[{ list: "ordered" }, { list: "bullet" }],*/
                            ["image"],
                            ["customVideo"], // Кастомная кнопка для загрузки видео
                            ["clean"],
                        ],
                        handlers: {
                            customVideo: () => handleVideoUpload(quill), // Обработчик загрузки видео
                        },
                    },
                },
            });

            const handleVideoUpload = (quill) => {
                const fileInput = document.createElement("input");
                fileInput.setAttribute("type", "file");
                fileInput.setAttribute("accept", "video/*");
                fileInput.click();

                fileInput.onchange = async () => {
                    const file = fileInput.files[0];
                    const environmentModelId = id; // ID из URL-параметра

                    if (file && environmentModelId) {
                        const formData = new FormData();
                        formData.append("createVideoDto.environmentModelId", environmentModelId);
                        formData.append("file", file); // Важно: имя должно совпадать с параметром контроллера

                        // Указываем имя как "createVideoDto.environmentModelId" для корректной сериализации

                        try {
                            const response = await fetch(`${API_URLS.VIDEO}/save-video`, {
                                method: "POST",
                                body: formData,
                                headers: {
                                    "Accept": "*/*",
                                    "enctype": "multipart/form-data"
                                }
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
                    }
                };
            };

            // Добавление иконки на кастомную кнопку
            const customButton = document.querySelector(".ql-customVideo");
            if (customButton) {
                customButton.innerHTML = "🎬"; // Иконка для кнопки
                customButton.title = "Загрузить видео";
            }

            quill.on("text-change", () => {
                setValue(quill.root.innerHTML);
            });

            const getCurrentShortInstruction = async (id) => {
                const response = await getEnvironmentModelById(id);
                setValue(response.shortInstruction);
                quill.root.innerHTML = response.shortInstruction;
            }

            getCurrentShortInstruction(id);
        }
    }, []);


    const sendContentOnServer = async () => {
        const response = await SaveShortInstruction(environmentModel.id,value);
        if (response.ok)
            alert('УДАЧНО');
        else
            alert("НЕУДАЧНО");
    }

    return (
        <div className="editor-container">
            <h2 className="editor-title">Редактировать инструкцию</h2>
            <div ref={editorRef} className="quill-editor" />
            <Button
                type="button"
                onClick={sendContentOnServer}
                className="editor-save-btn"
                variant="contained"
            >Сохранить
            </Button>
        </div>
    );
};

export default QuillTextEditor;


/*
<div className="preview-box">
    <h3 className="preview-title">Предпросмотр:</h3>
    <div
        className="preview-content"
        dangerouslySetInnerHTML={{ __html: value }}
    />
    <button type="button" onClick={sendContentOnServer}>Отправить</button>
</div>*/
