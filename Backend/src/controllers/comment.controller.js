import Comment from "../models/comment.model.js";

export const addComment = async (req, res) => {
    try {
        const { foodId } = req.params;
        const { text } = req.body;
        const userId = req.user._id;

        if (!text || text.trim().length === 0) {
            return res.status(400).json({ message: "Comment text is required" });
        }

        if (text.length > 500) {
            return res.status(400).json({ message: "Comment must be under 500 characters" });
        }

        const comment = await Comment.create({
            user: userId,
            food: foodId,
            text: text.trim()
        });

        // Return populated comment
        const populatedComment = await Comment.findById(comment._id)
            .populate("user", "fullname");

        const totalComments = await Comment.countDocuments({ food: foodId });

        res.status(201).json({
            comment: populatedComment,
            totalComments
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const getComments = async (req, res) => {
    try {
        const { foodId } = req.params;

        const comments = await Comment.find({ food: foodId })
            .populate("user", "fullname")
            .sort({ createdAt: -1 });

        const totalComments = await Comment.countDocuments({ food: foodId });

        res.status(200).json({
            comments,
            totalComments
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user._id;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Only the comment author can delete
        if (comment.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You can only delete your own comments" });
        }

        const foodId = comment.food;
        await Comment.deleteOne({ _id: commentId });

        const totalComments = await Comment.countDocuments({ food: foodId });

        res.status(200).json({
            message: "Comment deleted successfully",
            totalComments
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
