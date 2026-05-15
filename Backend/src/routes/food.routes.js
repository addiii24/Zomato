import express from "express";
import { addfood } from "../controllers/food.controller.js";

const foodrouter = express.Router();

foodrouter.post("/addfood", addfood);

export default foodrouter;  