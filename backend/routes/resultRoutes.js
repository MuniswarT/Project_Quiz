const express = require("express");
const router = express.Router();

const resultController = require("../controllers/resultController"); 
const { protect } = require("../middleware/authMiddleware");

router.post("/save", protect, resultController.saveResult); 
router.get("/leaderboard", resultController.getLeaderboard);  
module.exports = router;
