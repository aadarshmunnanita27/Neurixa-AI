import axios from "axios";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/auth`,
});

// Register User
export const registerUser = async (userData) => {
    const response = await API.post("/register", userData);
    return response.data;
};

// Login User
export const loginUser = async (userData) => {
    const response = await API.post("/login", userData);
    return response.data;
};

// Get Logged-in User
export const getCurrentUser = async (token) => {

    const response = await API.get("/me", {

        headers: {
            Authorization: `Bearer ${token}`,
        },

    });

    return response.data;
};