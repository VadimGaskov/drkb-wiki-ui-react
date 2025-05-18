import {use, useContext, useEffect, useState} from "react";
import {CourseContext} from "../../../context/CourseContext";
import Fox from "../../../assets/img/foxes/list-environment-fox-min.svg";
import AddEnvironmentModelModal
    from "../../EnvironmentModels/_components/add-environment-model-modal/AddEnvironmentModelModal";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import NameCourse from "../_components/NameCourse/NameCourse";
import ErrorSnackbar from "../../../components/ErrorSnackbar/ErrorSnackbar";
import {getAllArticlesByCourse} from "../../../services/drkb-wiki-education/ArticleService";
import CommonTemplate1 from "../../../components/CommonTemplate1/CommonTemplate1";
import {Outlet, useLocation} from "react-router-dom";
import NameArticle from "./_components/NameArticle/NameArticle";
import useFetch from "../../../hooks/useFetch";

const Articles = () => {
    const course = useContext(CourseContext);
    const [articles, isLoading, error] = useFetch(() => getAllArticlesByCourse(course?.id), [course]);
    const [isArticlePath, setIsArticlePath] = useState(false);
    const location = useLocation();
    /*const [articles, setArticles] = useState([]);
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

    }, [course]);*/

    useEffect(() => {
        setIsArticlePath(location.pathname.includes("article"));
    }, [location]);

    return(
       /* <>
            /!*<img src={Fox} alt="" className="list-environment-model-fox"/>
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
                /!*onClose={() => setError(null)} // Optional: clear error after closing*!/
            />*


        </>*/
        <>
            {/*Такой говнокод необходим для того, чтобы сохранить вложенность
            маршрутов чтобы хоебные крошки корректно путь отображали я рот ебал этот проект и эти требования*/}
            {isArticlePath ?
                <Outlet/> :
                <CommonTemplate1
                    title="Список статей"
                    data={articles}
                    isLoading={isLoading}
                    error={error}
                    renderItem={(article) => <NameArticle key={article.id} title={article.title} articleId={article.id}/>}

            />}
        </>

    )
}

export default Articles;