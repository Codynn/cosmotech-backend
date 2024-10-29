const { StatusCodes } = require("http-status-codes");
const models = require("../../models/index.model");

const createUpdateAboutPageContent = async (req, res) => {
    const aboutPageContent = await models.aboutPageModel.findOne({});
    if (!aboutPageContent) {
        const newAboutPageContent = await new models.aboutPageModel(req.body).save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "About Page Content created successfully",
            data: newAboutPageContent,
        });
    }
    const updatedAboutPageContent = await models.aboutPageModel.findByIdAndUpdate(aboutPageContent._id, req.body, { new: true });
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "About Page Content updated successfully",
        data: updatedAboutPageContent,
    });
}

const getAboutPageContents = async (req, res) => {
    const aboutPageContents = await models.aboutPageModel.findOne({});
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "About Page Contents fetched successfully",
        data: aboutPageContents,
    });
}

module.exports = {
    createUpdateAboutPageContent,
    getAboutPageContents,
};