import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import foodpartner from "../models/foodpartner.models.js";

const getCookieOptions = (req, maxAge) => {
    const isProduction = process.env.NODE_ENV === "production" || req.headers["x-forwarded-proto"] === "https";
    return {
        maxAge: maxAge,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax"
    };
};

export const register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        } 

        const hashedpassword = await bcrypt.hash(password, 10);

        const user = new User({ fullname, email, password: hashedpassword, role : "user"  });
        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.cookie("token", token, getCookieOptions(req, 60 * 60 * 1000));
        await user.save();
        res.status(201).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            role : user.role,
            message: "User registered successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid email or password"});
        }
        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );
        res.cookie("token", token, getCookieOptions(req, 60 * 60 * 1000));
        await user.save();
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            message: "User logged in successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", getCookieOptions(req, 0));
        res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const registerfoodpartner = async (req, res) => {
    try {
        const { buissnessname, email, password, contactnumber, address, ownername } = req.body;
        if (!buissnessname || !email || !password || !contactnumber || !address || !ownername) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const userExists = await foodpartner.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Foodpartner already exists" });
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = new foodpartner({ buissnessname, email, password: hashedpassword, contactnumber, address, ownername, role: "foodpartner" });
        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );
        res.cookie("token", token, getCookieOptions(req, 60 * 60 * 1000));
        await user.save();
        res.status(201).json({
            _id: user._id,
            buissnessname: user.buissnessname,
            ownername: user.ownername,
            contactnumber: user.contactnumber,
            address: user.address,
            email: user.email,
            role : user.role,
            message: "Foodpartner registered successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginfoodpartner = async (req, res) => { 
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const user = await foodpartner.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid email or password"});
        }
        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );
        res.cookie("token", token, getCookieOptions(req, 60 * 60 * 1000));
        await user.save();
        res.status(200).json({
            _id: user._id,
            buissnessname: user.buissnessname,
            ownername: user.ownername,
            email: user.email,
            message: "User logged in successfully"
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const logoutfoodpartner = async (req, res) => {
    try {
        res.cookie("token", "", getCookieOptions(req, 0));
        res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
