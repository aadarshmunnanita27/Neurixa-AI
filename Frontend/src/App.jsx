import './App.css';
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import {MyContext} from "./MyContext.jsx";
import { useState } from 'react';

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import ProtectRoute from "./components/ProtectRoute";

import {v1 as uuidv1} from "uuid";
import PublicRoute from "./components/PublicRoute";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); //stores all chats of curr threads
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads
  }; 

  return (

<Routes>

<Route path="/" element={<Navigate to="/login"/>}/>

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

<Route

path="/chat"

element={

<ProtectRoute>

<div className="app">

<MyContext.Provider value={providerValues}>

<Sidebar/>

<ChatWindow/>

</MyContext.Provider>

</div>

</ProtectRoute>

}

/>

</Routes>

);
}

export default App
