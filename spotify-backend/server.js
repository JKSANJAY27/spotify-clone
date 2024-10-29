import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import songRouter from "./src/routes/songRoute.js";
import albumRouter from "./src/routes/albumRoute.js";
import authRouter from "./src/routes/authRoute.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));

app.use("/api/auth", authRouter);
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);

app.get('/',(req,res)=> res.send("API Successful"));

app.listen(port,()=> console.log(`Server started on ${port}`));