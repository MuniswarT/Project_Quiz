import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth"; 

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!name || !email || !password) {
            setError("All fields are required!");
            setLoading(false);
            return;
        }

        try {
            const response = await register({ name, email, password });

            console.log("Registration successful:", response);
            alert("Registration Successful!");
            navigate("/home");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Register</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    
                    <button type="submit" className="register-button" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <p className="login-link">
                    Already have an account? <span onClick={() => navigate("/login")} className="login-text">Sign in</span>
                </p>
            </div>

            <style>
                {`
                    .container {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        background: linear-gradient(to right, #ff9966, #ff5e62);
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
                        border-color: #ff5e62;
                        outline: none;
                    }
                    .register-button {
                        width: 100%;
                        background: #ff5e62;
                        color: white;
                        padding: 15px;
                        border: none;
                        border-radius: 8px;
                        font-size: 1.2rem;
                        cursor: pointer;
                        transition: background 0.3s ease;
                    }
                    .register-button:hover {
                        background: #ff3b3b;
                    }
                    .error {
                        background: #ff4d4d;
                        color: white;
                        padding: 10px;
                        border-radius: 8px;
                        margin-bottom: 15px;
                    }
                    .login-link {
                        margin-top: 15px;
                        font-size: 1rem;
                        color: #555;
                    }
                    .login-text {
                        color: #007bff;
                        cursor: pointer;
                        font-weight: bold;
                        transition: color 0.3s;
                    }
                    .login-text:hover {
                        color: #0056b3;
                    }
                `}
            </style>
        </div>
    );
};

export default Register;
