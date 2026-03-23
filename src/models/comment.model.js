import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text:{
        required:true,
        type:String,
        minlength:3,
        trim:true
    },
    user:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
        required:true
    }

},{timestamps:true})

export default mongoose.model("Comment",commentSchema)