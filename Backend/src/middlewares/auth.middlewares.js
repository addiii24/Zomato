import foodmodel from "../models/food.model.js";
import foodpartner from "../models/foodpartner.models.js";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";

export const authfoodpartnermiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized access"
            });
        }

        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const partner = await foodpartner.findById(
            decodedToken._id
        );
        if (!partner) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (partner.role !== "foodpartner") {
            return res.status(403).json({
                message: "You are not authorized"
            });
        }

        req.foodpartner = partner;

        next();

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const authusermiddleaware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized access"
            });
        }

        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(
            decodedToken._id
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found. You might be logged in as a food partner instead of a regular user."
            });
        }

        console.log(user);
        console.log(user.role);

        if (user.role !== "user") {
            return res.status(403).json({
                message: "You are not authorized"
            });
        }

        req.user = user;

        next();

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}