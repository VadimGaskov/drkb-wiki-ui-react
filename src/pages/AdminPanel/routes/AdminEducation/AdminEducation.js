import "./AdminEducation.css";
import {useEffect, useState} from "react";
import useFetch from "../../../../hooks/useFetch";
import {getAllCourses} from "../../../../services/drkb-wiki-education/CourseService";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import CourseBlock from "./components/CourseBlock/CourseBlock";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import CreateCourse from "../CreateCourse/CreateCourse";
import CreateCourseModal from "./components/CreateCourseModal/CreateCourseModal";
const AdminEducation = () => {
    const [courses, isLoading, error] = useFetch(() => getAllCourses());
    const navigate = useNavigate();
    const [openModal, setIsOpenModal] = useState(false);

    return(
        <>
            <div className={"admin-education-wrapper-top"}>
                <Button variant={"contained"} onClick={()=> navigate("/admin/create-course")}>Создать курс</Button>
                <Button variant={"contained"} onClick={()=> setIsOpenModal(true)}>Открыть модалку по созданию</Button>

            </div>
            <div className={"admin-education-wrapper"}>
                {isLoading && (<ProgressBar/>)}

                {courses.map((course) => {
                    return (
                        <>
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
                            <CourseBlock title={course.title} description={course.id}/>
                        </>
                    );
                })}
            </div>

            <CreateCourseModal open={openModal} onClose={() => setIsOpenModal(false)} />
        </>
    );
}

export default AdminEducation;