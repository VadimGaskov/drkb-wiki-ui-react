import "./AdminTest.css";
import useFetchObject from "../../../../../hooks/useFetchObject";
import {getFullTestById, getTestById, updateTest} from "../../../../../services/drkb-wiki-education/TestService";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SuccessSnackbar from "../../../../../components/SuccessSnackbar/SuccessSnackbar";
import ErrorSnackbar from "../../../../../components/ErrorSnackbar/ErrorSnackbar";

const AdminTest = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const { adminTestId } = useParams();
    const [test, isLoadingTest, errorTest, setErrorTest] = useFetchObject(() => getFullTestById(adminTestId), [refreshKey]);
    const [successMessage, setSuccessMessage] = useState(null);
    const [updateTestModel, setUpdateTest] = useState({
        id: "",
        title: "",
        description: "",
        totalPointsRequired: 0,
        numberOfQuestions: 0,
        numberOfTries: 0,
        question: []
    });

    useEffect(() => {
        if (!test) return;

        setUpdateTest({
            id: test.id,
            title: test.title || "",
            description: test.description || "",
            totalPointsRequired: test.totalPointsRequired || 0,
            numberOfQuestions: test.numberOfQuestions || 0,
            numberOfTries: test.numberOfTries || 0,
            question: test.question
        });
    }, [test]);

    useEffect(() => {
        console.log(updateTestModel);
    }, [updateTestModel]);

    const addQuestion = () => {
        setUpdateTest(prev => ({
            ...prev,
            question: [...prev.question, {
                title: "",
                /*points: 0,*/
                answer: []
            }]
        }));
    };

    const removeQuestion = (index) => {
        const updated = [...updateTestModel.question];
        updated.splice(index, 1);
        setUpdateTest(prev => ({
            ...prev,
            question: updated
        }));
    };

    const updateQuestionField = (index, field, value) => {
        const updated = [...updateTestModel.question];
        updated[index][field] = value;
        setUpdateTest(prev => ({
            ...prev,
            question: updated
        }));
    };

    const addAnswer = (questionIndex) => {
        const updated = [...updateTestModel.question];
        updated[questionIndex].answer.push({
            title: "",
            isCorrect: false
        });
        setUpdateTest(prev => ({
            ...prev,
            question: updated
        }));
    };

    const removeAnswer = (questionIndex, answerIndex) => {
        const updated = [...updateTestModel.question];
        updated[questionIndex].answer.splice(answerIndex, 1);
        setUpdateTest(prev => ({
            ...prev,
            question: updated
        }));
    };

    const updateAnswerTitle = (questionIndex, answerIndex, value) => {
        const updated = [...updateTestModel.question];
        updated[questionIndex].answer[answerIndex].title = value;
        setUpdateTest(prev => ({
            ...prev,
            question: updated
        }));
    };

    const markAsCorrect = (questionIndex, answerIndex) => {
        const updated = [...updateTestModel.question];
        updated[questionIndex].answer = updated[questionIndex].answer.map((a, i) => ({
            ...a,
            isCorrect: i === answerIndex
        }));
        setUpdateTest(prev => ({
            ...prev,
            question: updated
        }));
    };

    const handleSaveTest = async () => {
        console.log(updateTestModel);
        const response = await updateTest(updateTestModel);
        if (response.success) {
            console.log("Тест успешно сохранен");
            setSuccessMessage("Тест успешно сохранен");
            setRefreshKey(prevState => prevState + 1);
        } else {
            setErrorTest("Ошибка при сохранении теста");
        }
    }

    return (
        <div className="admin-test">
            <SuccessSnackbar message={successMessage} onClose={() => setSuccessMessage(null)} />
            <ErrorSnackbar onClose={() => setErrorTest(null)} message={errorTest} />
            {test && !isLoadingTest && (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveTest();
                }}>
                    <label>Название</label>
                    <input
                        type="text"
                        value={updateTestModel.title}
                        onChange={(e) => setUpdateTest(prev => ({ ...prev, title: e.target.value }))}
                        required
                    />

                    <label>Описание</label>
                    <input
                        type="text"
                        value={updateTestModel.description}
                        onChange={(e) => setUpdateTest(prev => ({ ...prev, description: e.target.value }))}
                        required
                    />

                    <label>Необходимое количество очков для сдачи</label>
                    <input
                        type="number"
                        value={updateTestModel.totalPointsRequired}
                        onChange={(e) => setUpdateTest(prev => ({ ...prev, totalPointsRequired: parseInt(e.target.value) }))}
                        required
                    />

                    <label>Число попыток</label>
                    <input
                        type="number"
                        value={updateTestModel.numberOfTries}
                        onChange={(e) => setUpdateTest(prev => ({ ...prev, numberOfTries: parseInt(e.target.value) }))}
                        required
                    />

                    <label>Количество вопросов после перемешивания</label>
                    <input
                        type="number"
                        value={updateTestModel.numberOfQuestions}
                        onChange={(e) => setUpdateTest(prev => ({ ...prev, numberOfQuestions: parseInt(e.target.value) }))}
                        required
                    />

                    {updateTestModel.question.map((q, qi) => (
                        <div className="question-block" key={qi}>
                            <div className="question-header">
                                <strong>Вопрос #{qi + 1}</strong>
                                <button className="danger" onClick={() => removeQuestion(qi)}>🗑 Удалить вопрос</button>
                            </div>

                            <label>Текст вопроса:</label>
                            <input
                                type="text"
                                value={q.title}
                                onChange={(e) => updateQuestionField(qi, "title", e.target.value)}
                                required
                            />

                            {/*<label>Очки за вопрос:</label>
                            <input
                                type="number"
                                value={q.points}
                                onChange={(e) => updateQuestionField(qi, "points", parseInt(e.target.value))}
                                required
                            />*/}

                            <button onClick={() => addAnswer(qi)} type={"button"}>➕ Добавить ответ</button>

                            {q.answer.map((a, ai) => (
                                <div className="answer-block" key={ai}>
                                    <input
                                        type="text"
                                        placeholder="Ответ"
                                        value={a.title}
                                        onChange={(e) => updateAnswerTitle(qi, ai, e.target.value)}
                                        required
                                    />
                                    <label>
                                        <input
                                            type="radio"
                                            name={`correct-${qi}`}
                                            checked={a.isCorrect}
                                            onChange={() => markAsCorrect(qi, ai)}
                                        />
                                        Правильный
                                    </label>
                                    <button className="danger small" onClick={() => removeAnswer(qi, ai)} type={"button"}>🗑</button>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button onClick={addQuestion} type={"button"}>➕ Добавить вопрос</button>
                    <button type={"submit"}>Сохранить</button>
                </form>
            )}
        </div>
    );
};

export default AdminTest;
