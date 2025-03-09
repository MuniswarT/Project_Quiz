import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await login({ email, password });
            localStorage.setItem("token", response.data.token);
            setUser({ token: response.data.token });
            navigate("/home");
        } catch (error) {
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Login</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <p className="register-text">Don't have an account? <span className="register-link" onClick={() => navigate("/register")}>Register here</span></p>
            </div>

            <style>
                {`
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: Arial, sans-serif;
                    }
                    .container {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        background: linear-gradient(to right, #4facfe, #00f2fe);
                    }
                    .card {
                        background: white;
                        padding: 40px;
                        border-radius: 12px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                        width: 400px;
                        text-align: center;
                    }
                    h2 {
                        margin-bottom: 20px;
                        color: #333;
                        font-size: 2rem;
                    }
                    label {
                        display: block;
                        text-align: left;
                        font-weight: bold;
                        margin: 10px 0 5px;
                        color: #555;
                    }
                    input {
                        width: 100%;
                        padding: 12px;
                        margin-bottom: 15px;
                        border: 2px solid #ddd;
                        border-radius: 8px;
                        font-size: 1rem;
                        transition: border 0.3s ease;
                    }
                    input:focus {
                        border-color: #4facfe;
                        outline: none;
                    }
                    .login-btn {
                        width: 100%;
                        background: #4facfe;
                        color: white;
                        padding: 15px;
                        border: none;
                        border-radius: 8px;
                        font-size: 1.2rem;
                        cursor: pointer;
                        transition: background 0.3s ease;
                    }
                    .login-btn:hover {
                        background: #007bff;
                    }
                    .error {
                        background: #ff4d4d;
                        color: white;
                        padding: 10px;
                        border-radius: 8px;
                        margin-bottom: 15px;
                    }
                    .register-text {
                        margin-top: 15px;
                        font-size: 1rem;
                        color: #555;
                    }
                    .register-link {
                        color: #007bff;
                        cursor: pointer;
                        font-weight: bold;
                        transition: color 0.3s;
                    }
                    .register-link:hover {
                        color: #0056b3;
                    }
                `}
            </style>
        </div>
    );
};

export default Login;