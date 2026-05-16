import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import foodpartner from "../models/foodpartner.models.js";

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

        res.cookie("token", token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        })
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
        const isPasswordCorrect = bcrypt.compare(password, user.password);
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
        res.cookie("token", token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        })
        await user.save();
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            message: "User logged in successfully"
        });
    } catch (error) {
        
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            maxAge: 0,
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        })
        res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const registerfoodpartner = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const userExists = await foodpartner.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Foodpartner already exists" });
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = new foodpartner({ fullname, email, password: hashedpassword, role: "foodpartner" });
        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );
        res.cookie("token", token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        })
        await user.save();
        res.status(201).json({
            _id: user._id,
            fullname: user.fullname,
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
        const isPasswordCorrect = bcrypt.compare(password, user.password);
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
        res.cookie("token", token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        })
        await user.save();
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            message: "User logged in successfully"
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const logoutfoodpartner = async (req, res) => {
    try {
        res.cookie("token", "", {
            maxAge: 0,
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        })
        res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
