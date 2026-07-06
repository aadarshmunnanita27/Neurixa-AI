import "./App.css";
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from "./MyContext.jsx";
import { useState } from "react";

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PublicRoute from "./components/PublicRoute";

import { v1 as uuidv1 } from "uuid";

function App() {

    const [prompt, setPrompt] = useState("");
    const [reply, setReply] = useState(null);
    const [currThreadId, setCurrThreadId] = useState(uuidv1());
    const [prevChats, setPrevChats] = useState([]);
    const [newChat, setNewChat] = useState(true);
    const [allThreads, setAllThreads] = useState([]);

    const providerValues = {
        prompt,
        setPrompt,
        reply,
        setReply,
        currThreadId,
        setCurrThreadId,
        newChat,
        setNewChat,
        prevChats,
        setPrevChats,
        allThreads,
        setAllThreads,
    };

    return (
        <Routes>

            <Route
                path="/"
                element={
                    <div className="app">
                        <MyContext.Provider value={providerValues}>
                            <Sidebar />
                            <ChatWindow />
                        </MyContext.Provider>
                    </div>
                }
            />

            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />

            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                }
            />

        </Routes>
    );
}

export default App;