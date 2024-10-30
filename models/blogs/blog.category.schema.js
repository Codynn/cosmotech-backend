const mongoose = require("mongoose");
const {
    BaseMongooseSchema,
    RequiredString,
} = require("../base.schema");

const blogCategorySchema = new BaseMongooseSchema({
    name: RequiredString,
}, {
    timestamps: true,
});

const BlogCategoryModel = mongoose.model("blogcategories", blogCategorySchema);
module.exports = BlogCategoryModel;
