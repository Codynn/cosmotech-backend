const mongoose = require("mongoose");
const { BaseMongooseSchema, RequiredString } = require("./base.schema");
const { ROLES } = require("../constants/role.constants");

const userSchema = new BaseMongooseSchema({
  firstName: RequiredString,
  lastName: RequiredString,
  phoneNumber: RequiredString,
  email: {
    ...RequiredString,
    unique: true,
  },
  role: {
    ...RequiredString,
    enum: Object.values(ROLES),
    default: ROLES.USER,
  },
  password: RequiredString,
  photo: String,
  OTP: String,
  otpExpiryDate: Date,
  firebaseDeviceToken: String,
});

async function removeSensitiveFields(ret) {
  delete ret.OTP;
  delete ret.otpExpiryDate;
  delete ret.password;
  delete ret.firebaseDeviceToken;
}

userSchema.pre("find", function (next) {
  removeSensitiveFields(this);
  next();
});

userSchema.pre("findOne", function (next) {
  removeSensitiveFields(this);
  next();
});

userSchema.pre("findById", function (next) {
  removeSensitiveFields(this);
  next();
});

userSchema.options.toJSON = {
  transform: function (doc, ret) {
    removeSensitiveFields(doc);
  },
};

userSchema.options.toObject = {
  transform: function (doc, ret) {
    removeSensitiveFields(doc);
  },
};

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
