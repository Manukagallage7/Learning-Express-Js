import express from "express"
import "dotenv/config"
import dbconnect from "./src/db/config.mjs"
import rootRouter from "./src/routes/userRoutes.mjs"

const server = express();
const POST = process.env.PORT || 4001

server.use(express.json())

//Router Connect
server.use("/api/v1/", rootRouter);

dbconnect.then(()=> {
    console.log('Database connected successfully');
}).catch((err) => {
    console.log('Database connection failed', err);
})

server.listen(POST, () => {
    console.log(`Server is running on PORT ${POST}`);
})

