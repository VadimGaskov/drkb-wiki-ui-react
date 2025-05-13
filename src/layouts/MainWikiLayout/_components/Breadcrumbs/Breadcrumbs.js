import { Link, useLocation, useParams } from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import {API_URLS} from "../../../../constants/ApiUrls";
import {getEnvironmentModelById} from "../../../../services/drkb-wiki/EnvironmentModelService";
import {EnvironmentModelContext} from "../../../../context/EnvironmentModelContext";
import "./Breadcrumbs.css";
import {apiRequest} from "../../../../services/ApiService";
import {getAllDepartment, getDepartmentById} from "../../../../services/drkb-main/DepartmentService";
import ErrorSnackbar from "../../../../components/ErrorSnackbar/ErrorSnackbar";
import {getCourseById} from "../../../../services/drkb-wiki-education/CourseService";
import {ROUTINGS} from "../../../../constants/Routings";
import {getArticleById} from "../../../../services/drkb-wiki-education/ArticleService";
import {getTestById} from "../../../../services/drkb-wiki-education/TestService";
const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);
    const params = useParams(); // Получаем параметры из URL
    const environmentModel = useContext(EnvironmentModelContext);
    const [department, setDepartment] = useState(null);
    const [course, setCourse] = useState(null);
    const [article, setArticle] = useState(null);
    const [test, setTest] = useState(null);
    const [error, setError] = useState(null);
    const nameMap = {
        [ROUTINGS.LIST_ENVIRONMENT]: 'Список оборудования',
        'environment-model': ' ',
        'maintenance-logbook': 'Журнал техобслуживания',
        'documentation': 'Документация',
        'short-instruction' : "Краткая инструкция",
        'environments' : "Расположения",
        'departments': "Список отделений",
        'courses' : "Список курсов",
        'article' : ' ',
        'test' : ' ',
        'environment' : ' ',
        'admin' : 'Панель администратора',
        'education' : "Образование",
        'articles': "Статьи"
    };

    useEffect(() => {
        const fetchDepartment = async (departmentId) => {
            const result = await getDepartmentById(departmentId);
            if (result.success) {
                setDepartment(result.data);
            }
            else {
                setError(result.errorMessage);
            }
        }

        if (params.departmentId) {
            fetchDepartment(params.departmentId);
        }
    }, [params.departmentId]);

    useEffect(() => {
        const fetchCourse = async (courseId) => {
            const result = await getCourseById(courseId);
            if (result.success) {
                setCourse(result.data);
            }
            else {
                setError(result.errorMessage);
            }
        }
        if (params.courseId) {
            fetchCourse(params.courseId);
        }
    }, [params.courseId]);

    useEffect(() => {
        const fetchArticle = async (articleId) => {
            const result = await getArticleById(articleId);
            if (result.success) {
                setArticle(result.data);
            }
            else {
                setError(result.errorMessage);
            }
        }
        if (params.articleId) {
            fetchArticle(params.articleId);
        }
    }, [params.articleId]);

    useEffect(() => {
        const fetchTest = async (testId) => {
            const result = await getTestById(testId);
            if (result.success) {
                setTest(result.data);
            }
            else {
                setError(result.errorMessage);
            }
        }
        if (params.testId) {
            fetchTest(params.testId);
        }
    }, [params.testId]);

    return (
        <>
            <div className="crumbs">
                <span>
                    {pathnames.map((value, index) => {
                        const path = `/${pathnames.slice(0, index + 1).join('/')}`;
                        let displayName = nameMap[value] || value;

                        // Если текущий путь содержит id, используем equipmentName
                        if (value === params.id && environmentModel) {
                            displayName = environmentModel.name;
                        }
                        if(value === params.departmentId && department) {
                            displayName = department.name;
                        }
                        if(value === params.courseId && course) {
                            displayName = course.title;
                        }
                        if(value === params.articleId && article) {
                            displayName = article.title;
                        }
                        if(value === params.testId && test) {
                            displayName = test.title;
                        }
                            return (
                                <>
                                    <Link to={path} className={"breadcrumbs-link"}>{displayName}</Link> {index < pathnames.length - 1 && displayName !== ' ' && ' – '}
                                </>
                            );
                    })}
                </span>
            </div>
            <ErrorSnackbar
                errorMessage={error}
                autoHideDuration={6000}
                /*onClose={() => setError(null)} // Optional: clear error after closing*/
            />
        </>

    );
};

export default Breadcrumbs;