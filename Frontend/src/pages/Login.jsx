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
                    <h2>Sign in to your AI workspace</h2>
                    <p>Welcome back! Access your personalized assistant and polished prompt history.</p>
                    <div className="featurePills">
                        <span className="featurePill">Modern dashboard</span>
                        <span className="featurePill">Secure auth</span>
                        <span className="featurePill">Resume-ready UI</span>
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
                    <button type="submit">Login</button>
                </form>
                <div className="authFooter">
                    <span>New to Neurixa?</span> <Link to="/register">Create an account</Link>
                </div>
            </div>
            <div className="authAside">
                <div className="asideCard">
                    <span className="accentLabel">Professional Design</span>
                    <h3>Recruiter-ready layout</h3>
                    <p>Showcase a polished application with sharp typography, subtle glassmorphism, and an elegant dark gradient theme.</p>
                </div>
            </div>
        </div>
    );
}

export default Login;