import express from "express";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createGenre,
  deleteGenre,
  listGenres,
  updateGenre,
} from "../controllers/genreController.js";

const router = express.Router();

router.route("/").post(authenticate, authorizedAdmin, createGenre);
router.route("/:id").put(authenticate, authorizedAdmin, updateGenre);
router.route("/:id").delete(authenticate, authorizedAdmin, deleteGenre);
router.route("/genres").get(listGenres);
router.route("/:id").get(deleteGenre);

export default router;
