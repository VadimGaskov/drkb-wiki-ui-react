import FoxImg from "../../assets/img/foxes/articlefox.svg";
import NameArticle from "../Article/components/NameArticle/NameArticle";
import testStyle from "./Test.css";
import {Button} from "@mui/material";
import {useParams} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import {getTestById} from "../../services/drkb-wiki-education/TestService";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import ErrorSnackbar from "../../components/ErrorSnackbar/ErrorSnackbar";
const Test = () => {
    const params = useParams();
    const [test, isLoading, error] = useFetch(()=> getTestById(params.testId));

    const handleStartTest = () => {
        alert("тЕСТ НАЧАЛСЯ");
    }


    return (
        <>
            <img src={FoxImg} alt="" className="common-template1-fox-img" />
            <div className="caption-wrapper">
                <h2 className="test-title">{test.title}</h2>
                <Button variant="contained" onClick={() => handleStartTest()}>Начать тест</Button>
            </div>
            <div className="list-environment-model">
                {isLoading && <ProgressBar />}

                {!isLoading && !error && (
                    <>
                        <div>
                            {test.question.map((question, index) =>
                                (
                                    <div style={{border: "1px solid black"}}>
                                        {question.title}
                                        {question.answer.map((answer, index) =>
                                            (
                                                <>
                                                    <p>{answer.title}</p>
                                                </>
                                            ))}
                                    </div>
                                ))}
                        </div>
                    </>
                )}

                <ErrorSnackbar errorMessage={error} autoHideDuration={6000} />
            </div>
        </>
    )
}

export default Test;