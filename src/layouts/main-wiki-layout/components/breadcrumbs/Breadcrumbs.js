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
const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);
    const params = useParams(); // Получаем параметры из URL
    const environmentModel = useContext(EnvironmentModelContext);
    const [department, setDepartment] = useState(null);
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);
    const nameMap = {
        'list-environment': 'Список оборудования',
        'environment-model': ' ',
        'maintenance-logbook': 'Журнал техобслуживания',
        'documentation': 'Документация',
        'short-instruction' : "Краткая инструкция",
        'environments' : "Расположения",
        'departments': "Список отделений",
        'list-courses' : "Список курсов"
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

    return (
        <>
            <div className="crumbs">
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
                        return (
                            <span key={index} className="breadcrumbs-text">
                                <Link to={path}> {displayName}</Link>
                                {index < pathnames.length - 1 && displayName !== ' ' && ' – '}
                            </span>
                        );
                })}
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