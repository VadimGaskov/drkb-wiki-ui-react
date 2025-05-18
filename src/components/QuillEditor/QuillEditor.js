import {useContext, useEffect, useRef, useState} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import {saveVideo} from "../../services/drkb-file-saver/videoService";
import {BlockEmbed} from "quill/blots/block"; // Импорт стилей Quill
/*import {saveVideo} from "../../services/drkb-wiki/VideoService";*/


///TODO Добавить удаление видео из сервера при отмене изменений.
///Добавить препросмотр видео в редакторе.
const QuillTextEditor = ({value, setValue, error, setError}) => {

    /*class CustomVideo extends BlockEmbed {
        static blotName = "video";
        static tagName = "video";

        static create(value) {
            let node = super.create();
            node.setAttribute("controls", true);
            node.setAttribute("src", value);
            node.setAttribute("preload", "metadata");
            node.setAttribute("style", "max-width: 50%;");
            return node;
        }

        static value(node) {
            return node.getAttribute("src");
        }
    }

    Quill.register(CustomVideo);*/

    // Кастомный VideoBlot для управления видео
    /*const BlockEmbed = Quill.import("blots/block/embed");

    class CustomVideoBlot extends BlockEmbed {
        static create(value) {
            const node = super.create();
            node.setAttribute("src", value);
            node.setAttribute("frameborder", "0");
            node.setAttribute("allowfullscreen", "");
            // Удаляем autoplay из параметров, если он есть
            node.removeAttribute("autoplay");
            // Добавляем класс для поддержки стилей Quill
            node.classList.add("ql-align-left"); // Начальное выравнивание по левому краю
            node.style.maxWidth = "100%"; // Чтобы iframe не выходил за границы
            node.style.display = "block"; // Блочное отображение
            return node;
        }

        static formats(node) {
            // Возвращаем форматы, включая выравнивание
            const align = node.classList.contains("ql-align-center")
                ? "center"
                : node.classList.contains("ql-align-right")
                    ? "right"
                    : "left"; // По умолчанию левое выравнивание
            return {
                src: node.getAttribute("src"),
                allowfullscreen: node.hasAttribute("allowfullscreen"),
                align: align,
            };
        }

        static value(node) {
            return node.getAttribute("src");
        }

        format(name, value) {
            // Поддержка форматирования выравнивания
            if (name === "align") {
                // Удаляем все предыдущие классы выравнивания
                this.domNode.classList.remove("ql-align-left", "ql-align-center", "ql-align-right");
                this.domNode.style.textAlign = ""; // Сбрасываем стиль

                // Применяем новое выравнивание
                if (value === "center") {
                    this.domNode.classList.add("ql-align-center");
                    this.domNode.style.textAlign = "center";
                } else if (value === "right") {
                    this.domNode.classList.add("ql-align-right");
                    this.domNode.style.textAlign = "right";
                } else {
                    // Пустое значение или "left" — выравнивание по левому краю
                    this.domNode.classList.add("ql-align-left");
                    this.domNode.style.textAlign = "left";
                }
            }
        }
    }
    CustomVideoBlot.blotName = "video";
    CustomVideoBlot.tagName = "iframe";
    CustomVideoBlot.className = "ql-video";
    Quill.register(CustomVideoBlot, true);
*/
    const editorRef = useRef(null);

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

                    if (file) {
                        const result = await saveVideo(file);
                        if (result.success) {
                            const videoUrl = `${result.data.savedVideoUrl}`;
                            const range = quill.getSelection(true);
                            quill.insertEmbed(range.index, "video", videoUrl);
                        } else {
                            setError(result.errorMessage);
                        }
                    } else {
                        setError("Не выбран файл");
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

                const videos = quill.root.querySelectorAll("iframe");
                console.log("НАШЕЛ СТОЛЬКО ТЕГОВ ВИДЕО ");
                console.log(videos);
                console.log(videos.length)
                videos.forEach((video) => {
                    video.removeAttribute("autoplay");
                    // Дополнительно можешь заменить iframe на video, если нужно
                });
            });

            quill.root.innerHTML = value;
        }
    }, [value, setError, setValue]);

    return (
        <>
            <div ref={editorRef} className="quill-editor" />
        </>
    );
};

export default QuillTextEditor;
