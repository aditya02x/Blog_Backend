import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo db connect Sucessfuly")
    } catch (error) {
        console.error(`error: ${error.message}`);
        
        
    }
}

export default connectDB;