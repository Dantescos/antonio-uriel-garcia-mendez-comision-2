import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    trim: true,
    unique: true,
    type: String,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  avatarURL: {
    type: String,
    required: true,
  }
}, {
    timestamps: true,
    versionKey: false,
})

export default mongoose.model('User', userSchema)