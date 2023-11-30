export const TOKEN_SECRET = "some secret key";
import dotenv from "dotenv";

dotenv.config();

//devuelve el puerto en una guardado en una vairable
export const settingDotEnvPort = () => {
  return { port: process.env.PORT };
};
//guarda la base de datos
export const settingDotEnvDB = () => {
  return {
    db: {
      localhost: process.env.DB_LOCALHOST,
    },
  };
};
//Token de seguridad
export const settingSecretToken = () => {
  return { secret: process.env.TOKEN_SECRET };
};
