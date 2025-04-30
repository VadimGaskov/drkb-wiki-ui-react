import CommonModalWindow from "../../../../../../components/ModalWindow/CommonModalWindow";
import {
    Button,
    Checkbox,
    Collapse,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItemButton,
    ListItemText
} from "@mui/material";
import useFetch from "../../../../../../hooks/useFetch";
import {getAllDepartmentWithUsers} from "../../../../../../services/drkb-main/DepartmentService";
import {getAllArticles} from "../../../../../../services/drkb-wiki-education/ArticleService";
import {useEffect, useState} from "react";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import ErrorSnackbar from "../../../../../../components/ErrorSnackbar/ErrorSnackbar";
import "./CreateCourseModal.css";
import {createCourse} from "../../../../../../services/drkb-wiki-education/CourseService";


const CreateCourseModal = ({open, onClose}) => {
    const [departments, isLoadingDepartments, errorDeparments] = useFetch(()=> getAllDepartmentWithUsers());
    const [articles, isLoadingArticles, errorArticles] = useFetch(()=> getAllArticles());
    const [createCourseData, setCreateCourseData] = useState({
        title: '',
        dateCreation: '',
        dateDeadline: '',
        userIds: [],
        articleIds: []
    });

    const [openArticles, setIsOpenArticles] = useState(false);
    const [openDepartments, setOpenDepartments] = useState({});

    const handleSaveCourse = async () => {
        const response = await createCourse(createCourseData);
        if (response.ok) {
            console.log("ВСЕ ОК СОЗДАЛСЯ КУРС")
        }
        else {
            console.error("НЕ СОЗДАЛСЯ КУРС");
        }
    }

    const toggleDepartment = (id) => {
        setOpenDepartments((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleUserIdsChange = (e) => {
        setCreateCourseData((prevState) => {
            if(e.target.checked) {
                return {
                    ...prevState,
                    userIds: [...prevState.userIds, e.target.value]
                };
            }
            else {
                return {
                    ...prevState,
                    userIds: prevState.userIds.filter(id => id !== e.target.value)
                };
            }
        })
    }

    const handleArticlesIdsChange = (e) => {
        setCreateCourseData((prevState) => {
            if(e.target.checked) {
                return {
                    ...prevState,
                    articleIds: [...prevState.articleIds, e.target.value]
                };
            }
            else {
                return {
                    ...prevState,
                    articleIds: prevState.articleIds.filter(id => id !== e.target.value)
                };
            }
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCreateCourseData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    useEffect(() => {
        console.log(createCourseData);
    }, [createCourseData]);

    return(
        <CommonModalWindow isOpen={open} onClose={onClose} maxWidth={"lg"}>
            <DialogTitle>Создание курса</DialogTitle>
            <div>
                <div className={"create-course-wrapper"}>
                    <div className={"create-course-wrapper-left"}>
                        <div className={"create-course-inputs-wrapper"}>
                            <label htmlFor={"title"} className={"create-course-input-title"}>Название курса</label>
                            <input className={"admin-input"} type="text" name="title" onChange={handleChange} value={createCourseData.title} />

                            <label htmlFor={"title"} className={"create-course-input-title"}>Дата создания</label>
                            <input className={"admin-input"} type="date" name="dateCreation" onChange={handleChange} value={createCourseData.dateCreation} />

                            <label htmlFor={"title"} className={"create-course-input-title"}>Дата окончания курса</label>
                            <input className={"admin-input"} type="date" name="dateDeadline" onChange={handleChange} value={createCourseData.dateDeadline} />
                        </div>
                        <div className={"create-course-deps-wrapper"}>
                            <h4>Выберите сотрудников кому будет назначен курс</h4>
                            <List>
                                {departments && departments.map((department) => (
                                    <>
                                        <ListItemButton onClick={() => toggleDepartment(department.id)} >
                                            <ListItemText primary={department.name} />
                                            {openDepartments[department.id] ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>

                                        <Collapse in={openDepartments[department.id]} timeout="auto" unmountOnExit >
                                            <List component="div">
                                                {department.users.map((user) => (
                                                    <ListItemButton key={user.id} sx={{ pl: 4 }}>
                                                        <Checkbox
                                                            value={user.id}
                                                            name="user"
                                                            onChange={(e) => handleUserIdsChange(e)}
                                                            checked={createCourseData.userIds.includes(user.id)}
                                                            color={"primary"}
                                                        />
                                                        <ListItemText primary={`${user.name} ${user.surname}`} />
                                                    </ListItemButton>
                                                ))}
                                            </List>
                                        </Collapse>
                                    </>
                                ))}
                            </List>
                        </div>
                    </div>
                    <div className={"create-course-wrapper-right"}>
                        <h4>Выберите статьи которые будут содержаться в курсе</h4>
                        <List>
                            <ListItemButton onClick={() => setIsOpenArticles(!openArticles)}>
                                <ListItemText primary={"Список статей"} />
                                {openArticles ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={openArticles} timeout={"auto"} unmountOnExit>
                                <List component="div" disablePadding>
                                    {articles && (
                                        <>
                                            {articles.map((article) => (
                                                <ListItemButton key={article.id}>
                                                    <Checkbox
                                                        value={article.id}
                                                        name="article"
                                                        onChange={(e) => handleArticlesIdsChange(e)}
                                                        checked={createCourseData.articleIds.includes(article.id)}
                                                        color={"primary"}
                                                    />
                                                    <ListItemText primary={`${article.title}`} />
                                                </ListItemButton>
                                            ))}
                                        </>
                                    )}
                                </List>
                            </Collapse>
                        </List>
                    </div>
                </div>
                <DialogActions sx={{position: "sticky"}}>
                    <Button onClick={onClose} autoFocus color={"error"} variant={"contained"}>
                        Закрыть
                    </Button>
                    <Button autoFocus onClick={handleSaveCourse} variant={"contained"}>
                        Сохранить
                    </Button>
                </DialogActions>
            </div>

            <ErrorSnackbar errorMessage={errorDeparments} />
            <ErrorSnackbar errorMessage={errorArticles} />
        </CommonModalWindow>
    )
}

export default CreateCourseModal;