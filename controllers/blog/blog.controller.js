const { StatusCodes } = require("http-status-codes");
const models = require("../../models/index.model");

const createBlog = async (req, res, next) => {
    const newBlog = await new models.blogModel(req.body).save();
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Blog created successfully",
        data: newBlog,
    });
}

const getBlogs = async (req, res, next) => {

    if (req.params.id) {
        const blog = await models.blogModel.findById(req.params.id).populate("category");
        if (!blog) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Blog not found",
            });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Blog fetched successfully",
            data: blog,
        });
    }

    let filter = {};
    if (req.query.category) {
        filter.category = req.query.category;
    }

    if (req.query.featured) {
        filter.featured = req.query.featured;
    }

    if (req.query.tags) {
        filter.tags = { $in: req.query.tags.split(",") };
    }

    if (req.query.search) {
        filter.title = { $regex: req.query.search, $options: "i" };
    }
    

    const blogs = await models.blogModel.find(filter).populate("category");
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Blogs fetched successfully",
        data: blogs,
    });
}

const updateBlog = async (req, res, next) => {
    const blog = await models.blogModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "Blog not found",
        });
    }
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Blog updated successfully",
        data: blog,
    });
}

const deleteBlog = async (req, res, next) => {
    const blog = await models.blogModel.findByIdAndDelete(req.params.id);
    if (!blog) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "Blog not found",
        });
    }
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Blog deleted successfully",
        data: blog,
    });
}

module.exports = {
    createBlog,
    getBlogs,
    updateBlog,
    deleteBlog,
};