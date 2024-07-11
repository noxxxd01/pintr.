import express from "express";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import {
  comments,
  createPost,
  deletePost,
  getAllPost,
  getPost,
  updatePost,
} from "../controllers/postController.js";

const router = express.Router();

// Public routes
router.get("/posts", getAllPost);
router.get("/posts/:id", getPost);

// Authenticated
router.post("/:id/comments", authenticate, checkId, comments);

// Admin
router.post("/create-post", authenticate, authorizedAdmin, createPost);
router.put("/update-post/:id", authenticate, authorizedAdmin, updatePost);
router.delete("/delete-post/:id", authenticate, authorizedAdmin, deletePost);

export default router;
