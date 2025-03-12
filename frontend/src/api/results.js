import axios from "axios";

const API_URL = "https://project-quiz-dw8k.onrender.com/api/results";

export const getLeaderboard = () => axios.get(`${API_URL}/leaderboard`);

export const saveResult = async (score, totalQuestions) => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error(" No token found in localStorage");
        throw new Error("User not authenticated");
    }

    try {
        const response = await axios.post(
            `${API_URL}/save`,
            { score, totalQuestions },  
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("🚨 Error saving result:", error.response?.data || error.message);
        throw error;
    }
};
