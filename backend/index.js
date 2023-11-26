import app from "./src/app.js"
import {connectDB} from "./src/db.js"


connectDB();
app.listen(27017)
console.log("server on port",27017)
