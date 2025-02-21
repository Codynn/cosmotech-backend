const { StatusCodes } = require("http-status-codes");
const models = require("../../models/index.model");

const createFaqCategory = async (req, res) => {
    const newFaqCategory = await new models.faqCategoryModel(req.body).save();
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "FaqCategory created successfully",
        data: newFaqCategory,
    });
}

const getFaqCategories = async (req, res) => {
    const faqCategories = await models.faqCategoryModel.find({});
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "FaqCategories fetched successfully",
        data: faqCategories,
    });
}

const updateFaqCategory = async (req, res) => {
    const faqCategory = await models.faqCategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!faqCategory) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "FaqCategory not found",
        });
    }
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "FaqCategory updated successfully",
        data: faqCategory,
    });
}

const deleteFaqCategory = async (req, res) => {
    const faqCategory = await models.faqCategoryModel.findByIdAndDelete(req.params.id);
    if (!faqCategory) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "FaqCategory not found",
        });
    }
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "FaqCategory deleted successfully",
    });
}

module.exports = {
    createFaqCategory,
    getFaqCategories,
    updateFaqCategory,
    deleteFaqCategory,
};