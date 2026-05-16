import foodmodel from "../models/food.model.js";
import foodpartner from "../models/foodpartner.models.js";
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
        console.log(partner);
        console.log(partner.role);
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