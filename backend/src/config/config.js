export const TOKEN_SECRET = "some secret key";
import dotenv from "dotenv";

dotenv.config();


export const settingDotEnvPort = () => {
  return { port: process.env.PORT };
};

export const settingDotEnvDB = () => {
  return {
    db: {
      localhost: process.env.DB_LOCALHOST,
    },
  };
};

export const settingSecretToken = () => {
  return { secret: process.env.TOKEN_SECRET };
};
