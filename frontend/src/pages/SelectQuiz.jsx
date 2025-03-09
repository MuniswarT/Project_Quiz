import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SelectQuiz = () => {
    const [limit, setLimit] = useState(5);
    const navigate = useNavigate();
    const category = new URLSearchParams(useLocation().search).get("category");

    const startQuiz = () => {
        navigate(`/quiz?category=${category}&limit=${limit}`);
    };

    return (
        <div className="select-quiz-container">
            <div className="select-quiz-card">
                <h2>Select Number of Questions</h2>
                <input 
                    type="number" 
                    className="quiz-input" 
                    value={limit} 
                    onChange={(e) => setLimit(e.target.value)} 
                    min="1" max="20" 
                />
                <button onClick={startQuiz} className="quiz-button">Start Quiz</button>
            </div>
            <style>
                {`
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: 'Poppins', sans-serif;
                    }
                    .select-quiz-container {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        background: linear-gradient(135deg, #FF7E5F, #FEB47B);
                    }
                    .select-quiz-card {
                        background: white;
                        padding: 40px;
                        border-radius: 12px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                        width: 350px;
                        text-align: center;
                    }
                    h2 {
                        margin-bottom: 20px;
                        color: #333;
                        font-size: 1.8rem;
                        font-weight: bold;
                    }
                    .quiz-input {
                        width: 100%;
                        padding: 12px;
                        border: 2px solid #ddd;
                        border-radius: 8px;
                        font-size: 1rem;
                        text-align: center;
                        transition: all 0.3s ease;
                    }
                    .quiz-input:focus {
                        border-color: #FF7E5F;
                        outline: none;
                    }
                    .quiz-button {
                        width: 100%;
                        background: #FF7E5F;
                        color: white;
                        padding: 15px;
                        border: none;
                        border-radius: 8px;
                        font-size: 1.2rem;
                        cursor: pointer;
                        transition: background 0.3s ease;
                        margin-top: 15px;
                    }
                    .quiz-button:hover {
                        background: #E76F51;
                    }
                `}
            </style>
        </div>
    );
};

export default SelectQuiz;