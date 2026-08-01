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
                    <h2>Create your account</h2>
                    <p>Build a standout project with a polished signup experience built for recruiters.</p>
                    <div className="featurePills">
                        <span className="featurePill">Clean form flow</span>
                        <span className="featurePill">AI-first experience</span>
                        <span className="featurePill">Strong visual polish</span>
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
                    <button type="submit">Register</button>
                </form>
                <div className="authFooter">
                    <span>Already have an account?</span> <Link to="/login">Login instead</Link>
                </div>
            </div>
            <div className="authAside">
                <div className="asideCard">
                    <span className="accentLabel">Premium UI</span>
                    <h3>Eye-catching signup flow</h3>
                    <p>Use clean spacing, strong contrast, and clear form structure to create an impressive front-end presentation.</p>
                </div>
            </div>
        </div>
    );
}

export default Register;