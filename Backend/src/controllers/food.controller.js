import food from "../models/food.model.js";
import foodpartner from "../models/foodpartner.models.js";

export const addfood = async (req, res) => {
   try {
    const {name, video, description} = req.body;
    if(!name || !video || !description){
        return res.status(400).json({ message: "All fields are required" });
    }
    const fooditem = new food({name, video, description, foodpartner: req.foodpartner._id});
    await fooditem.save();
    res.status(201).json({ message: "Food added successfully", fooditem });
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
};