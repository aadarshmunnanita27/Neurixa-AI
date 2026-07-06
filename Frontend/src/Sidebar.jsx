import "./Sidebar.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";
const API_URL = import.meta.env.VITE_API_URL;
import logo from "./assets/logo.png";
// import { useContext, useEffect, useState } from "react";

function Sidebar() {
    const { allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats } = useContext(MyContext);
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user") || "null")
    );

    useEffect(() => {

        const updateUser = () => {
            setUser(JSON.parse(localStorage.getItem("user") || "null"));
        };

        window.addEventListener("storage", updateUser);

        return () => window.removeEventListener("storage", updateUser);

    }, []);
    const getAllThreads = async () => {

        if (!localStorage.getItem("token")) {
            setAllThreads([]);
            return;
        }

        try {

            const response = await fetch(`${API_URL}/thread`, {

                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }

            });

            const res = await response.json();

            const filteredData = res.map(thread => ({
                threadId: thread.threadId,
                title: thread.title
            }));

            setAllThreads(filteredData);

        } catch (err) {
            console.log(err);
        }

    };
  useEffect(() => {

    getAllThreads();

    const refreshThreads = () => {
        getAllThreads();
    };

    window.addEventListener("threadUpdated", refreshThreads);

    return () => {
        window.removeEventListener("threadUpdated", refreshThreads);
    };

}, [currThreadId]);

    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    }

    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);

        try {
            const response = await fetch(`${API_URL}/thread/${newThreadId}`, {

                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }

            });
            const res = await response.json();
            console.log(res);
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
        } catch (err) {
            console.log(err);
        }
    }

    const deleteThread = async (threadId) => {
        try {
            const response = await fetch(`${API_URL}/thread/${threadId}`, {

                method: "DELETE",

                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }

            });
            const res = await response.json();
            console.log(res);

            //updated threads re-render
            setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

            if (threadId === currThreadId) {
                createNewChat();
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section className="sidebar">
            <button className="newChatBtn" onClick={createNewChat}>

                <div className="logoSection">

                    <img
                        src={logo}
                        alt="Neurixa AI"
                        className="logo"
                    />

                    <div className="logoText">
                        <h2>Neurixa AI</h2>
                        <p className="logoSubtitle">Your AI Assistant</p>
                    </div>

                </div>

                <i className="fa-solid fa-plus"></i>

            </button>
            {
                !localStorage.getItem("token") && (

                    <div className="guestCard">

                        <h3>Guest Mode</h3>

                        <p>

                            Login to save chat history permanently.

                        </p>

                    </div>

                )
            }
            {
                localStorage.getItem("token") && (
                    <ul className="history">
                        {
                            allThreads?.map((thread, idx) => (
                                <li key={idx}
                                    onClick={(e) => changeThread(thread.threadId)}
                                    className={thread.threadId === currThreadId ? "highlighted" : " "}
                                >
                                    {thread.title}
                                    <i className="fa-solid fa-trash"
                                        onClick={(e) => {
                                            e.stopPropagation(); //stop event bubbling
                                            deleteThread(thread.threadId);
                                        }}
                                    ></i>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
            {
    user && (
        <div className="sign">

            <h2>{user.name}</h2>

            <p>{user.email}</p>

        </div>
    )
}
        </section>
    )
}

export default Sidebar;