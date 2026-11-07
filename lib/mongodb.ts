import mongoose from "mongoose";

const connectionString = process.env.DB_CONNECTION_URL as string

export const connectDB = async ()=>{
    try{
const res = await mongoose.connect(connectionString)
    }catch(err){
        console.log("DB connection failed");
        console.log(err);
        
    }
}