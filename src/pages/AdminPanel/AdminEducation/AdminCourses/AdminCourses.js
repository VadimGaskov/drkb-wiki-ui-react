import {Button} from "@mui/material";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import CourseBlock from "../components/CourseBlock/CourseBlock";
import CreateCourseModal from "../components/CreateCourseModal/CreateCourseModal";
import useFetch from "../../../../hooks/useFetch";
import {getAllCourses} from "../../../../services/drkb-wiki-education/CourseService";
import {Outlet, useLocation, useNavigate, useParams, useRoutes} from "react-router-dom";
import {useEffect, useState} from "react";
import "./AdminCourses.css";
import TopButtonWrapper from "../../_components/TopButtonWrapper/TopButtonWrapper";
import AdminDepartmentCardElement
    from "../../AdminUsersManagement/AdminDepartments/_components/AdminDepartmentCardElement/AdminDepartmentCardElement";

const AdminCourses = () => {
    const [courses, isLoading, error] = useFetch(() => getAllCourses());
    const [openModal, setIsOpenModal] = useState(false);
    const [isCoursePath, setIsCoursePath] = useState(false);

    const {adminCourseId} = useParams();

    useEffect(() => {
        if (adminCourseId !== undefined && adminCourseId !== null) {
            setIsCoursePath(true);
        }
        else {
            setIsCoursePath(false);
        }
    }, [adminCourseId]);

    return(
        <>
            {isCoursePath ? (
                <Outlet />
            ) : (
                <>
                    <TopButtonWrapper title={"Создать курс"} onClick={() => setIsOpenModal(true)}/>

                    {/*<div className={"admin-education-wrapper"}>
                        {isLoading && (<ProgressBar/>)}

                        {courses.map((course) => {
                            return (
                                <>
                                    <CourseBlock
                                        title={course.title}
                                        description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, voluptatum."}
                                        courseId={course.id}
                                    />
                                </>
                            );
                        })}
                    </div>*/}

                    <div className="departments-wrapper">
                        {courses.map((course, index) => (
                            <AdminDepartmentCardElement title={course.title} itemId={course.id} key={index}/>
                        ))}
                    </div>

                    <CreateCourseModal open={openModal} onClose={() => setIsOpenModal(false)}/>
                </>
            )}

        </>
    )
}

export default AdminCourses;