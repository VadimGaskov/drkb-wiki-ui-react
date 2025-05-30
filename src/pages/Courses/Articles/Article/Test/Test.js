import FoxImg from "../../../../../assets/img/foxes/articlefox.svg";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import { useParams } from "react-router-dom";
import useFetch from "../../../../../hooks/useFetch";
import {completeTest, getTestById, getTestSummary} from "../../../../../services/drkb-wiki-education/TestService";
import ProgressBar from "../../../../../components/ProgressBar/ProgressBar";
import ErrorSnackbar from "../../../../../components/ErrorSnackbar/ErrorSnackbar";
import Question from "./components/Question/Question";
import { useState, useEffect } from "react";
import "./Test.css";
import {apiRequest} from "../../../../../services/ApiService";
import SadFox from "../../../../../assets/img/foxes/list-environment-fox-min.svg";
import HappyFox from "../../../../../assets/img/foxes/environment-fox-svg.svg";
import TestResultModal from "./components/TestResultModal/TestResultModal";
const Test = () => {
    const params = useParams();
    const [testSummary, isLoading, error] = useFetch(() => getTestSummary(params.testId));
    const [answers, setAnswers] = useState(new Map());
    const [testStarted, setTestStarted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [testResult, setTestResult] = useState(null);

    const [isLoadingTest, setIsLoadingTest] = useState(false);
    const [testError, setTestError] = useState(null);
    const [fullTest, setFullTest] = useState(null);

    const handleClick = (questionId, answerId) => {
        setAnswers((prevState) => {
            const newMap = new Map(prevState); // Копируем предыдущее состояние
            newMap.set(questionId.toString(), answerId.toString()); // Обновляем ответ для текущего вопроса
            return newMap;
        });
    };

    const handleSend = async () => {
        const response = await completeTest(testSummary.id, answers);
        if (response.success) {
            if(response.data.isPassed) {
                setTestResult({totalPoints: response.data.totalPoint, totalPointsRequired: testSummary.totalPointsRequired, isPassed: response.data.isPassed})
            }
            else {
                setTestResult({totalPoints: response.data.totalPoint, totalPointsRequired: testSummary.totalPointsRequired, isPassed: response.data.isPassed})
            }
            setIsOpen(true);
        }
        else {
            alert(response.errorMessage);
        }
    }

    useEffect(() => {
        if (!testStarted) return;

        const fetchTest = async (testId) => {
            setIsLoadingTest(true);
            const response = await getTestById(testId);
            if (response.success) {
                console.log("ЗАБРАЛ ДАННЫЕ О ТЕСТЕ");
                setFullTest(response.data);
                console.log(response.data);
            }
            else {
                setTestError(response.errorMessage);
            }
            setIsLoadingTest(false);
        }

        fetchTest(testSummary.id);

    }, [testStarted, testSummary]);

   /* // Для отладки: логируем answers после обновления
    useEffect(() => {
        console.log("Текущее состояние answers:", Object.fromEntries(answers));
    }, [answers]);*/

    return (
        <>
            <img src={FoxImg} alt="" className="common-template1-fox-img" />
            <div className="caption-wrapper">
                <h1 className="test-title">{testSummary?.title || "Загрузка..."}</h1>
            </div>
            <div className="list-environment-model">
                {isLoading && <ProgressBar />}
                {!isLoading && !error && testSummary && (
                    <>
                        {testStarted ? (
                            <>
                                {fullTest && (
                                    <>
                                        {fullTest.question.map((question, index) => (
                                            <Question
                                                key={question.id || index} // Уникальный ключ для вопроса
                                                question={question}
                                                handleAnswerClick={handleClick}
                                                selectedAnswer={answers.get(question.id?.toString() || index.toString())} // Передаем текущий выбранный ответ
                                            />
                                        ))}
                                        <div className={"test-button-wrapper"}>
                                            <Button variant="contained" onClick={handleSend}>
                                                Завершить тест
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </>
                        ) :
                            <div style={{display: "flex", height: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                <h3 style={{alignSelf: "center"}}>{testSummary.description}</h3>
                                <span>Тест содержит : {testSummary.numberOfQuestions} вопросов</span>
                                <span>Необходимое количество очков для прохождения теста: {testSummary.totalPointsRequired}</span>
                                <span>Общее число попыток для прохождения теста: {testSummary.numberOfTries}</span>
                                <span>Попыток осталось: {testSummary.numberOfTriesLeft}</span>
                                <Button variant="contained" onClick={() => setTestStarted(true)} sx={{width: "20%", marginTop: "1rem"}}>
                                    Начать тест
                                </Button>
                            </div>
                        }

                    </>
                )}
                <ErrorSnackbar errorMessage={error} autoHideDuration={6000} />
            </div>

            <TestResultModal trigger={isOpen} testResult={testResult}/>
        </>
    );
};

export default Test;