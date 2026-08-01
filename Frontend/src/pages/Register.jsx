import "../styles/Register.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import toast from "react-hot-toast";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
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
            const response = await registerUser(formData);
            toast.success(response.message);
            navigate("/login");
        } catch (err) {
            console.log(err);
            console.log(err.response);
            console.log(err.response?.data);
            toast.error(err.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <div className="authPage">
            <div className="authPanel">
                <div className="authHeader">
                    <span className="brandBadge">Neurixa AI</span>
                    <div className="headlineWrap">
                        <h2>Create your Neurixa account</h2>
                        <p>Register with a simple, modern form built for speed and clarity.</p>
                    </div>
                    <div className="authSummary">
                        <span className="authChip">Quick signup</span>
                        <span className="authChip">Modern UI</span>
                        <span className="authChip">Ready to use</span>
                    </div>
                    <div className="authStats">
                        <div className="statCard">
                            <span>Streamlined fields</span>
                            <p>Clear input groups make the signup flow feel effortless.</p>
                        </div>
                        <div className="statCard">
                            <span>Strong readability</span>
                            <p>High contrast and clean typography help guide every step.</p>
                        </div>
                    </div>
                </div>
                <form className="authForm" onSubmit={handleSubmit}>
                    <div className="inputGroup">
                        <label>Full name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                            placeholder="Create a secure password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="authButton">Register</button>
                </form>
                <div className="authFooter">
                    <span>Already have an account?</span> <Link to="/login">Login instead</Link>
                </div>
            </div>
            <div className="authAside">
                <div className="asideCard">
                    <div className="asideLabel">Built for teams</div>
                    <h3>Reliable account setup</h3>
                    <p>A balanced signup panel with crisp spacing and secure interaction cues.</p>
                    <div className="asideFeatureList">
                        <p>Focused input flow</p>
                        <p>High readability</p>
                        <p>Clean structure</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
