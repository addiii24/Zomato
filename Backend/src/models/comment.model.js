import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodmodel",
        required: true
    },
    text: {
        type: String,
        required: true,
        maxlength: 500
    }
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
