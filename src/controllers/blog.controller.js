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
            message:"blog created sucessfuly",
            blog
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

export const updateBlog = async (req,res)=>{
    try 
    {
        const {title,content}=req.body;


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

        res.status(200).json({message:"BLOG HAS BEEN UPDATED SUCESSFULLY"})
        
    } catch (error) {
        console.log(error)
        
    }
}

export const deleteBlog = async (req,res)=>{
try {
        const id = req.params.id
    const blog = await Blog.findById(id)
     if(!blog){
            return res.status(404).json({message:"No post found"})
        }
    if(blog.author.toString() !== req.user.id){
         return res.status(403).json({message :"Not authorized"})
    }

    await blog.deleteOne()
    res.status(200).json({message:"It has been deleted sucessfully"})
    
} catch (error) {
        console.error(error);
    res.status(500).json({ message: error.message });
    
}
}

export const toggleLike = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.id;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "No blog found" });
    }

    // check if already liked
    const isLiked = blog.likes.some(
      (id) => id.toString() === userId
    );

    if (isLiked) {
      // remove like
      blog.likes = blog.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      // add like
      blog.likes.push(userId);
    }

    await blog.save();

    res.status(200).json({
      message: isLiked ? "Unliked successfully" : "Liked successfully",
      likesCount: blog.likes.length,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};