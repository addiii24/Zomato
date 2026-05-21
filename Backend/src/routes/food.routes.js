import express from "express";
import { addfood, getfood, getpartnerfood, getpartnerfoodbyid } from "../controllers/food.controller.js";
import { authfoodpartnermiddleware, authusermiddleaware, authanyusermiddleware } from "../middlewares/auth.middlewares.js";
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

// it is for user to show their videos 
foodrouter.get(
    "/partner",
    authfoodpartnermiddleware,
    getpartnerfood
);

// get a specific food partner's profile and foods
foodrouter.get(
    "/partner/:id",
    authanyusermiddleware,
    getpartnerfoodbyid
);

export default foodrouter;