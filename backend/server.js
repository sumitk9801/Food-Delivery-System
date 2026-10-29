
import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 3000;

const Client = process.env.CLIENT_URL;
const Admin = process.env.ADMIN_URL;
app.use(cors({
    origin: [Client, Admin],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
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
