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
                        <p>A fast, polished signup experience designed to impress during portfolio reviews.</p>
                    </div>
                    <div className="featurePills">
                        <span className="featurePill">Clear flow</span>
                        <span className="featurePill">Clean structure</span>
                        <span className="featurePill">Recruiter-ready</span>
                    </div>
                    <div className="authStats">
                        <div className="statCard">
                            <span>Soft spacing</span>
                            <p>Comfortable fields for quick scanning.</p>
                        </div>
                        <div className="statCard">
                            <span>Clean focus</span>
                            <p>Sharp contrasts with subtle depth.</p>
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
                    <button type="submit">Register</button>
                </form>
                <div className="authFooter">
                    <span>Already have an account?</span> <Link to="/login">Login instead</Link>
                </div>
            </div>
            <div className="authAside">
                <div className="asideCard">
                    <div className="asideLabel">Made for interviews</div>
                    <h3>Stand out in your portfolio</h3>
                    <p>A smooth signup panel with balanced contrast and a frame that feels intentional rather than generic.</p>
                    <div className="asideFeatureList">
                        <p>Understated visual polish</p>
                        <p>Structured field layout</p>
                        <p>Attention to spacing</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
