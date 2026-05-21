import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
        required: true
    }
});

const likes = mongoose.model("likes", likeSchema);

export default likes;
