import AddEnvironmentModelModal
    from "../EnvironmentModels/_components/add-environment-model-modal/AddEnvironmentModelModal";
import Fox from "../../assets/img/foxes/list-environment-fox-min.svg";
import {useEffect, useState} from "react";
import {getAllCourses} from "../../services/drkb-wiki-education/CourseService";
import ErrorSnackbar from "../../components/ErrorSnackbar/ErrorSnackbar";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import NameCourse from "./_components/NameCourse/NameCourse";
import CommonTemplate1 from "../../components/CommonTemplate1/CommonTemplate1";
import {ROUTINGS} from "../../constants/Routings";
import {Outlet} from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Courses = () => {
    const [courses, isLoading, error] = useFetch(() => getAllCourses())
    /*const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCourses = async () => {
            const result = await getAllCourses();
            if (result.success) {
                setCourses(result.data);
            }
            else {
                setError(result.errorMessage);
            }
            setIsLoading(false);
        }

        fetchCourses();
    }, []);*/

    return(
        /*<>
            <img src={Fox} alt="" className="list-environment-model-fox"/>
            <h2>Список курсов</h2>
            <div className="list-environment-model">
                <AddEnvironmentModelModal title={"Добавить оборудование"} environmentModelId={""}></AddEnvironmentModelModal>

                {isLoading && <ProgressBar/>}

                {!isLoading && !error && (
                    <>
                        <ul>
                            {courses.map(course => <NameCourse key={course.id} title={course.title} courseId={course.id}/>)}
                        </ul>
                    </>
                )}

            </div>

            <ErrorSnackbar
                errorMessage={error}
                autoHideDuration={6000}
                /!*onClose={() => setError(null)} // Optional: clear error after closing*!/
            />
        </>*/

        <>
            <CommonTemplate1
                title="Список курсов"
                data={courses}
                isLoading={isLoading}
                error={error}
                renderItem={(course) => <NameCourse key={course.id} title={course.title} courseId={course.id} />}

            />
        </>

    );
}

export default Courses;