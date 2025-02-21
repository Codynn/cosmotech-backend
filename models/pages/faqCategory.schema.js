const mongoose = require("mongoose");
const {
    BaseMongooseSchema,
    RequiredString,
} = require("../base.schema");

const faqCategorySchema = new BaseMongooseSchema({
    name: RequiredString,
}, {
    timestamps: true,
});

const FaqCategoryModel = mongoose.model("faqcategories", faqCategorySchema);
module.exports = FaqCategoryModel;
