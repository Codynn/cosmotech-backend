const mongoose = require("mongoose");
const {
    BaseMongooseSchema,
    RequiredString,
} = require("../base.schema");

const blogSchema = new BaseMongooseSchema({
    title: RequiredString,
    content: mongoose.Schema.Types.Mixed,
    bannerImage: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogcategories",
    },
    featued: {
        type: Boolean,
        default: false,
    },
    tags: [String],

}, {
    timestamps: true,
});

const BlogModel = mongoose.model("blogs", blogSchema);
module.exports = BlogModel;
