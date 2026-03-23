import Blog from "../models/blog.model.js";

export const createBlog = async (req,res)=>{
    try {
        const {title,content }= req.body 

        //validate
        if(!title || !content){
            return res.status(400).json({message:"all field are required"})
        }
        //req user
        const userId = req.user.id;

        //create blog
        const blog = await Blog.create({
            title,
            content,
            author:userId
        })

        res.status(201).json({
            message:"blog created sucessfuly"
        })

        
    } catch (error) {
        return res.status(500).json({message:"Server Error"})
        
    }
}