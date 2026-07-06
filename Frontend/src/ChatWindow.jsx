import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
const API_URL = import.meta.env.VITE_API_URL;

function ChatWindow() {
    const { prompt, setPrompt, reply, setReply, currThreadId, setPrevChats, setNewChat } = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = !!localStorage.getItem("token");

    const getReply = async () => {
        setLoading(true);
        setNewChat(false);

        console.log("message ", prompt, " threadId ", currThreadId);
        const options = {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                ...(localStorage.getItem("token") && {

                    Authorization: `Bearer ${localStorage.getItem("token")}`

                })

            },

            body: JSON.stringify({

                message: prompt,

                threadId: currThreadId

            })

        };

        try {
            const response = await fetch(`${API_URL}/chat`, options);

            const res = await response.json();

            console.log("Backend Response:", res);

            if (!response.ok) {
                throw new Error(res.error);
            }

            setReply(res.reply);

        } catch (err) {
            console.error(err);
            alert(err.message);
        } finally {
            setLoading(false);
            window.dispatchEvent(new Event("threadUpdated"));
        }
    }

    //Append new chat to prevChats
    useEffect(() => {
        if (prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                }, {
                    role: "assistant",
                    content: reply
                }]
            ));
        }

        setPrompt("");
    }, [reply]);


    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    }

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setIsOpen(false);

        window.location.href = "/";

    }

    const switchAccount = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";

    }

  

    return (
        <div className="chatWindow">
            <div className="navbar">
                <span>

                    {

                        isLoggedIn

                            ?

                            <>Welcome, <b>{user?.name}</b></>

                            :

                            <>Welcome, <b>Guest</b></>

                    }

                </span>
                <div className="userIconDiv" onClick={handleProfileClick}>
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>
            {
                isOpen &&

                <div className="dropDown">

                    <div className="dropDownItem">
                        <i className="fa-solid fa-gear"></i>
                        Settings
                    </div>

                    <div className="dropDownItem">
                        <i className="fa-solid fa-cloud-arrow-up"></i>
                        Upgrade Plan
                    </div>

                    {
                        isLoggedIn ? (

                            <>
                                <div
                                    className="dropDownItem"
                                    onClick={logout}
                                >
                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                    Logout
                                </div>

                                <div
                                    className="dropDownItem"
                                    onClick={switchAccount}
                                >
                                    <i className="fa-solid fa-users"></i>
                                    Switch Account
                                </div>
                            </>

                        ) : (

                            <>
                                <div
                                    className="dropDownItem"
                                    onClick={() => window.location.href = "/login"}
                                >
                                    <i className="fa-solid fa-right-to-bracket"></i>
                                    Login
                                </div>

                                <div
                                    className="dropDownItem"
                                    onClick={() => window.location.href = "/register"}
                                >
                                    <i className="fa-solid fa-user-plus"></i>
                                    Register
                                </div>
                            </>

                        )
                    }

                </div>
            }
            <Chat></Chat>

            <div className="loaderContainer">

                <ScaleLoader
                    color="#60A5FA"
                    loading={loading}
                    height={40}
                    width={4}
                    radius={4}
                    margin={3}
                />

            </div>

            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask anything"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''}
                    >

                    </input>
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">
                    Neurixa AI can make mistakes. Check important info. See Cookie Preferences.
                </p>
            </div>
        </div>
    )
}

export default ChatWindow;