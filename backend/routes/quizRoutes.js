const express = require("express");
const { fetchQuizzes } = require("../controllers/quizController");

const router = express.Router();

// Fetch quizzes dynamically from OpenTDB API
router.get("/fetch", fetchQuizzes);

module.exports = router;
