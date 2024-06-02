import mongoose, { Schema } from "mongoose";
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const videoSchema = new Schema({
  videoFile: {
    type: String, // cloudinary url 
    require: true,
  },
  thumbnail: {
    type: String, // cloudinary url 
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  isPublised: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true })

videoSchema.plugin(aggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)