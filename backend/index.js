import app from "./src/app.js"
import { settingDotEnvPort } from "./src/config/config.js";
import {connectDB} from '../backend/database/db.js'
connectDB();
const { port } = settingDotEnvPort();

app.listen(port, console.log(`server en el puerto ${port}` ) )

