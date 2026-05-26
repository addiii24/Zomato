import express from "express";
import { addComment, getComments, deleteComment } from "../controllers/comment.controller.js";
import { authusermiddleaware } from "../middlewares/auth.middlewares.js";

const commentRouter = express.Router();

// Add a comment to a food reel
commentRouter.post("/:foodId", authusermiddleaware, addComment);

// Get all comments for a food reel
commentRouter.get("/:foodId", authusermiddleaware, getComments);

// Delete a comment (author only)
commentRouter.delete("/:commentId", authusermiddleaware, deleteComment);

export default commentRouter;
