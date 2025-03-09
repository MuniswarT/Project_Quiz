import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        document.title = "Quiz App - Home";
    }, []);

    const selectQuiz = (category) => navigate(`/select-quiz?category=${category}`);
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="container">
            <nav className="navbar">
                <h2>Quiz App</h2>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </nav>
            <h1 className="welcome">Welcome to the Quiz App</h1>
            <p className="description">Select a Quiz Category</p>
            <div className="quiz-options">
                {[{ category: 9, label: "General Knowledge" },
                  { category: 21, label: "Sports" }].map(({ category, label }) => (
                    <button key={category} className="quiz-btn" onClick={() => selectQuiz(category)}>
                        {label}
                    </button>
                ))}
            </div>
            
            <style>
                {`
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: Arial, sans-serif;
                    }
                    .container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        min-height: 100vh;
                        background-color: #f4f4f4;
                        padding: 20px;
                    }
                    .navbar {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background-color: #222;
                        color: white;
                        padding: 15px 30px;
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    .logout-btn {
                        background-color: #ff4d4d;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: 0.3s;
                    }
                    .logout-btn:hover {
                        background-color: #cc0000;
                    }
                    .welcome {
                        margin-top: 100px;
                        font-size: 2.5rem;
                        font-weight: bold;
                        color: #333;
                    }
                    .description {
                        font-size: 1.2rem;
                        color: #666;
                        margin-top: 10px;
                    }
                    .quiz-options {
                        display: flex;
                        gap: 20px;
                        margin-top: 30px;
                    }
                    .quiz-btn {
                        background-color: #007bff;
                        color: white;
                        border: none;
                        padding: 15px 30px;
                        font-size: 1.2rem;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: 0.3s;
                        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
                    }
                    .quiz-btn:hover {
                        background-color: #0056b3;
                    }
                    @media (max-width: 768px) {
                        .quiz-options {
                            flex-direction: column;
                            align-items: center;
                        }
                        .quiz-btn {
                            width: 80%;
                            text-align: center;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default Home;