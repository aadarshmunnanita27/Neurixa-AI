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
                        <h2>Secure login for your workspace</h2>
                        <p>Access clean, polished chat tools with a layout built to look sharp in demos.</p>
                    </div>
                    <div className="featurePills">
                        <span className="featurePill">Clean access</span>
                        <span className="featurePill">Strong structure</span>
                        <span className="featurePill">Resume ready</span>
                    </div>
                    <div className="authStats">
                        <div className="statCard">
                            <span>Calm flow</span>
                            <p>Simple form with professional spacing.</p>
                        </div>
                        <div className="statCard">
                            <span>Sharp visuals</span>
                            <p>Dark theme polished for presentation.</p>
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
                    <button type="submit">Login</button>
                </form>
                <div className="authFooter">
                    <span>New to Neurixa?</span> <Link to="/register">Create an account</Link>
                </div>
            </div>
            <div className="authAside">
                <div className="asideCard">
                    <div className="asideLabel">Designed for recruiters</div>
                    <h3>Polished first impression</h3>
                    <p>Minimal noise, refined dark panels, and a deliberate layout that feels intentional rather than generic.</p>
                    <div className="asideFeatureList">
                        <p>Balanced typography</p>
                        <p>Soft glowing accents</p>
                        <p>Strong card-based structure</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
