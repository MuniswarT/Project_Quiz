import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <Link to="/" className="nav-link">🏠 Home</Link>
            {user ? (
                <button className="btn" onClick={() => logout(navigate)}>🚪 Logout</button>
            ) : (
                <>
                    <Link to="/login" className="nav-link">🔑 Login</Link>
                    <Link to="/register" className="nav-link">📝 Register</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
