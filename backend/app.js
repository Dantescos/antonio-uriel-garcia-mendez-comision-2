import express from "express";


const app = express();
app.use(express.json()); 
app.listen(port,() => {
    console.log(`server listening http://localhost:${port}/foro`)

})

export default app;