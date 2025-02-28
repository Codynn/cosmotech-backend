const { StatusCodes } = require("http-status-codes");
const models = require("../../models/index.model");

const createReview = async (req, res) => {
    const newReview = await new models.reviewModel({
        ...req.body,
        product: req.params.id,
    }).save();
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Review created successfully",
        data: newReview,
    });
}

const getProductReviews = async (req, res) => {
    let { page, limit } = req.query;
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

    page = Number(page) || 1;
    limit = Number(limit) || 10;

    const totalReviews = await models.reviewModel.countDocuments(filter);

    const reviews = await models.reviewModel.find(filter)
        .sort({ rating: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Reviews fetched successfully",
        data: reviews,
        page,
        limit,
        totalPages: Math.ceil(totalReviews / limit),
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

const getHomepageReviews = async (req, res) => {
    const reviews = await models.reviewModel.find()
        .populate("product")
        .sort({ rating: -1 })
        .limit(9);
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Reviews fetched successfully",
        data: reviews,
    });

}

module.exports = {
    createReview,
    getProductReviews,
    deleteReview,
    getHomepageReviews,
};