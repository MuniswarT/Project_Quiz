import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchQuizzes } from "../api/quizzes";
import { saveResult } from "../api/results";

const Quiz = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const limit = params.get("limit");

    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadQuiz = async () => {
            setLoading(true);
            setError(null);
            const data = await fetchQuizzes(category, limit);
            if (data.length > 0) {
                setQuestions(data);
            } else {
                setError("Failed to load quiz questions.");
            }
            setLoading(false);
        };
        loadQuiz();
    }, [category, limit]);

    const handleSelectAnswer = (questionIndex, answer) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionIndex]: answer,
        }));
    };

    const handleSubmitQuiz = async () => {
        let score = 0;
        questions.forEach((q, index) => {
            if (selectedAnswers[index] === q.correct_answer) {
                score += 1;
            }
        });

        try {
            await saveResult(5,10);
            navigate("/results", { state: { score, total: questions.length } });
        } catch (error) {
            console.error("Error submitting quiz:", error);
        }
    };

    if (loading) return <h2 className="loading-text">Loading quiz...</h2>;
    if (error) return <h2 className="error-text">Error: {error}</h2>;

    return (
        <div className="quiz-container">
            <h2 className="quiz-title">Quiz Questions</h2>
            {questions.map((q, index) => (
                <div key={index} className="quiz-question-card">
                    <p className="question-text">{q.question}</p>
                    <ul className="answer-list">
                        {[...q.incorrect_answers, q.correct_answer].sort().map((answer, i) => (
                            <li key={i} className="answer-item">
                                <label>
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={answer}
                                        onChange={() => handleSelectAnswer(index, answer)}
                                        checked={selectedAnswers[index] === answer}
                                    />
                                    {answer}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <button className="submit-button" onClick={handleSubmitQuiz}>Submit Quiz</button>
            <style>
                {`
                    .quiz-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        min-height: 100vh;
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        padding: 20px;
                    }
                    .quiz-title {
                        font-size: 2rem;
                        color: white;
                        margin-bottom: 20px;
                    }
                    .quiz-question-card {
                        background: white;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                        margin-bottom: 20px;
                        width: 500px;
                    }
                    .question-text {
                        font-size: 1.2rem;
                        margin-bottom: 10px;
                    }
                    .answer-list {
                        list-style: none;
                        padding: 0;
                    }
                    .answer-item {
                        margin: 5px 0;
                        font-size: 1rem;
                    }
                    .submit-button {
                        padding: 12px 20px;
                        font-size: 1.2rem;
                        background: #ff7eb3;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: background 0.3s;
                    }
                    .submit-button:hover {
                        background: #ff4d6d;
                    }
                    .loading-text, .error-text {
                        font-size: 1.5rem;
                        color: white;
                    }
                `}
            </style>
        </div>
    );
};

export default Quiz;