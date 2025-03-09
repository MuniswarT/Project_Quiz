import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    return (
        <div className="results-container">
            <div className="results-card">
                <h2>Thank You for Playing! 🎉</h2>
                <p className="score-text">Your Score: <span>{state?.score}</span> / <span>{state?.total}</span></p>
                <div className="button-group">
                    <button className="home-button" onClick={() => navigate("/")}>Home</button>
                    <button className="leaderboard-button" onClick={() => navigate("/leaderboard")}>Leaderboard</button>
                </div>
            </div>

            <style>
                {`
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: 'Poppins', sans-serif;
                    }
                    .results-container {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        background: linear-gradient(135deg, #ff9a9e, #fad0c4);
                    }
                    .results-card {
                        background: white;
                        padding: 40px;
                        border-radius: 12px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                        text-align: center;
                        max-width: 400px;
                        width: 100%;
                    }
                    h2 {
                        color: #333;
                        font-size: 1.8rem;
                        font-weight: bold;
                        margin-bottom: 20px;
                    }
                    .score-text {
                        font-size: 1.5rem;
                        color: #444;
                        margin-bottom: 20px;
                    }
                    .score-text span {
                        font-weight: bold;
                        color: #ff6b6b;
                    }
                    .button-group {
                        display: flex;
                        justify-content: space-around;
                        margin-top: 20px;
                    }
                    .home-button, .leaderboard-button {
                        padding: 12px 20px;
                        font-size: 1rem;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: all 0.3s;
                        font-weight: bold;
                    }
                    .home-button {
                        background: #667eea;
                        color: white;
                    }
                    .home-button:hover {
                        background: #5563c1;
                    }
                    .leaderboard-button {
                        background: #ff6b6b;
                        color: white;
                    }
                    .leaderboard-button:hover {
                        background: #e74c3c;
                    }
                `}
            </style>
        </div>
    );
};

export default Results;
