import "./AdminEducation.css";
import {useEffect, useState} from "react";
import useFetch from "../../../hooks/useFetch";
import {getAllCourses} from "../../../services/drkb-wiki-education/CourseService";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import CourseBlock from "./components/CourseBlock/CourseBlock";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import CreateCourseModal from "./components/CreateCourseModal/CreateCourseModal";
const AdminEducation = () => {
    const [courses, isLoading, error] = useFetch(() => getAllCourses());
    const navigate = useNavigate();
    const [openModal, setIsOpenModal] = useState(false);
    const [isCoursePath, setIsCoursePath] = useState(false);

    const location = useLocation();

    useEffect(() => {
        setIsCoursePath(location.pathname.includes("course"));
    }, [location]);

    return(
        <>
            {isCoursePath ? (
                <Outlet/>
            ) : (
                <>
                    <div className={"admin-education-wrapper-top"}>
                        <Button variant={"contained"} onClick={() => setIsOpenModal(true)}>Создать курс</Button>
                    </div>
                    <div className={"admin-education-wrapper"}>
                        {isLoading && (<ProgressBar/>)}

                        {courses.map((course) => {
                            return (
                                <>
                                    <CourseBlock title={course.title} description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, voluptatum."}/>
                                    <CourseBlock title={course.title} description={course.id}/>
                                    <CourseBlock title={course.title} description={course.id}/>
                                    <CourseBlock title={course.title} description={course.id}/>
                                    <CourseBlock title={course.title} description={course.id}/>
                                    <CourseBlock title={course.title} description={course.id}/>
                                    <CourseBlock title={course.title} description={course.id}/>
                                    <CourseBlock title={course.title} description={course.id}/>
                                    <CourseBlock title={course.title} description={course.id}/>
                                    <CourseBlock title={course.title} description={course.id}/>
                                    <CourseBlock title={course.title} description={course.id}/>
                                    <CourseBlock title={course.title} description={course.id}/>
                                    <CourseBlock title={course.title} description={course.id}/>
                                    <CourseBlock title={course.title} description={course.id}/>
                                    <CourseBlock title={course.title} description={course.id}/>
                                    <CourseBlock title={course.title} description={course.id}/>
                                    <CourseBlock title={course.title} description={course.id}/>
                                    <CourseBlock title={course.title} description={course.id}/>
                                    <CourseBlock title={course.title} description={course.id}/>
                                    <CourseBlock title={course.title} description={course.id}/>
                                </>
                            );
                        })}
                    </div>

                    <CreateCourseModal open={openModal} onClose={() => setIsOpenModal(false)}/>
                </>
            )}
        </>
    );
}

export default AdminEducation;