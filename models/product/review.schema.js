const mongoose = require("mongoose");
const {
    BaseMongooseSchema,
    RequiredString,
} = require("../base.schema");

const reviewSchema = new BaseMongooseSchema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: RequiredString,
}, {
    timestamps: true,
});

const ReviewModel = mongoose.model("reviews", reviewSchema);
module.exports = ReviewModel;
