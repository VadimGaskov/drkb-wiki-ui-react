import "./CreateArticleModal.css";
import useFetch from "../../../../../../hooks/useFetch";
import {getAllDepartmentWithUsers} from "../../../../../../services/drkb-main/DepartmentService";
import {createArticle, getAllArticles} from "../../../../../../services/drkb-wiki-education/ArticleService";
import {createCourse} from "../../../../../../services/drkb-wiki-education/CourseService";
import CommonModalWindow from "../../../../../../components/ModalWindow/CommonModalWindow";
import "./CreateArticleModal.css";
import {
    Button,
    Checkbox,
    Collapse,
    DialogActions,
    DialogTitle,
    List,
    ListItemButton,
    ListItemText
} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import ErrorSnackbar from "../../../../../../components/ErrorSnackbar/ErrorSnackbar";
import {useEffect, useState} from "react";
import {getAllTest} from "../../../../../../services/drkb-wiki-education/TestService";
import QuillEditor from "../../../../../../components/QuillEditor/QuillEditor";
const CreateArticleModal = ({open, onClose}) => {
    const [tests, isLoadingTests, errorTests] = useFetch(()=> getAllTest());
    const [createArticledata, setCreateArticledata] = useState({
        title: '',
        description: '',
        content: '',
        dateDeadLine: "",
        idTest: ""
    });

    const [openTests, setIsOpenTests] = useState(false);

    const handleSaveArticle = async () => {
        const response = await createArticle(createArticledata);
        if (response.ok) {
            console.log("ВСЕ ОК СОЗДАЛСЯ СТАТЬЯ")
        }
        else {
            console.error("НЕ СОЗДАЛСЯ СТАТЬЯ");
        }
    }


    const handleChangeTest = (e) => {
        setCreateArticledata(prevState =>  ({
            ...prevState,
            idTest: e.target.value
        }))
    }

    useEffect(() => {
        console.log(createArticledata);
    }, [createArticledata]);

    return(
        <CommonModalWindow isOpen={open} onClose={onClose} maxWidth={""}>
            <DialogTitle>Создание статьи</DialogTitle>

            <div className={"create-article-wrapper"}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveArticle();
                }}>
                    <div className={"create-course-inputs-wrapper"}>
                        <label htmlFor={"title"} className={"create-course-input-title"}>Название статьи</label>
                        <input
                            className={"admin-input"}
                            type="text"
                            name="title"
                            onChange={(e) => setCreateArticledata(prevState => ({...prevState, title: e.target.value}))}
                            value={createArticledata.title}
                            required
                        />

                        <label htmlFor={"description"} className={"create-course-input-title"}>Описание курса</label>
                        <input
                            className={"admin-input"}
                            type="text"
                            name="description"
                            onChange={(e) => setCreateArticledata(prevState => ({...prevState, description: e.target.value}))}
                            value={createArticledata.description}
                            required
                        />

                        <label htmlFor={"dateDeadline"} className={"create-course-input-title"}>Дата дедлайна</label>
                        <input
                            className={"admin-input"}
                            type="date"
                            name="dateDeadline"
                            onChange={(e) => setCreateArticledata(prevState => ({...prevState, dateDeadLine: e.target.value}))}
                            value={createArticledata.dateDeadLine}
                            required
                        />
                    </div>
                    <div className="admin-article-editor">
                        <QuillEditor
                            value={"Инструкция"}
                            setValue={(value) =>
                                setCreateArticledata((prevState) => ({ ...prevState, content: value }))
                            }
                        />
                    </div>
                    <div className={"admin-article-test-wrapper"}>
                        <List>
                            <ListItemButton onClick={() => setIsOpenTests(!openTests)} >
                                <ListItemText primary={"Тесты"} />
                                {openTests ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>

                            <Collapse in={openTests} timeout="auto" unmountOnExit >
                                <List component="div">
                                    {tests.map((test) => (
                                        <ListItemButton key={test.id} sx={{ pl: 4 }}>
                                            <Checkbox
                                                name="user"
                                                checked={createArticledata.idTest === test.id}
                                                onChange={handleChangeTest}
                                                value={test.id}
                                                color="primary"
                                            />
                                            <ListItemText primary={`${test.title}`} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                        </List>
                    </div>

                    <DialogActions sx={{position: "sticky"}}>
                        <Button onClick={onClose} autoFocus color={"error"} variant={"contained"}>
                            Закрыть
                        </Button>
                        <Button autoFocus type={"submit"} variant={"contained"}>
                            Сохранить
                        </Button>
                    </DialogActions>
                </form>
            </div>

            <ErrorSnackbar errorMessage={errorTests} />
        </CommonModalWindow>
    )
}

export default CreateArticleModal;