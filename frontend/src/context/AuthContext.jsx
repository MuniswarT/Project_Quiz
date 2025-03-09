import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                setUser({ token });
            }
        } catch (error) {
            console.error("Error accessing localStorage:", error);
        }
    }, []);

    const logout = (navigate) => {  // Pass navigate as a parameter
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
