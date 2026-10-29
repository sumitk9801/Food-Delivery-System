import mongoose from 'mongoose';

export const connectDB = async () => {
    const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/food-delivery";
    await mongoose.connect(uri)
    .then(()=>{ 
        console.log("Connected to DB successfully");
    })
    .catch((error)=>{
        console.error("DB connection error:", error);
    });
}