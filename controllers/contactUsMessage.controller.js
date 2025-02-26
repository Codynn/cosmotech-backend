const { StatusCodes } = require("http-status-codes");
const models = require("../models/index.model");

const createContactUsMessage = async (req, res, next) => {
    const newContactUsMessage = await new models.contactUsMessageModel(req.body).save();
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "ContactUsMessage created successfully",
        data: newContactUsMessage,
    });
}

const getContactUsMessages = async (req, res, next) => {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    let filter = {};
    if (req.query.user) {
        filter.$or = [
            { firstName: { $regex: req.query.user, $options: "i" } },
            { lastName: { $regex: req.query.user, $options : "i" } },
            { email: { $regex: req.query.user, $options : "i" } },
            { message: { $regex: req.query.user, $options : "i" } },
        ];
    }
    if (req.query.topic) {
        filter.topic = { $regex: req.query.topic, $options: "i" };
    }
    if (req.query.bestDescribe) {
        filter.bestDescribe = { $regex: req.query.bestDescribe, $options: "i" };
    }

    const totalContactUsMessages = await models.contactUsMessageModel.countDocuments(filter);
    const totalPages = Math.ceil(totalContactUsMessages / limit);
    const offset = limit * (page - 1);
    

    const contactUsMessages = await models.contactUsMessageModel.find(filter).skip(offset).limit(limit);

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "ContactUsMessages fetched successfully",
        data: contactUsMessages,
        totalPages,
        page,
        limit,
    });
}

const deleteContactUsMessage = async (req, res, next) => {
    const contactUsMessage = await models.contactUsMessageModel.findByIdAndDelete(req.params.id);
    if (!contactUsMessage) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "ContactUsMessage not found",
        });
    }
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "ContactUsMessage deleted successfully",
        data: contactUsMessage,
    });
}

module.exports = {
    createContactUsMessage,
    getContactUsMessages,
    deleteContactUsMessage,
};