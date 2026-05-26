import express from "express";
import { toggleLike, getLikeStatus } from "../controllers/like.controller.js";
import { authusermiddleaware } from "../middlewares/auth.middlewares.js";

const likeRouter = express.Router();

// Toggle like on a food reel
likeRouter.post("/:foodId/toggle", authusermiddleaware, toggleLike);

// Get like status for a food reel
likeRouter.get("/:foodId/status", authusermiddleaware, getLikeStatus);

export default likeRouter;
