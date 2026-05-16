import express from "express";
import { addfood, getfood } from "../controllers/food.controller.js";
import { authfoodpartnermiddleware, authusermiddleaware } from "../middlewares/auth.middlewares.js";
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

foodrouter.get(
    "/",
    authusermiddleaware,
    getfood,
)

export default foodrouter;