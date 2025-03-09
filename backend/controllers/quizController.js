const axios = require("axios");
const Quiz = require("../models/Quiz"); // Import the Quiz model

const fetchQuizzes = async (req, res) => {
    try {
        const { category, limit } = req.query;
        console.log("Received API request: Category =", category, "Limit =", limit);

        if (!category || isNaN(limit) || limit < 1) {
            console.error("Invalid category or limit:", { category, limit });
            return res.status(400).json({ message: "Invalid category or limit" });
        }

        // Step 1: Check if questions exist in the database
        const cachedQuestions = await Quiz.find({ category }).limit(parseInt(limit));
        if (cachedQuestions.length > 0) {
            console.log("Returning Cached Questions:", cachedQuestions.length);
            return res.json(cachedQuestions);
        }

        // Step 2: Fetch from OpenTDB if not in cache
        const apiUrl = `https://opentdb.com/api.php?amount=${limit}&category=${category}&type=multiple`;
        console.log("Fetching from OpenTDB API:", apiUrl);
        const response = await axios.get(apiUrl);

        if (response.data.response_code !== 0) {
            console.error("OpenTDB API Error:", response.data);
            return res.status(500).json({ message: "Failed to fetch questions from OpenTDB" });
        }

        // Step 3: Save fetched questions to MongoDB
        const formattedQuestions = response.data.results.map((q) => ({
            category,
            question: q.question,
            correct_answer: q.correct_answer,
            incorrect_answers: q.incorrect_answers,
        }));

        await Quiz.insertMany(formattedQuestions);
        console.log("Saved new questions to database:", formattedQuestions.length);

        return res.json(formattedQuestions);
    } catch (error) {
        console.error("Backend Error in fetchQuizzes:", error.message);
        return res.status(500).json({ message: "Server error while fetching quizzes" });
    }
};

module.exports = { fetchQuizzes };
