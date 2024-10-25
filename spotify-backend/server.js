import express from "express"
import cors from "cors"
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=> res.send("API Sucessful"))

app.listen(port,()=> console.log(`Server started on ${port}`))