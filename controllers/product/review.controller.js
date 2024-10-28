const { StatusCodes } = require("http-status-codes");
const models = require("../../models/index.model");

const createReview = async (req, res) => {
    const newReview = new models.reviewModel(req.body).save();
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Review created successfully",
        data: newReview,
    });
}

const getReviews = async (req, res) => {
    const reviews = await models.reviewModel.find();
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Reviews fetched successfully",
        data: reviews,
    });
}

const updateReview = async (req, res) => {
    const review = await models.reviewModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "Review not found",
        });
    }
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Review updated successfully",
        data: review,
    });
}

const deleteReview = async (req, res) => {
    const review = await models.reviewModel.findByIdAndDelete(req.params.id);
    if (!review) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "Review not found",
        });
    }
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Review deleted successfully",
    });
}

module.exports = {
    createReview,
    getReviews,
    updateReview,
    deleteReview,
};