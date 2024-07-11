import Post from "../models/Post.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createPost = asyncHandler(async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const getAllPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.find();
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const updatePost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatePost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatePost) {
      return res.status(400).json({ message: "Post not found" });
    }
    res.json(updatePost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const deletePost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

const getPost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const comments = asyncHandler(async (req, res) => {
  try {
    const { comment } = req.body;
    const post = await Post.findById(req.params.id);

    if (post) {
      const alreadyComment = post.comments.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyComment) {
        res.status(400);
        throw new Error("Post already commented");
      }

      const commentPost = {
        name: req.user.username,
        comment,
        user: req.user._id,
      };

      post.comments.push(commentPost);
      await post.save();
      res.status(200).json({ message: "Comment added" });
    } else {
      res.status(400);
      throw new Error("Post not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

export { createPost, getAllPost, updatePost, deletePost, getPost, comments };
