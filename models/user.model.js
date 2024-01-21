import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      select: false,
    },
    avatar: {
      type: String,
      default: "",
    },
    cover: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followering: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
      select: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("user", userSchema);

export const createUser = (values) =>
  new User(values).save().then((user) => user.toJSON());

export const getUserByEmail = (email) => User.findOne({ email });

export const getUserById = (id) => User.findById(id);

export const deleteUserById = (id) => User.findByIdAndDelete(id);
