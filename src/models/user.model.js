import mongoose, { Schema } from "mongoose";

import bcrypt from "bcrypt"
import { jwt } from "jsonwebtoken";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  avatar: {
    type: String, // cloudinary url
    required: true,
  },
  coverImage: {
    type: String, // cloudinary url
  },
  watchHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video"
    }
  ],
  refreshToken: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.method.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.method.generateAccessToken = function () {
  return jwt.sign({
    _id: this._id,
  },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expireIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}
export const User = mongoose.model("User", userSchema)