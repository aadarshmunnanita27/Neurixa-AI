import express from "express";
import Thread from "../models/Thread.js";
import getGeminiResponse from "../utils/gemini.js";
import authMiddleware from "../middleware/authMiddleware.js";
//test
const router = express.Router();

router.post("/test", async (req, res) => {
    try {
        const thread = new Thread({
            threadId: "abc",
            title: "Testing New Thread2"
        });

        const response = await thread.save();
        res.send(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to save in DB" });
    }
});

router.use((req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        req.user = null;
        return next();
    }

    authMiddleware(req, res, next);

});

//Get all threads
router.get("/thread", async (req, res) => {
    try {
        const threads = await Thread.find({
            user: req.user._id
        }).sort({ updatedAt: -1 });
        //descending order of updatedAt...most recent data on top
        res.json(threads);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch threads" });
    }
});

router.get("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;

    try {
        const thread = await Thread.findOne({
            threadId,
            user: req.user._id
        });

        if (!thread) {
            res.status(404).json({ error: "Thread not found" });
        }

        res.json(thread.messages);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch chat" });
    }
});

router.delete("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;

    try {
        const deletedThread = await Thread.findOneAndDelete({ threadId, user: req.user._id });

        if (!deletedThread) {
            res.status(404).json({ error: "Thread not found" });
        }

        res.status(200).json({ success: "Thread deleted successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete thread" });
    }
});

router.post("/chat", async (req, res) => {
    const { threadId, message } = req.body;

    if (!threadId || !message) {
        res.status(400).json({ error: "missing required fields" });
    }

    try {
        let thread = null;

        if (req.user) {

            thread = await Thread.findOne({
                threadId,
                user: req.user._id
            });

        }

        if (!thread) {

            if (req.user) {

                thread = new Thread({

                    threadId,

                    title: message,

                    user: req.user._id,

                    messages: [
                        {
                            role: "user",
                            content: message
                        }
                    ]

                });

            }

        }
        else {
            thread.messages.push({ role: "user", content: message });
        }

        const assistantReply = await getGeminiResponse(message);

        if (thread) {
            thread.messages.push({ role: "assistant", content: assistantReply });

            thread.updatedAt = new Date();

            await thread.save();
        }


        res.json({ reply: assistantReply });
    } catch (err) {
        console.error("CHAT ERROR:");
        console.error(err);

        res.status(500).json({
            error: err.message,
        });
    }

});




export default router;