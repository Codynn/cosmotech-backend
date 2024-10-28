const { StatusCodes } = require("http-status-codes");
const models = require("../../models/index.model");

const createAboutPageContent = async (req, res) => {
    const newAboutPageContent = new models.aboutPageModel(req.body).save();
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "About Page Content initiated successfully",
        data: newAboutPageContent,
    });
}

const getAboutPageContents = async (req, res) => {
    const aboutPageContents = await models.aboutPageModel.find();
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "About Page Contents fetched successfully",
        data: aboutPageContents,
    });
}

const updateAboutPageContent = async (req, res) => {
    const aboutPageContent = await models.aboutPageModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!aboutPageContent) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "AboutPageContent not found",
        });
    }
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "AboutPageContent updated successfully",
        data: aboutPageContent,
    });
}

const deleteAboutPageContent = async (req, res) => {
    const aboutPageContent = await models.aboutPageModel.findByIdAndDelete(req.params.id);
    if (!aboutPageContent) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "AboutPageContent not found",
        });
    }
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "AboutPageContent deleted successfully",
    });
}

module.exports = {
    createAboutPageContent,
    getAboutPageContents,
    updateAboutPageContent,
    deleteAboutPageContent,
};