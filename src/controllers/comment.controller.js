import Comment from '../models/comment.model.js';
import Blog from '../models/blog.model.js';

export const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const blogId = req.params.blogId;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const newComment = await Comment.create({
      text,
      user: req.user.id,
      blog: blogId,
    });

    res.status(201).json({
      message: "Comment added successfully",
      comment: newComment,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCommentsByBlog = async (req,res) =>{
try {
    const blogId = req.params.blogId;

  const getcomments= (await Comment.find({blog:blogId}).populate("user","name email"))
  if(getcomments.length === 0){
    return res.status(400).json({message:"No comment found"})


  }

  res.status(200).json(getcomments)
  
} catch (error) {
  console.log(error)
  return res.status(500).json({message :"server error"})
  
}




}