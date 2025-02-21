const { StatusCodes } = require("http-status-codes");
const models = require("../models/index.model");

const getContentCount = async (req, res) => {
    const blogs = await models.blogModel.countDocuments();
    const faqs = await models.faqModel.countDocuments();
    const products = await models.productModel.countDocuments();
    const reviews = await models.reviewModel.countDocuments();

    return res.status(StatusCodes.OK).json({
        blogs,
        faqs,
        products,
        reviews,
    });
};

const getProductsDistribution = async (req, res) => {
    const products = await models.productModel.find({}).populate("category");

    let byCategory = {};
    products.forEach((product) => {
        if (!byCategory[product?.category?.name || "Uncategorized"]) {
            byCategory[product?.category?.name || "Uncategorized"] = 0;
        }
        byCategory[product?.category?.name || "Uncategorized"]++;
    });

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Products by category",
        data: byCategory,
    });

}

const getBlogsDistribution = async (req, res) => {
    const blogs = await models.blogModel.find({}).populate("category");

    let byCategory = {};
    blogs.forEach((blog) => {
        if (!byCategory[blog?.category?.name || "Uncategorized"]) {
            byCategory[blog?.category?.name || "Uncategorized"] = 0;
        }
        byCategory[blog?.category?.name || "Uncategorized"]++;
    });

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Blogs by category",
        data: byCategory,
    });

}


module.exports = {
    getContentCount,
    getProductsDistribution,
    getBlogsDistribution,
};
