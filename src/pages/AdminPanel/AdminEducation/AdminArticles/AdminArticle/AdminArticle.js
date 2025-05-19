import {useParams} from "react-router-dom";
import useFetchObject from "../../../../../hooks/useFetchObject";
import {getArticleById, updateArticle} from "../../../../../services/drkb-wiki-education/ArticleService";
import ErrorSnackbar from "../../../../../components/ErrorSnackbar/ErrorSnackbar";
import SuccessSnackbar from "../../../../../components/SuccessSnackbar/SuccessSnackbar";
import ProgressBar from "../../../../../components/ProgressBar/ProgressBar";
import QuillEditor from "../../../../../components/QuillEditor/QuillEditor";
import React, {useEffect, useState} from "react";
import {dateConverter} from "../../../../../utils/dateConverter";
import "./AdminArticle.css";
import {Button, Checkbox, Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import useFetch from "../../../../../hooks/useFetch";
import {getAllTest} from "../../../../../services/drkb-wiki-education/TestService";

const AdminArticle = () => {
    const params = useParams();
    const adminArticleId = params.adminArticleId;
    const [tests, isLoadingTests, errorTests] = useFetch(() => getAllTest());
    const [article, isLoadingArticle, errorArticle, setErrorArticle] = useFetchObject(() => getArticleById(adminArticleId));
    const [articleToUpdate, setArticleToUpdate] = useState({
        id: "",
        title: "",
        content: "",
        dateDeadline: "",
        description: "",
        testId: "",
    })
    const [openedTest, setIsOpenedTest] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        if (!article) return;

        console.log(article);
        setArticleToUpdate(prevState => ({
            ...prevState,
            id: article.id,
            title: article.title,
            content: article.content,
            dateDeadline: dateConverter(article.dateDeadline),
            description: article.description,
            testId: article.testId
        }));

    }, [article]);

    useEffect(() => {
        console.log(articleToUpdate);
    }, [articleToUpdate]);

    const handleSend = async () => {
        const response = await updateArticle(articleToUpdate);
        if (response.success) {
            setSuccessMessage("Обновление информации по статье прошло успешно");
        }
        else {
            setErrorArticle("Произошла ошибка при сохранении статьи");
        }
    }

    const handleChangeTest = (e) => {
        setArticleToUpdate(prevState =>  ({
            ...prevState,
            testId: e.target.value
        }))
    }

    return (
        <div className="admin-article-container">
            <span className="admin-article-header">Редактирование статьи</span>
            <ErrorSnackbar errorMessage={errorArticle} onClose={() => setErrorArticle(null)} />
            <SuccessSnackbar message={successMessage} onClose={() => setSuccessMessage(null)}/>
            {isLoadingArticle && <ProgressBar />}
            {article && (
                <>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}>
                        <label htmlFor={"title"}>Название</label>
                        <input
                            type="text"
                            value={articleToUpdate.title}
                            onChange={(value) =>
                                setArticleToUpdate((prevState) => ({ ...prevState, title: value.target.value }))
                            }
                            className="admin-article-input"
                            placeholder="Заголовок"
                            required
                            name={"title"}
                        />
                        <label htmlFor={"date-deadline"}>Дата окончания освоения статьи</label>
                        <input
                            type="date"
                            value={articleToUpdate.dateDeadline}
                            onChange={(value) =>
                                setArticleToUpdate((prevState) => ({ ...prevState, dateDeadline: value.target.value }))
                            }
                            className="admin-article-input"
                            required
                            name={"date-deadline"}
                        />
                        <label htmlFor={"description"}>Описание</label>
                        <input
                            type="text"
                            value={articleToUpdate.description}
                            onChange={(value) =>
                                setArticleToUpdate((prevState) => ({ ...prevState, description: value.target.value }))
                            }
                            className="admin-article-input"
                            placeholder="Краткое описание"
                            name={"description"}
                        />
                        <label htmlFor={"content"}>Текст статьи</label>
                        <div className="admin-article-editor">
                            <QuillEditor
                                value={article.content}
                                setValue={(value) =>
                                    setArticleToUpdate((prevState) => ({ ...prevState, content: value }))
                                }
                            />
                        </div>
                        {tests && (
                            <div className={"admin-article-test-wrapper"}>
                                <List>
                                    <div>
                                        <ListItemButton onClick={() => setIsOpenedTest(!openedTest)}>
                                            <ListItemText primary={"Тесты"} />
                                            {openedTest ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={openedTest} timeout="auto" unmountOnExit>
                                            <List component="div">
                                                {tests.map((test) => (
                                                    <ListItemButton key={test.id} sx={{ pl: 4 }}>
                                                        <Checkbox
                                                            name="user"
                                                            checked={articleToUpdate.testId === test.id}
                                                            onChange={handleChangeTest}
                                                            value={test.id}
                                                            color="primary"
                                                        />
                                                        <ListItemText primary={`${test.title}`} />
                                                    </ListItemButton>
                                                ))}
                                            </List>
                                        </Collapse>
                                    </div>
                                </List>
                            </div>
                        )}
                        <Button variant={"contained"} type={"submit"} className={"admin-article-save-btn"}>Сохранить</Button>
                    </form>
                </>
            )}
        </div>
    );
}

export default AdminArticle;