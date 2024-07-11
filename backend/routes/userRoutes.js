import express from "express";
import {
  createUser,
  getAllUsers,
  getCurrentUserProfile,
  loginUser,
  logoutUser,
  updateCurrentUserProfile,
} from "../controllers/userController.js";

import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizedAdmin, getAllUsers);
router.route("/auth").post(loginUser);
router.route("/logout").post(logoutUser);
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);
export default router;
