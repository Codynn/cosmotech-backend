const mongoose = require("mongoose");
const {
    BaseMongooseSchema,
    RequiredString,
} = require("../base.schema");

const faqSchema = new BaseMongooseSchema({
    question: RequiredString,
    answer: RequiredString,
}, {
    timestamps: true,
});

const FaqModel = mongoose.model("faqs", faqSchema);
module.exports = FaqModel;
