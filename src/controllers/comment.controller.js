import mongoose from "mongoose";
import Comment from '../models/comment.model'
import Blog from '../models/blog.model'

export const createComment = async (req,res)=>{
    try {
        const {text}=req.body
        const blogId = req.params.blogId;

        const blog = await Blog.findbyid(blogId)
        if(!blog){
            return res.status(404).json({message:"blog not found"})
        }
        const user = await req.user.id

        const newComment = await Comment.create({
            text,
            user:req.user.id,
            blog:blogId
        })

            res.status(201).json({
      message: "Comment added successfully",
      comment,
    });

        console.error(error);
    res.status(500).json({ message: error.message });

        
    } catch (error) {
        
    }
}