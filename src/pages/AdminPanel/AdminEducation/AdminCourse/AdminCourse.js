import "./AdminCourse.css";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useFetch from "../../../../hooks/useFetch";
import {getCourseById, getFullCourseInfo} from "../../../../services/drkb-wiki-education/CourseService";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import ErrorSnackbar from "../../../../components/ErrorSnackbar/ErrorSnackbar";
import {getAllDepartmentWithUsers} from "../../../../services/drkb-main/DepartmentService";
import {Checkbox} from "@mui/material";
import useFetchObject from "../../../../hooks/useFetchObject";
import {getAllArticles} from "../../../../services/drkb-wiki-education/ArticleService";
const AdminCourse = () => {
    const {adminCourseId} = useParams();
    const [course, isLoading, error] = useFetchObject(() => getFullCourseInfo(adminCourseId));
    const [users, usersIsLoading, usersError] = useFetch(() => getAllDepartmentWithUsers())

    const [articles, isLoadingArticles, articleError] = useFetch(() => getAllArticles());

    const [updateCourseData, setUpdateCourseData] = useState({
        title: '',
        dateDeadline: '',
        userIds: [],
        articleIds: []
    })

    useEffect(() => {
        if(!course) {
            return;
        }

        setUpdateCourseData((prevState => {
            return {
                ...prevState,
                title: course.title,
                dateDeadline: course.dateDeadline,
                userIds: course.userCourse.map(userCourse => userCourse.userId),
                articleIds: course.courseArticle.map(courseArticle => courseArticle.article.id)
            }
        }))

    }, [course]);

    useEffect(() => {
        console.log(course);
    }, [course]);

    useEffect(() => {
        console.log("updateCourseData");
        console.log(updateCourseData);
    }, [updateCourseData]);

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

    return(
        <div className={"admin-course-wrapper"}>

            {isLoading && (<ProgressBar/>)}

            {error && <ErrorSnackbar errorMessage={error}/> }

            {course && (
                <div className={""}>
                    <span>Название</span>
                    <input value={course.title}/>
                    <br/>
                    <span>Дата создания</span>
                    <input type="date" value={course.dateCreation}/>
                    <br/>
                    <span>Дата окончания курса</span>
                    <input type="date" value={course.dateDeadline}/>
                    <br/>
                    {course.userCourse?.map((ca) => <span>{ca.id}</span>)}
                    <br/>
                    {course.courseArticle?.map((ca) => <span>{ca.id}</span>)}
                </div>
            )}

            {users &&
                users.map(department => {
                    return (
                        <>
                            <h1>{department.name}</h1>
                            {department.users.map(user => {
                                return(
                                    <>
                                        <h1>{user.name}</h1>
                                        <Checkbox
                                            checked={updateCourseData.userIds.includes(user.id)}
                                            onChange={(e) => handleUpdateUsers(e)}
                                            value={user.id}
                                        />
                                    </>
                                )}
                            )}
                        </>
                    )})
            }

            {articles && (
                <>
                    {articles.map(article => {
                        return (
                            <>
                                <h1>{article.title}</h1>
                                <h1>{article.id}</h1>
                                <Checkbox
                                    checked={updateCourseData.articleIds.includes(article.id)}
                                    onChange={(e) => handleUpdateArticles(e)}
                                    value={article.id}
                                />
                            </>
                        )
                    })}
                </>
            )}
        </div>
    )
}

export default AdminCourse;