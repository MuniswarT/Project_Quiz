import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.username || !formData.email || !formData.password) {
            setError("All fields are required!");
            return;
        }

        try {
            console.log("User Registered:", formData);
            alert("Registration Successful!");
            navigate("/home");
        } catch (err) {
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h1>Register</h1>
                {error && <div className="error-message">{error}</div>}
                <form className="register-form" onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} required />
                    
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                    
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
                    
                    <button type="submit" className="register-button">Register</button>
                </form>
                <p className="login-link">Already have an account? <span onClick={() => navigate("/login")} className="login-text">Sign in</span></p>
            </div>

            <style>
                {`
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: 'Poppins', sans-serif;
                    }
                    .register-container {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        background: linear-gradient(135deg, #667eea, #764ba2);
                    }
                    .register-card {
                        background: white;
                        padding: 50px;
                        border-radius: 12px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                        width: 400px;
                        text-align: center;
                    }
                    h1 {
                        margin-bottom: 20px;
                        color: #333;
                        font-size: 2rem;
                        font-weight: bold;
                    }
                    label {
                        display: block;
                        text-align: left;
                        font-weight: 600;
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
                        transition: all 0.3s ease;
                    }
                    input:focus {
                        border-color: #667eea;
                        outline: none;
                    }
                    .register-button {
                        width: 100%;
                        background: #667eea;
                        color: white;
                        padding: 15px;
                        border: none;
                        border-radius: 8px;
                        font-size: 1.2rem;
                        cursor: pointer;
                        transition: background 0.3s ease;
                    }
                    .register-button:hover {
                        background: #5563c1;
                    }
                    .error-message {
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
