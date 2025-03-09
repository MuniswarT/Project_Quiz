import axios from "axios";

const API_URL = "http://localhost:8000/api/quizzes";

export const fetchQuizzes = async (category, limit) => {
    try {
        const token = localStorage.getItem("token");

        // Fetch quizzes with authentication
        const response = await axios.get(`${API_URL}/fetch?category=${category}&limit=${limit}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ Quiz Data Received:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error Fetching Quizzes:", error.response?.data || error.message);
        return [];
    }
};
    