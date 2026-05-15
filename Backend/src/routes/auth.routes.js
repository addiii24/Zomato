import express from "express";
import { register, login, logout, registerfoodpartner, loginfoodpartner, logoutfoodpartner } from "../controllers/auth.controller.js";


const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello World!");
});

// User API
router.post("/user/register", register);
router.post("/user/login", login);
router.post("/user/logout", logout);

// Food partner API
router.post("/foodpartner/register", registerfoodpartner);
router.post("/foodpartner/login", loginfoodpartner);
router.post("/foodpartner/logout", logoutfoodpartner);

export default router;