import mongoose from "mongoose";
import { settingDotEnvDB } from "../src/config/config.js";

const {db} = settingDotEnvDB()

export const connectDB = async () => {
  try {
    await mongoose.connect(db.localhost);
    console.log(">>> DB is connected");
  } catch (error) {
    console.log(error);
  }
};
