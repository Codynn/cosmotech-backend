const { StatusCodes } = require("http-status-codes");
const models = require("../../models/index.model");

const createBlogCategory = async (req, res, next) => {
    const newBlogCategory = await new models.blogCategoryModel(req.body).save();
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Blog category created successfully",
        data: newBlogCategory,
    });
}

const getBlogCategories = async (req, res, next) => {
    const blogCategories = await models.blogCategoryModel.find({});
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Blog Categories fetched successfully",
        data: blogCategories,
    });
}

const updateBlogCategory = async (req, res, next) => {
    const blogCategory = await models.blogCategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blogCategory) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "Blog category not found",
        });
    }
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Blog category updated successfully",
        data: blogCategory,
    });
}

const deleteBlogCategory = async (req, res, next) => {
    const blogCategory = await models.blogCategoryModel.findByIdAndDelete(req.params.id);
    if (!blogCategory) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "Blog category not found",
        });
    }
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Blog category deleted successfully",
        data: blogCategory,
    });
}

module.exports = {
    createBlogCategory,
    getBlogCategories,
    updateBlogCategory,
    deleteBlogCategory,
};