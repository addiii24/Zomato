import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
   name : {
    type : String,
    required : true
   },
   video : {
    type : String,
    required : true
   },
   description : {
    type : String
   },
   foodpartner : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "foodpartner",
    required : true
   },
}, { timestamps: true });

const food = mongoose.model("food", foodSchema);

export default food;

