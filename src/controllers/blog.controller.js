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

export const getBlogs = async (req,res)=>{
    try {
        //pagenation
        const page = parserInt(req.query.page) || 1;
        const limit = parserInt(req.query.limit) ||5;

        const skip = (page -1)*limit

        const blogs = await Blog.find()
        .populate("author","name eamil")
        .skip(skip)
        .limit(limit)
        .sort({createdAtt:-1});

        res.status(200).json({
            page,
            totla:blogs.length,
            blogs,
        })
        
    } catch (error) {
        
        res.status(500).json({message:error.message})
    }
}

export const getBlogById = async (req,res)=>{
    try {
        const id = req.params.id;
        const blog = await Blog.findById(id).populate("author","name email")
        if(!blog){
            return res.status(404).json({message:"Blog not found"})
        }

        res.status(200).json(blog);

    } catch (error) {
        console.error(err)
        res.status(500).json({message:error.message})
        
    }
}

export const updateBlog = async ()=>{
    try {
        const id = req.params.id
        const blog = await Blog.findById(id)

        if(!blog){
            return res.status(404).json({message:"No post found"})
        }

        if(blog.author.toString() !== req.user.id){
            return res.status(403).json({message :"Not authorized"})
        }

        blog.title = title || blog.title;
        blog.content = content || blog.content;

        await blog.save()

        res.status(201).json({message:"BLOG HAS BEEN UPDATED SUCESSFULLY"})
        
    } catch (error) {
        console.log(error)
        
    }
}