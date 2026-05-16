import food from "../models/food.model.js";
import { v4 as uuid } from "uuid";
import { uploadOnImageKit } from "../services/storage.services.js";

export const addfood = async (req, res) => {
   try {

      const { name, description } = req.body;

      // validation
      if (!name || !description) {
         return res.status(400).json({
            message: "All fields are required"
         });
      }

      // check video file
      if (!req.file) {
         return res.status(400).json({
            message: "Video file is required"
         });
      }

      // upload video to ImageKit
      const fileuploadresult = await uploadOnImageKit(
         req.file.buffer,
         uuid() + "-" + req.file.originalname
      );

      // upload failed
      if (!fileuploadresult) {
         return res.status(400).json({
            message: "Failed to upload file"
         });
      }

      // save in mongodb
      const fooditem = await food.create({
         name,
         description,

         // imagekit video url
         video: fileuploadresult.url,

         // logged in foodpartner id
         foodpartner: req.foodpartner._id
      });

      // success response
      res.status(201).json({
         message: "Food added successfully",
         fooditem
      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: error.message
      });
   }
};

export const getfood = async (req, res) => {
   try {

      const foods = await food.find({});

      res.status(201).json({
         message: "Foods fetched successfully",
         foods
      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: error.message
      });
   }
}