const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    token: {
      type: String,
      default: null,
    },
    userInfo: {
      type: Object,
      default: null,
    },
    userDailyCalorieIntake: {
      type: Number,
      default: "",
    },
    userNotRecommendedProducts: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiRegisterSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  name: Joi.string().required(),
});

const joiRegisterSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  name: Joi.string().required(),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiUserInfoSchema,
  joiRegisterSchema,
  joiLoginSchema,
};
