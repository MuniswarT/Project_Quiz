import "bootstrap/dist/css/bootstrap.min.css";
import "./custom-bootstrap.css"; // Custom Bootstrap overrides

import "./index.css";

// App.jsx
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Dashboard from "./pages/DashBoard";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SelectQuiz from "./pages/SelectQuiz";
import Results from "./pages/Results";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/register" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/select-quiz" element={<SelectQuiz />} />
            <Route path="/leaderboard" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
            <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
        </Routes>
    );
};
export default App;
