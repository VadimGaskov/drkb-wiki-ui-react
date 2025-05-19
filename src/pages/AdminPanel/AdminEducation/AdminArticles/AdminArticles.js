import useFetch from "../../../../hooks/useFetch";
import {getAllArticles} from "../../../../services/drkb-wiki-education/ArticleService";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import ErrorSnackbar from "../../../../components/ErrorSnackbar/ErrorSnackbar";
import {useEffect, useState} from "react";
import {Outlet,useParams} from "react-router-dom";
import {Button} from "@mui/material";
import CourseBlock from "../components/CourseBlock/CourseBlock";
import CreateCourseModal from "../components/CreateCourseModal/CreateCourseModal";
import CreateArticleModal from "./_components/CreateArticleModal/CreateArticleModal";

const AdminArticles = () => {
    const [articles, isLoadingArticles, articleError] = useFetch(()=> getAllArticles());
    const [isArticlePath, setIsArticlePath] = useState(false);
    const [openModal, setIsOpenModal] = useState(false);
    const {adminArticleId} = useParams();

    useEffect(() => {
        if (adminArticleId !== undefined && adminArticleId !== null) {
            setIsArticlePath(true);
        }
        else {
            setIsArticlePath(false);
        }
    }, [adminArticleId]);

    return(
        <>
            {isArticlePath ? (
                <Outlet/>
            ) : (
                <>
                    {articleError && <ErrorSnackbar errorMessage={articleError}/>}

                    <div className={"admin-education-wrapper-top"}>
                        <Button variant={"contained"} onClick={() => setIsOpenModal(true)}>Создать статью</Button>
                    </div>
                    <div className={"admin-education-wrapper"}>
                        {isLoadingArticles && (<ProgressBar/>)}

                        {articles.map((article) => {
                            return (
                                <>
                                    <CourseBlock
                                        title={article.title}
                                        description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, voluptatum."}
                                        courseId={article.id}
                                    />
                                </>
                            );
                        })}
                    </div>

                    <CreateArticleModal open={openModal} onClose={() => setIsOpenModal(false)}/>
                </>
            )}
        </>
    )
}

export default AdminArticles;