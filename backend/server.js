    const express = require('express');
    const dotenv = require('dotenv');
    const cors = require('cors');
    const connectDB = require('./config/db');

    dotenv.config();
    connectDB();

    const app = express();

    // it is middleware
    app.use(cors());
    app.use(express.json());// it iss used to put or post in json format

    // Routes
    app.use('/api/auth', require('./routes/authRoutes'));
    app.use('/api/quizzes', require('./routes/quizRoutes'));
    app.use('/api/results', require('./routes/resultRoutes'));
    app.use((req, res, next) => {
        console.log(`🔍 ${req.method} ${req.url} | Headers:`, req.headers);
        next();
    });
    
    console.log("JWT Secret:", process.env.JWT_SECRET);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
