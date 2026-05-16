import express from "express";
import { addfood } from "../controllers/food.controller.js";
import { authfoodpartnermiddleware } from "../middlewares/auth.middlewares.js";
import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
});

const foodrouter = express.Router();

foodrouter.post(
    "/",
    authfoodpartnermiddleware,
    upload.single("video"),
    addfood
);

export default foodrouter;