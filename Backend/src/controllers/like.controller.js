import likes from "../models/likes.model.js";

export const toggleLike = async (req, res) => {
    try {
        const { foodId } = req.params;
        const userId = req.user._id;

        const existingLike = await likes.findOne({ user: userId, food: foodId });

        if (existingLike) {
            await likes.deleteOne({ _id: existingLike._id });
            const totalLikes = await likes.countDocuments({ food: foodId });
            return res.status(200).json({
                liked: false,
                totalLikes
            });
        } else {
            await likes.create({ user: userId, food: foodId });
            const totalLikes = await likes.countDocuments({ food: foodId });
            return res.status(200).json({
                liked: true,
                totalLikes
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const getLikeStatus = async (req, res) => {
    try {
        const { foodId } = req.params;
        const userId = req.user._id;

        const existingLike = await likes.findOne({ user: userId, food: foodId });
        const totalLikes = await likes.countDocuments({ food: foodId });

        res.status(200).json({
            liked: !!existingLike,
            totalLikes
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
