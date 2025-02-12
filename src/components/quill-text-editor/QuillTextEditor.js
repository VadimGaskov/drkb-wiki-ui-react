import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Импорт стилей Quill
import "./QuillTextEditor.css";
import {API_URLS} from "../../constants/ApiUrls";
import {SaveShortInstruction} from "../../services/drkb-wiki/EnvironmentModelService";
import {useParams} from "react-router-dom";

const QuillTextEditor = () => {
    const editorRef = useRef(null);
    const [value, setValue] = useState("");
    const {id} = useParams();
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

                fileInput.onchange = () => {
                    const file = fileInput.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const videoUrl = e.target.result;
                            const range = quill.getSelection(true);
                            quill.insertEmbed(range.index, "video", videoUrl);
                        };
                        reader.readAsDataURL(file); // Преобразование в base64
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
        }
    }, []);


    const sendContentOnServer = async () => {
        const response = await SaveShortInstruction(value);
        if (response.ok)
            alert('УДАЧНО');
        else
            alert("НЕУДАЧНО");
    }

    return (
        <div className="editor-container">
            <h2 className="editor-title">Редактор текста</h2>
            <div ref={editorRef} className="quill-editor" />

            {/* Предпросмотр */}
            <div className="preview-box">
                {/*<h3 className="preview-title">Предпросмотр:</h3>
                <div
                    className="preview-content"
                    dangerouslySetInnerHTML={{ __html: value }}
                />*/}
                <button type="button" onClick={sendContentOnServer}>Отправить</button>
                {/*<video src={"http://localhost:5065/video/какое-то-название-на-русском.mp4"} controls width="600"></video>*/}
                <p1>{id}</p1>
            </div>
        </div>
    );
};

export default QuillTextEditor;
