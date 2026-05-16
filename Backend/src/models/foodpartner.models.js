import mongoose from "mongoose";

const foodpartnerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["foodpartner"],
        default: "foodpartner"
    }
}, { timestamps: true });

const foodpartner = mongoose.model("foodpartner", foodpartnerSchema);

export default foodpartner;