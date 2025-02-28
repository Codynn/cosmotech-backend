const mongoose = require("mongoose");
const {
    BaseMongooseSchema,
    RequiredString,
    RequiredNumber
} = require("../base.schema");

const productSchema = new BaseMongooseSchema({
    name: RequiredString,
    description: RequiredString,
    salePrice: RequiredNumber,
    bannerImage: RequiredString,
    galleryImages: [RequiredString],
    purchaseCount: {
        type: Number,
        default: 0,
    },
    commentCount: {
        type: Number,
        default: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: true,
    },
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    availableSizes: [String],
    details: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
        required: true,
    }
}, {
    timestamps: true,
});

const ProductModel = mongoose.model("products", productSchema);
module.exports = ProductModel;
