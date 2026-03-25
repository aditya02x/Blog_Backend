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