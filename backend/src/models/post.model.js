import {Schema , model } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    autor: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    comments: {
      type: String,
      required: false,
    },
    imageURL: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model ("Post", postSchema);
