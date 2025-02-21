const { StatusCodes } = require("http-status-codes");
const models = require("../../models/index.model");

const createFaq = async (req, res) => {
    const newFaq = await new models.faqModel(req.body).save();
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Faq created successfully",
        data: newFaq,
    });
}

const getFaqs = async (req, res) => {
    const faqs = await models.faqModel.find({}).populate("category");
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Faqs fetched successfully",
        data: faqs,
    });
}

const updateFaq = async (req, res) => {
    const faq = await models.faqModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!faq) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "Faq not found",
        });
    }
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Faq updated successfully",
        data: faq,
    });
}

const deleteFaq = async (req, res) => {
    const faq = await models.faqModel.findByIdAndDelete(req.params.id);
    if (!faq) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "Faq not found",
        });
    }
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Faq deleted successfully",
    });
}

module.exports = {
    createFaq,
    getFaqs,
    updateFaq,
    deleteFaq,
};