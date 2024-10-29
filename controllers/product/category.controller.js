const { StatusCodes } = require("http-status-codes");
const models = require("../../models/index.model");

const createCategory = async (req, res, next) => {
    const newCategory = await new models.categoryModel(req.body).save();
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Category created successfully",
        data: newCategory,
    });
}

const getCategories = async (req, res, next) => {
    const categories = await models.categoryModel.find({});
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Categories fetched successfully",
        data: categories,
    });
}

const updateCategory = async (req, res, next) => {
    const category = await models.categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "Category not found",
        });
    }
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Category updated successfully",
        data: category,
    });
}

const deleteCategory = async (req, res, next) => {
    const category = await models.categoryModel.findByIdAndDelete(req.params.id);
    if (!category) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "Category not found",
        });
    }
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Category deleted successfully",
        data: category,
    });
}

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
};