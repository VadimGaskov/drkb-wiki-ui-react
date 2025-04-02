import {useContext, useEffect, useState} from "react";
import {CourseContext} from "../../context/CourseContext";
import Fox from "../../assets/img/foxes/list-environment-fox-min.svg";
import AddEnvironmentModelModal
    from "../list-environment-model/components/add-environment-model-modal/AddEnvironmentModelModal";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import NameCourse from "../list-courses/components/NameCourse/NameCourse";
import ErrorSnackbar from "../../components/ErrorSnackbar/ErrorSnackbar";
import {getAllArticlesByCourse} from "../../services/drkb-wiki-education/ArticleService";

const Course = () => {
    const course = useContext(CourseContext);
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (course === null || course === undefined) return;

        const fetchArticles = async () => {
            const result = await getAllArticlesByCourse(course.id);
            if(result.success) {
                setArticles(result.data);
            }
            else {
                setError(result.errorMessage);
            }
            setIsLoading(false);
        }

        fetchArticles();

    }, [course]);

    return(
        <>
            <img src={Fox} alt="" className="list-environment-model-fox"/>
            <h2>Список статей</h2>
            <div className="list-environment-model">
                <AddEnvironmentModelModal title={"Добавить статью"} environmentModelId={""}></AddEnvironmentModelModal>

                {isLoading && <ProgressBar/>}

                {!isLoading && !error && (
                    <>
                        <ul>
                            {articles.map(course => <NameCourse key={course.id} title={course.title} courseId={course.id}/>)}
                        </ul>
                    </>
                )}

            </div>

            <ErrorSnackbar
                errorMessage={error}
                autoHideDuration={6000}
                /*onClose={() => setError(null)} // Optional: clear error after closing*/
            />
        </>
    )
}

export default Course;