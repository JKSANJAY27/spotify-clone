import express from "express"
import cors from "cors"
import 'dotenv/config'
import songRouter from "./src/routes/songRoute.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.use("/api/song", songRouter)

app.get('/',(req,res)=> res.send("API Sucessful"))

app.listen(port,()=> console.log(`Server started on ${port}`))