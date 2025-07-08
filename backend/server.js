import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';




const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//connecting to database
connectDB();

//api endpoints
app.use("/api/food",foodRouter);
app.use("/images",express.static("uploads"))

//middleware
app.get("/",(req,res)=>{
    res.send("Hey");
})
app.listen(port,()=>{
    console.log(`server is listening on http://localhost:${port}`);
})
