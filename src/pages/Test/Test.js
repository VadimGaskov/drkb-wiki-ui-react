import FoxImg from "../../assets/img/foxes/articlefox.svg";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import {completeTest, getTestById} from "../../services/drkb-wiki-education/TestService";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import ErrorSnackbar from "../../components/ErrorSnackbar/ErrorSnackbar";
import Question from "./components/Question/Question";
import { useState, useEffect } from "react";
import "./Test.css";
import {apiRequest} from "../../services/ApiService";
import SadFox from "../../assets/img/foxes/list-environment-fox-min.svg";
import HappyFox from "../../assets/img/foxes/environment-fox-svg.svg";
const Test = () => {
    const params = useParams();
    const [test, isLoading, error] = useFetch(() => getTestById(params.testId));
    const [answers, setAnswers] = useState(new Map());
    const [testStarted, setTestStarted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [testResult, setTestResult] = useState(null);
    const handleStartTest = () => {
        setTestStarted(true);
    };

    const handleClick = (questionId, answerId) => {
        setAnswers((prevState) => {
            const newMap = new Map(prevState); // Копируем предыдущее состояние
            newMap.set(questionId.toString(), answerId.toString()); // Обновляем ответ для текущего вопроса
            return newMap;
        });
    };

    const handleSend = async () => {
        const response = await completeTest(test.id, answers);
        if (response.success) {
            if(response.data.isPassed) {
                setTestResult({totalPoints: response.data.totalPoint, totalPointsRequired: test.totalPointsRequired, isPassed: response.data.isPassed})
                /*alert(`Тест успешно пройден! количество набранных очков: ${response.data.totalPoint} из ${test.totalPointsRequired}`);*/
            }
            else {
                setTestResult({totalPoints: response.data.totalPoint, totalPointsRequired: test.totalPointsRequired, isPassed: response.data.isPassed})
                /*alert(`Тест пройден не был! Количество набранных очков: ${response.data.totalPoint} из ${test.totalPointsRequired}`);*/
            }
            console.log(testResult);
            setIsOpen(true);
        }
        else {
            alert(response.errorMessage);
        }
    }

    // Для отладки: логируем answers после обновления
    useEffect(() => {
        console.log("Текущее состояние answers:", Object.fromEntries(answers));
    }, [answers]);

    return (
        <>
            <img src={FoxImg} alt="" className="common-template1-fox-img" />
            <div className="caption-wrapper">
                <h1 className="test-title">{test?.title || "Загрузка..."}</h1>
                {testStarted ?
                    <Button variant="contained" onClick={handleSend}>
                        Завершить тест
                    </Button> :
                    <Button variant="contained" onClick={handleStartTest}>
                        Начать тест
                    </Button>
                }

            </div>
            <div className="list-environment-model">
                {isLoading && <ProgressBar />}
                {!isLoading && !error && test && (
                    <>
                        {testStarted ? (
                            <>
                                {test.question.map((question, index) => (
                                    <Question
                                        key={question.id || index} // Уникальный ключ для вопроса
                                        question={question}
                                        handleAnswerClick={handleClick}
                                        selectedAnswer={answers.get(question.id?.toString() || index.toString())} // Передаем текущий выбранный ответ
                                    />
                                ))}
                            </>
                        ) :
                            <div style={{display: "flex", height: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                <h3 style={{alignSelf: "center"}}>{test.description}</h3>
                                <span>Тест содержит : {test.numberOfQuestions} вопросов</span>
                                <span>Необходимое количество очков для прохождения теста: {test.totalPointsRequired}</span>
                                <span>Общее число попыток для прохождения теста: {test.numberOfTries}</span>
                            </div>
                        }

                    </>
                )}
                <ErrorSnackbar errorMessage={error} autoHideDuration={6000} />
            </div>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth>
                <DialogTitle>Результаты теста</DialogTitle>
                <DialogContent>
                    <Typography className="modal-window-content-container">
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                            {testResult && (
                                <>
                                    {testResult.isPassed ? (
                                        <>
                                            <h1>Тест успешно пройден!</h1>
                                            <img src={HappyFox} alt={"asd"} style={{marginTop: "1rem", marginBottom: "1rem"}}/>
                                            <h2>Количество набранных очков: {testResult.totalPoints} из {testResult.totalPointsRequired}</h2>
                                        </>
                                    ) : (
                                        <>
                                            <h1>Тест не пройден!</h1>
                                            <img src={SadFox} alt={"asd"} width={"500"} style={{marginTop: "1rem", marginBottom: "1rem"}}/>

                                            <h2>Количество набранных очков: {testResult.totalPoints} из {testResult.totalPointsRequired}</h2>


                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setIsOpen(false)} color="error">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Test;