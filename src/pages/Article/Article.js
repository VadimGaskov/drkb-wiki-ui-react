import ProgressBar from "../../components/ProgressBar/ProgressBar";
import ErrorSnackbar from "../../components/ErrorSnackbar/ErrorSnackbar";
import FoxImg from "../../assets/img/foxes/articlefox.svg";
import NameArticle from "./components/NameArticle/NameArticle";
import {useEffect, useState} from "react";
import {Outlet, useLocation, useParams} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import {getTestByArticle} from "../../services/drkb-wiki-education/TestService";
const Article = () => {
    const params = useParams();
    const [tests, isLoading, error] = useFetch(() => getTestByArticle(params.articleId));
    const [isTestPath, setIsTestPath] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsTestPath(location.pathname.includes("test"));
    }, [location]);
    return(
        <>
            {isTestPath ?
                <Outlet/> :
                <>
                    <img src={FoxImg} alt="" className="common-template1-fox-img" />
                    <h2>Список тестов</h2>
                    <div className="list-environment-model">
                        {isLoading && <ProgressBar />}

                        {!isLoading && !error && (
                            <ul>{tests.map((test, index)=> <NameArticle testId={test.id} text={test.title}/>)}</ul>
                        )}

                        <ErrorSnackbar errorMessage={error} autoHideDuration={6000} />
                    </div>
                </>
            }
        </>

    )
}

export default Article;