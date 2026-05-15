import express from "express";
import { addfood } from "../controllers/food.controller.js";
import { authfoodpartnermiddleware } from "../middlewares/auth.middlewares.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../Uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

const foodrouter = express.Router();

foodrouter.post("/", upload.single("video"), authfoodpartnermiddleware, addfood);

export default foodrouter;  