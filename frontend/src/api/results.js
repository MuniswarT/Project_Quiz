import axios from "axios";

export const saveResult = async (score, totalQuestions) => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("❌ No authentication token found");
        throw new Error("No authentication token found");
    }

    return axios.post("http://localhost:8000/api/results/save", 
        { score, totalQuestions }, 
        { headers: { Authorization: `Bearer ${token}` } } 
    );
};
