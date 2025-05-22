import {createTest, getFullTestById, updateTest} from "../../../../../services/drkb-wiki-education/TestService";
import useFetchObject from "../../../../../hooks/useFetchObject";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import CommonModalWindow from "../../../../../components/ModalWindow/CommonModalWindow";
import {Button, DialogActions, DialogTitle} from "@mui/material";
import SuccessSnackbar from "../../../../../components/SuccessSnackbar/SuccessSnackbar";
import ErrorSnackbar from "../../../../../components/ErrorSnackbar/ErrorSnackbar";

const CreateArticleModal = ({open, onClose, setRefreshKey}) => {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [createTestModel, setCreateTestModel] = useState({
        id: "",
        title: "",
        description: "",
        totalPointsRequired: 0,
        numberOfQuestions: 0,
        numberOfTries: 0,
        question: []
    });

    useEffect(() => {
        console.log(createTestModel);
    }, [createTestModel]);

    const addQuestion = () => {
        setCreateTestModel(prev => ({
            ...prev,
            question: [...prev.question, {
                title: "",
                /*points: 0,*/
                answer: []
            }]
        }));
    };

    const removeQuestion = (index) => {
        const updated = [...createTestModel.question];
        updated.splice(index, 1);
        setCreateTestModel(prev => ({
            ...prev,
            question: updated
        }));
    };

    const updateQuestionField = (index, field, value) => {
        const updated = [...createTestModel.question];
        updated[index][field] = value;
        setCreateTestModel(prev => ({
            ...prev,
            question: updated
        }));
    };

    const addAnswer = (questionIndex) => {
        const updated = [...createTestModel.question];
        updated[questionIndex].answer.push({
            title: "",
            isCorrect: false
        });
        setCreateTestModel(prev => ({
            ...prev,
            question: updated
        }));
    };

    const removeAnswer = (questionIndex, answerIndex) => {
        const updated = [...createTestModel.question];
        updated[questionIndex].answer.splice(answerIndex, 1);
        setCreateTestModel(prev => ({
            ...prev,
            question: updated
        }));
    };

    const updateAnswerTitle = (questionIndex, answerIndex, value) => {
        const updated = [...createTestModel.question];
        updated[questionIndex].answer[answerIndex].title = value;
        setCreateTestModel(prev => ({
            ...prev,
            question: updated
        }));
    };

    const markAsCorrect = (questionIndex, answerIndex) => {
        const updated = [...createTestModel.question];
        updated[questionIndex].answer = updated[questionIndex].answer.map((a, i) => ({
            ...a,
            isCorrect: i === answerIndex
        }));
        setCreateTestModel(prev => ({
            ...prev,
            question: updated
        }));
    };

    const handleSaveTest = async () => {
        console.log(createTestModel);
        const response = await createTest(createTestModel);
        if (response.success) {
            console.log("Тест успешно сохранен");
            setSuccessMessage("Тест успешно сохранен");
            setRefreshKey(prevState => prevState + 1);

            setTimeout(() => {
                onClose();
            },[2000]);

        } else {
            setError("Ошибка при создании теста");
        }
    }

    return(
        <CommonModalWindow isOpen={open} onClose={onClose} maxWidth={"lg"}>
            <SuccessSnackbar message={successMessage} onClose={() => setSuccessMessage(null)} />
            <ErrorSnackbar onClose={() => setError(null)} message={error} />
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveTest();
            }}>
                <DialogTitle>Создание теста</DialogTitle>
                <div className="admin-test">
                    <label>Название</label>
                    <input
                        type="text"
                        value={createTestModel.title}
                        onChange={(e) => setCreateTestModel(prev => ({ ...prev, title: e.target.value }))}
                        required
                    />

                    <label>Описание</label>
                    <input
                        type="text"
                        value={createTestModel.description}
                        onChange={(e) => setCreateTestModel(prev => ({ ...prev, description: e.target.value }))}
                        required
                    />

                    <label>Необходимое количество очков для сдачи</label>
                    <input
                        type="text"
                        value={createTestModel.totalPointsRequired}
                        onChange={(e) => {
                            const digitsOnly = e.target.value.replace(/\D/g, ''); // Убираем всё кроме цифр
                            setCreateTestModel(prev => ({
                                ...prev,
                                totalPointsRequired: digitsOnly === '' ? '' : parseInt(digitsOnly)
                            }));
                        }}
                        required
                    />

                    {parseInt(createTestModel.totalPointsRequired || '0') === 0 && (
                        <span style={{ color: 'red' }}>Значение должно быть больше 0</span>
                    )}

                    <label>Число попыток</label>
                    <input
                        type="text"
                        value={createTestModel.numberOfTries}
                        onChange={(e) => {
                            const digitsOnly = e.target.value.replace(/\D/g, ''); // Убираем всё кроме цифр
                            setCreateTestModel(prev => ({
                                ...prev,
                                numberOfTries: digitsOnly === '' ? '' : parseInt(digitsOnly)
                            }));
                        }}
                        required
                    />

                    {parseInt(createTestModel.numberOfTries || '0') === 0 && (
                        <span style={{ color: 'red' }}>Значение должно быть больше 0</span>
                    )}

                    <label>Количество вопросов после перемешивания</label>
                    <input
                        type="text"
                        value={createTestModel.numberOfQuestions}
                        onChange={(e) => {
                            const digitsOnly = e.target.value.replace(/\D/g, ''); // Убираем всё кроме цифр
                            setCreateTestModel(prev => ({
                                ...prev,
                                numberOfQuestions: digitsOnly === '' ? '' : parseInt(digitsOnly)
                            }));
                        }}
                        required
                    />

                    {parseInt(createTestModel.numberOfQuestions || '0') === 0 && (
                        <span style={{ color: 'red' }}>Значение должно быть больше 0</span>
                    )}

                    {createTestModel.question.map((q, qi) => (
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
                </div>

                <DialogActions sx={{position: "sticky"}}>
                    <Button onClick={onClose} autoFocus color={"error"} variant={"contained"}>
                        Закрыть
                    </Button>
                    <Button autoFocus type={"submit"} variant={"contained"}>
                        Сохранить
                    </Button>
                </DialogActions>
            </form>
        </CommonModalWindow>
    )
}

export default CreateArticleModal;