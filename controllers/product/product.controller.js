const { StatusCodes } = require("http-status-codes");
const models = require("../../models/index.model");

const createProduct = async (req, res) => {
    const newProduct = await new models.productModel(req.body).save();
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Product created successfully",
        data: newProduct,
    });
}

const getProducts = async (req, res) => {
    let filter = {};
    if (req.query.category) {
        filter.category = req.query.category;
    }
    if (req.query.q) {
        filter.name = { $regex: req.query.q, $options: "i" };
    }
    const products = await models.productModel.find(filter).populate("category");
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Products fetched successfully",
        data: products,
    });
}

const updateProduct = async (req, res) => {
    const product = await models.productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "Product not found",
        });
    }
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Product updated successfully",
        data: product,
    });
}

const deleteProduct = async (req, res) => {
    const product = await models.productModel.findByIdAndDelete(req.params.id);
    if (!product) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "Product not found",
        });
    }
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Product deleted successfully",
        data: product,
    });
}

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
};