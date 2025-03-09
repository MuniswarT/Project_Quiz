const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    category: String,
    question: String,
    correct_answer: String,
    incorrect_answers: [String],
});

module.exports = mongoose.model("Quiz", quizSchema);
