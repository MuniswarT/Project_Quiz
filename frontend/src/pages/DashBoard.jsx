import { useState, useEffect } from "react";
import { getLeaderboard } from "../api/results";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadLeaderboard = async () => {
            try {
                const response = await getLeaderboard();
                setLeaderboard(response.data);
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
                setError("Failed to load leaderboard. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        loadLeaderboard();
    }, []);

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">🏆 Leaderboard</h2>
            {loading ? (
                <p className="loading-text">Loading...</p>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <div className="table-container">
                    <table className="leaderboard-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Score</th>
                                <th>Total Questions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="no-scores">
                                        No scores yet!
                                    </td>
                                </tr>
                            ) : (
                                leaderboard.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        {/* ✅ Fix: Use entry.user?.name */}
                                        <td>{entry.user?.name || "Unknown"}</td>
                                        <td>{entry.score}</td>
                                        <td>{entry.totalQuestions}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            <Link to="/" className="home-button">Go Home</Link>

            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Poppins', sans-serif;
                }
                .dashboard-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    background: linear-gradient(135deg, #1e3c72, #2a5298);
                    color: white;
                    text-align: center;
                    padding: 20px;
                }
                .dashboard-title {
                    font-size: 2.5rem;
                    margin-bottom: 20px;
                    font-weight: bold;
                }
                .loading-text, .error-message {
                    font-size: 1.2rem;
                    background: rgba(255, 255, 255, 0.2);
                    padding: 10px;
                    border-radius: 10px;
                }
                .table-container {
                    width: 80%;
                    max-width: 800px;
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                    overflow: hidden;
                }
                .leaderboard-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .leaderboard-table thead {
                    background: #1e3c72;
                    color: white;
                }
                .leaderboard-table th, .leaderboard-table td {
                    padding: 15px;
                    text-align: center;
                    border-bottom: 1px solid #ddd;
                }
                .leaderboard-table tbody tr {
                    color: #333;
                }
                .leaderboard-table tr:hover {
                    background: rgba(0, 0, 0, 0.1);
                    transition: 0.3s;
                }
                .no-scores {
                    padding: 20px;
                    font-size: 1.2rem;
                    font-weight: bold;
                    color: #555;
                }
                .home-button {
                    margin-top: 20px;
                    padding: 15px 25px;
                    background: #ff9800;
                    color: white;
                    text-decoration: none;
                    font-size: 1.2rem;
                    border-radius: 10px;
                    transition: background 0.3s;
                }
                .home-button:hover {
                    background: #e68900;
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
