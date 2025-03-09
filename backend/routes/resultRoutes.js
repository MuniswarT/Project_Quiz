const express = require("express");
const { saveResult, getLeaderboard } = require("../controllers/resultController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/save", protect, saveResult);       // Save quiz result
router.get("/leaderboard", getLeaderboard);       // Get top scores

module.exports = router;
