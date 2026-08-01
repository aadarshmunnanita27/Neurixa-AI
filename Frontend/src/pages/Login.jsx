import "../styles/Login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import toast from "react-hot-toast";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData);
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));
            toast.success(response.message);
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="authPage">
            <div className="authPanel">
                <div className="authHeader">
                    <span className="brandBadge">Neurixa AI</span>
                    <div className="headlineWrap">
                        <h2>Secure access to your AI workspace</h2>
                        <p>Fast sign-in with a modern interface designed for clarity and reliability.</p>
                    </div>
                    <div className="authSummary">
                        <span className="authChip">Fast access</span>
                        <span className="authChip">Clean design</span>
                        <span className="authChip">Secure session</span>
                    </div>
                    <div className="authStats">
                        <div className="statCard">
                            <span>Clear workflow</span>
                            <p>Only the fields you need, arranged for quick completion.</p>
                        </div>
                        <div className="statCard">
                            <span>Trusted styling</span>
                            <p>Soft contrast, precise spacing, and polished card structure.</p>
                        </div>
                    </div>
                </div>
                <form className="authForm" onSubmit={handleSubmit}>
                    <div className="inputGroup">
                        <label>Email address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="inputGroup">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="authButton">Login</button>
                </form>
                <div className="authFooter">
                    <span>New to Neurixa?</span> <Link to="/register">Create an account</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
