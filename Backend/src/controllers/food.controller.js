import food from "../models/food.model.js";

export const addfood = async (req, res) => {
    try {
        const { name,video, description, foodpartner } = req.body;
        if (!name || !video || !description || !foodpartner) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const food = new food({ name,video, description, foodpartner });
        await food.save();
        res.status(201).json({ message: "Food added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};