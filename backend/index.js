import app from "./src/app.js"
import { settingDotEnvPort } from "./src/config/config.js";


const { port } = settingDotEnvPort();

app.listen(port, console.log(`server en el puerto ${port}` ) )

