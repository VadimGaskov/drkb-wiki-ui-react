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
import TopButtonWrapper from "../../_components/TopButtonWrapper/TopButtonWrapper";
import ItemCardElement from "../../AdminEnvironment/_components/ItemCardElement/ItemCardElement";

const AdminArticles = () => {
    const [articles, isLoadingArticles, articleError] = useFetch(()=> getAllArticles());
    const [isArticlePath, setIsArticlePath] = useState(false);
    const [openModal, setIsOpenModal] = useState(false);
    const [groupedData, setGroupedData] = useState({});
    const {adminArticleId} = useParams();

    useEffect(() => {
        if (adminArticleId !== undefined && adminArticleId !== null) {
            setIsArticlePath(true);
        }
        else {
            setIsArticlePath(false);
        }
    }, [adminArticleId]);

    useEffect(() => {
        if (articles.length === 0) return;
        const grouped = {};

        articles.forEach(item => {
            const firstLetter = item.title[0].toUpperCase();
            if (!grouped[firstLetter]) grouped[firstLetter] = [];
            grouped[firstLetter].push(item);
        });

        setGroupedData(grouped);
    }, [articles]);

    return(
        <>
            {isArticlePath ? (
                <Outlet/>
            ) : (
                <>
                    {articleError && <ErrorSnackbar errorMessage={articleError}/>}

                    <TopButtonWrapper title={"Создать статью"} onClick={() => setIsOpenModal(true)}/>

                    {/*<div className={"admin-education-wrapper"}>
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
                    </div>*/}

                    <div className="grouped-container">
                        {Object.entries(groupedData).map(([letter, items]) => (
                            <div className="group" key={letter}>
                                <h2 className="group-title">{letter}</h2>
                                <div className="items-list">
                                    {items.map((item, index) => (
                                        <ItemCardElement key={index} title={item.title} itemId={item.id}/>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <CreateArticleModal open={openModal} onClose={() => setIsOpenModal(false)}/>
                </>
            )}
        </>
    )
}

export default AdminArticles;