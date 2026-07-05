import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

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

            alert(response.message);

            navigate("/login");

        } catch (err) {
              console.log(err);
    console.log(err.response);
    console.log(err.response?.data);
            alert(err.response?.data?.message || "Registration Failed");

        }

    };

    return (

        <div className="container">

            <h2>Register</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">

                    Register

                </button>

            </form>

            <br />

            <Link to="/login">

                Already have an account? Login

            </Link>

        </div>

    );

}

export default Register;