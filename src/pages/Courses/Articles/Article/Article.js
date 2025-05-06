import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import ErrorSnackbar from "../../../../components/ErrorSnackbar/ErrorSnackbar";
import FoxImg from "../../../../assets/img/foxes/articlefox.svg";
import NameArticle from "./_components/NameArticle/NameArticle";
import {useContext, useEffect, useState} from "react";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import {getTestByArticle} from "../../../../services/drkb-wiki-education/TestService";
import {ArticleContext} from "../../../../context/ArticleContext";
import "./Article.css";
import {Button} from "@mui/material";
import {ROUTINGS} from "../../../../constants/Routings";
import {CourseContext} from "../../../../context/CourseContext";
const Article = () => {
    const article = useContext(ArticleContext);
    const course = useContext(CourseContext);
    const navigate = useNavigate();
    const [tests, isLoading, error] = useFetch(() => getTestByArticle(article?.id), [article]);
    const [isTestPath, setIsTestPath] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsTestPath(location.pathname.includes("test"));
    }, [location]);

    const redirectToTest = (testId) => {
        navigate(`${ROUTINGS.TEST(testId)}`);
    }

    return(
        <>
            {isTestPath ?
                <Outlet/> :
                <>
                    <img src={FoxImg} alt="" className="common-template1-fox-img" />
                    <div className="list-environment-model">
                        <div style={{ padding: "1rem",backgroundColor: "white", borderRadius: "0.8rem", marginBottom: "1rem"}}>
                            <h3 style={{textAlign: "center", marginBottom: "2rem"}}>{article?.title}</h3>
                            <div dangerouslySetInnerHTML={{ __html: article?.content }} />
                        </div>

                        {isLoading && <ProgressBar />}

                        {!isLoading && !error && (
                            <ul style={{display: "flex", justifyContent: "end"}}>
                                {tests.map((test, index)=> <Button variant={"contained"} className="go-to-test-btn" onClick={() => redirectToTest(test.id)}>Пройти тест по теме</Button>)}
                            </ul>
                        )}

                        <ErrorSnackbar errorMessage={error} autoHideDuration={6000} />
                    </div>
                </>
            }
        </>

    )
}

export default Article;