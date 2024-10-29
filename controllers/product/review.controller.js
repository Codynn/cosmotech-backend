const { StatusCodes } = require("http-status-codes");
const models = require("../../models/index.model");

const createReview = async (req, res) => {
    const newReview = await new models.reviewModel({
        ...req.body,
        product: req.params.id,
        user: req.user._id,
    }).save();
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Review created successfully",
        data: newReview,
    });
}

const getProductReviews = async (req, res) => {
    let filter = {
        product: req.params.id,
    };
    if (req.query.rating) {
        filter.rating = Number(req.query.rating);
    }
    if (req.query.startDate && req.query.endDate) {
        filter.createdAt = {
            $gte: new Date(req.query.startDate),
            $lte: new Date(req.query.endDate),
        };
    } else if (req.query.startDate) {
        filter.createdAt = {
            $gte: new Date(req.query.startDate),
        };
    } else if (req.query.endDate) {
        filter.createdAt = {
            $lte: new Date(req.query.endDate),
        };
    }
    const reviews = await models.reviewModel.find(filter);
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Reviews fetched successfully",
        data: reviews,
    });
}

const getMyReviews = async (req, res) => {
    let filter = {
        user: req.user._id,
    };

    if (req.query.rating) {
        filter.rating = Number(req.query.rating);
    }

    if (req.query.startDate && req.query.endDate) {
        filter.createdAt = {
            $gte: new Date(req.query.startDate),
            $lte: new Date(req.query.endDate),
        };
    } else if (req.query.startDate) {
        filter.createdAt = {
            $gte: new Date(req.query.startDate),
        };
    } else if (req.query.endDate) {
        filter.createdAt = {
            $lte: new Date(req.query.endDate),
        };
    }

    const reviews = await models.reviewModel.find(filter);
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Reviews fetched successfully",
        data: reviews,
    });
}

const updateReview = async (req, res) => {
    const review = await models.reviewModel.fineOneAndUpdate({
        _id: req.params.id,
        user: req.user._id,
    }, req.body, { new: true });
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
    getMyReviews,
    getProductReviews,
    updateReview,
    deleteReview,
};