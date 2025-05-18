import "./AdminCourse.css";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useFetch from "../../../../hooks/useFetch";
import {getCourseById, getFullCourseInfo, updateCourse} from "../../../../services/drkb-wiki-education/CourseService";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import ErrorSnackbar from "../../../../components/ErrorSnackbar/ErrorSnackbar";
import {getAllDepartmentWithUsers} from "../../../../services/drkb-main/DepartmentService";
import {Checkbox, Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import useFetchObject from "../../../../hooks/useFetchObject";
import {getAllArticles} from "../../../../services/drkb-wiki-education/ArticleService";
import SuccessSnackbar from "../../../../components/SuccessSnackbar/SuccessSnackbar";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

import {dateConverter} from "../../../../utils/dateConverter";

const AdminCourse = () => {
    const {adminCourseId} = useParams();
    const [course, isLoading, error] = useFetchObject(() => getFullCourseInfo(adminCourseId));
    const [users, usersIsLoading, usersError] = useFetch(() => getAllDepartmentWithUsers())

    const [articles, isLoadingArticles, articleError] = useFetch(() => getAllArticles());
    const [successMessage, setSuccessMessage] = useState(null);
    const [updateCourseData, setUpdateCourseData] = useState({
        title: '',
        dateDeadline: '',
        userIds: [],
        articleIds: []
    })

    const [openArticles, setIsOpenArticles] = useState(false);
    const [openDepartments, setOpenDepartments] = useState({});

    const toggleDepartment = (id) => {
        setOpenDepartments((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    useEffect(() => {
        if(!course) {
            return;
        }

        setUpdateCourseData((prevState => {
            return {
                ...prevState,
                id: course.id,
                title: course.title,
                dateDeadline: dateConverter(course.dateDeadline),
                userIds: course.userCourse.map(userCourse => userCourse.userId),
                articleIds: course.courseArticle.map(courseArticle => courseArticle.article.id)
            }
        }))

    }, [course]);

   /* useEffect(() => {
        console.log("updateCourseData");
        console.log(updateCourseData);
    }, [updateCourseData]);*/

    const handleSend = async () => {
        const result = await updateCourse(updateCourseData);
        if (result.success) {
            setSuccessMessage("Сохранение курса прошло успешно!");
        }
        else {
            console.error("НЕ COURSE UPDATED SUCCESSFULY");
        }
    }

    const handleUpdateUsers = (e) => {
        setUpdateCourseData((prevState) => {
            if(e.target.checked) {
                return {
                    ...prevState,
                    userIds: [...prevState.userIds, e.target.value]
                }
            }
            else {
                return {
                    ...prevState,
                    userIds: [...prevState.userIds.filter(id => id !== e.target.value)]
                }
            }
        })
    }

    const handleUpdateArticles = (e) => {
        setUpdateCourseData((prevState) => {
            if(e.target.checked) {
                return {
                    ...prevState,
                    articleIds: [...prevState.articleIds, e.target.value]
                }
            }
            else {
                return {
                    ...prevState,
                    articleIds: [...prevState.articleIds.filter(id => id !== e.target.value)]
                }
            }
        })
    }

    return (
        <div className="admin-course-wrapper">

            {isLoading && <ProgressBar />}
            {error && <ErrorSnackbar errorMessage={error} />}

            {course && (
                <div className="course-info">
                    <div className="form-group">
                        <span>Название</span>
                        <input
                            type="text"
                            value={updateCourseData.title}
                            onChange={(e) =>
                                setUpdateCourseData((prevState) => ({
                                    ...prevState,
                                    title: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div className="form-group">
                        <span>Дата создания</span>
                        <input type="date" value={dateConverter(course.dateCreation)} disabled />
                    </div>

                    <div className="form-group">
                        <span>Дата окончания курса</span>
                        <input
                            type="date"
                            value={updateCourseData.dateDeadline}
                            onChange={(e) =>
                                setUpdateCourseData((prevState) => ({
                                    ...prevState,
                                    dateDeadline: e.target.value,
                                }))
                            }
                        />
                    </div>
                </div>
            )}

            <div className="users-section">
                <h3>Пользователи</h3>
                <List>
                    {users &&
                        users.map((department) => (
                            <div key={department.id}>
                                <ListItemButton onClick={() => toggleDepartment(department.id)}>
                                    <ListItemText primary={department.name} />
                                    {openDepartments[department.id] ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>

                                <Collapse in={openDepartments[department.id]} timeout="auto" unmountOnExit>
                                    <List component="div">
                                        {department.users.map((user) => (
                                            <ListItemButton key={user.id} sx={{ pl: 4 }}>
                                                <Checkbox
                                                    name="user"
                                                    checked={updateCourseData.userIds.includes(user.id)}
                                                    onChange={handleUpdateUsers}
                                                    value={user.id}
                                                    color="primary"
                                                />
                                                <ListItemText primary={`${user.name} ${user.surname}`} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            </div>
                        ))}
                </List>
            </div>

            <div className="articles-section">
                <h3>Статьи</h3>
                <List>
                    <ListItemButton onClick={() => setIsOpenArticles(!openArticles)}>
                        <ListItemText primary={"Список статей"} />
                        {openArticles ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openArticles} timeout={"auto"} unmountOnExit sx={{zIndex: 0}}>
                        <List component="div" disablePadding>
                            {articles &&
                                articles.map((article) => (
                                    <ListItemButton key={article.id}>
                                        <Checkbox
                                            value={article.id}
                                            name="article"
                                            onChange={handleUpdateArticles}
                                            checked={updateCourseData.articleIds.includes(article.id)}
                                            color="primary"
                                        />
                                        <ListItemText primary={article.title} />
                                    </ListItemButton>
                                ))}
                        </List>
                    </Collapse>
                </List>
            </div>

            <div className="button-wrapper">
                <button type="button" onClick={handleSend}>
                    Отправить
                </button>
            </div>

            <SuccessSnackbar message={successMessage} onClose={() => setSuccessMessage(null)} />
        </div>
    );
}

export default AdminCourse;