import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String,
        trim:true

    },
    content:{
        required:true,
        type:String,
        trim:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    likes:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})

export default mongoose.model("Blog",blogSchema)