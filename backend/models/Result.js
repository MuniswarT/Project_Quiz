const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Result", resultSchema);
