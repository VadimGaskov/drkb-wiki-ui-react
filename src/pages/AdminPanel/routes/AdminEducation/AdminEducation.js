import "./AdminEducation.css";
import {useEffect} from "react";
import useFetch from "../../../../hooks/useFetch";
import {getAllCourses} from "../../../../services/drkb-wiki-education/CourseService";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import CourseBlock from "./components/CourseBlock/CourseBlock";
const AdminEducation = () => {
    const [courses, isLoading, error] = useFetch(() => getAllCourses())
    useEffect(() => {

    }, []);
    return(
        <div className={"admin-education-wrapper"}>
            {isLoading && (<ProgressBar/>)}

            {courses.map((course) => {
                return (
                    <CourseBlock title={course.title} description={course.id}/>
                );
            })}
        </div>

    );
}

export default AdminEducation;