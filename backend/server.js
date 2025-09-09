import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


//connecting to database
connectDB();

//api endpoints
app.use("/api/food",foodRouter);
app.use("/images",express.static("uploads"));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

//middleware
app.get("/",(req,res)=>{
    res.send("Hey");
})
app.listen(port,()=>{
    console.log(`server is listening on http://localhost:${port}`);
})
