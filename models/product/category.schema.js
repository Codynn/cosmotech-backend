const mongoose = require("mongoose");
const {
    BaseMongooseSchema,
    RequiredString,
} = require("../base.schema");

const categorySchema = new BaseMongooseSchema({
    name: RequiredString,
    description: String,
    image: String,
    productsCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

const CategoryModel = mongoose.model("categories", categorySchema);
module.exports = CategoryModel;
