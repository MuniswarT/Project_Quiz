const Result = require("../models/Result");
const User = require("../models/User");


const saveResult = async (req, res) => {
    try {
        console.log(" Authenticated User:", req.user);
        console.log(" Request Body:", req.body);

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized. User not found." });
        }

        let { score, totalQuestions } = req.body;

        score = Number(score);
        totalQuestions = Number(totalQuestions);

        if (isNaN(score) || isNaN(totalQuestions)) {
            return res.status(400).json({ message: "Score and totalQuestions must be valid numbers." });
        }

        if (score < 0 || totalQuestions <= 0 || score > totalQuestions) {
            return res.status(400).json({ message: "Invalid score or totalQuestions values." });
        }

        const userId = req.user.id;
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "User not found." });
        }

        const result = new Result({ user: userId, score, totalQuestions });
        await result.save();

        res.status(201).json({ message: "✅ Result saved successfully", result });

    } catch (error) {
        console.error("❌ Error saving result:", error);
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};

// Get leaderboard (Top 10 scores)
const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Result.find()
            .populate("user", "name")
            .sort({ score: -1, date: 1 }) // Highest scores first
            .limit(10);

        res.json(leaderboard);
    } catch (error) {
        console.error("❌ Error fetching leaderboard:", error);
        res.status(500).json({ message: "Error fetching leaderboard", error: error.message });
    }
};

// ✅ Fix: Ensure `getLeaderboard` is correctly defined and exported
module.exports = { saveResult, getLeaderboard };
