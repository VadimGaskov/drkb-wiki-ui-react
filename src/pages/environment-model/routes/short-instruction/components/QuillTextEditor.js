import {useContext, useEffect, useRef, useState} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Импорт стилей Quill
import "./QuillTextEditor.css";
import {getEnvironmentModelById, SaveShortInstruction} from "../../../../../services/drkb-wiki/EnvironmentModelService";
import {Button} from "@mui/material";
import {EnvironmentModelContext} from "../../../../../context/EnvironmentModelContext";
import {saveVideo} from "../../../../../services/drkb-wiki/VideoService";
import ProgressBar from "../../../../../components/ProgressBar/ProgressBar";
import ErrorSnackbar from "../../../../../components/ErrorSnackbar/ErrorSnackbar";
import SuccessSnackbar from "../../../../../components/SuccessSnackbar/SuccessSnackbar";


///TODO Добавить удаление видео из сервера при отмене изменений.
///Добавить препросмотр видео в редакторе.
const QuillTextEditor = () => {
    const editorRef = useRef(null);
    const [value, setValue] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(false);
    const environmentModel = useContext(EnvironmentModelContext);
    useEffect(() => {
        console.log(environmentModel);
        if (!environmentModel)
            return;
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
                    const environmentModelId = environmentModel.id; // ID из URL-параметра

                    if (file && environmentModelId) {
                        const result = await saveVideo(environmentModelId, file);
                        if (result.success) {
                            const videoUrl = `${result.data.url}`;
                            const range = quill.getSelection(true);
                            quill.insertEmbed(range.index, "video", videoUrl);
                        }
                        else {
                            setError(result.errorMessage);
                        }
                    } else {
                        setError("Не выбран файл или отсутствует ID модели.");
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
                const result = await getEnvironmentModelById(environmentModel.id);
                //TODO доделать обработку ошибок
                if (result.success) {
                    setValue(result.data);
                    quill.root.innerHTML = result.data.shortInstruction;
                }
                else {
                    setError(result.errorMessage);
                }
                setLoading(false);
            }

            getCurrentShortInstruction(environmentModel.id);
        }
    }, [environmentModel, environmentModel?.id]);


    const sendContentOnServer = async () => {
        const result = await SaveShortInstruction(environmentModel.id, value);
        if (result.success) {
            console.log("УСПЕХ");
            setSuccessMessage("Сохранение инструкции прошло успешно!");
        }
        else {
            console.log("ОШИБКА");
            setError(result.errorMessage);
        }
    }

    return (
        <div className="editor-container">
            <h2 className="editor-title">Редактировать инструкцию</h2>
                <>
                    <div ref={editorRef} className="quill-editor" />
                    <Button
                        type="button"
                        onClick={sendContentOnServer}
                        className="editor-save-btn"
                        variant="contained"
                    >Сохранить
                    </Button>
                </>
            <ErrorSnackbar
                errorMessage={error}
                onClose={() => setError(null)}
            />
            <SuccessSnackbar
                message={successMessage}
                onClose={()=> setSuccessMessage(null)}
            />
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
