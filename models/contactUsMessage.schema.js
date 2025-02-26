const mongoose = require("mongoose");
const {
    BaseMongooseSchema,
    RequiredString,
    RequiredNumber
} = require("./base.schema");

const contactUsMessageSchema = new BaseMongooseSchema({
    firstName: RequiredString,
    lastName: RequiredString,
    email: RequiredString,
    phone: RequiredNumber,
    topic: RequiredString,
    bestDescribe: RequiredString,
    message: RequiredString,
}, {
    timestamps: true,
});

const ContactMessageUsModel = mongoose.model("contactUsMessages", contactUsMessageSchema);
module.exports = ContactMessageUsModel;
