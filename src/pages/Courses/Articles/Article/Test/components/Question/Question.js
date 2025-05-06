import "./Question.css";

const Question = ({ question, handleAnswerClick, selectedAnswer }) => {
    return (
        <div className={"question-wrapper"}>
            <span className={"test-question-title"}>{question.title}</span>
            {question.answer.map((answer, index) => (
                <div key={answer.id || index}>
                    <label className="test-radio-btn">
                        <input
                            type="radio"
                            name={`question-${question.id}`}
                            checked={selectedAnswer === answer.id?.toString() || selectedAnswer === answer.title?.toString()}
                            onChange={() => handleAnswerClick(question.id, answer.id)}
                        />
                        <span className="custom-radio"></span>
                        <span className={"test-answer-title"}>{answer.title}</span>
                    </label>
                </div>
            ))}
        </div>
    );
};

export default Question;