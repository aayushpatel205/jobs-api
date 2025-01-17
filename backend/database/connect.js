import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const username = process.env.DB_USERNAME;
const pwd = process.env.DB_PASSWORD;

const connectDatabase = async()=>{
    const URL = `mongodb+srv://${username}:${pwd}@jobs-api.k2a8s.mongodb.net/?retryWrites=true&w=majority&appName=jobs-api`
    try{
        await mongoose.connect(URL);
        console.log("Database connected");
    }catch(err){
        console.log(err);
    }
};

export default connectDatabase;