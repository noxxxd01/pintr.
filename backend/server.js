import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path, { join } from "path";

dotenv.config();
const port = process.env.PORT || 4000;

const app = express();

const __dirname__ = path.resolve();
app.use(express.static(path.join(__dirname__, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname__, "frontend", "dist", "indexl.html"));
});

// Database
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(port, () => console.log(`Server is running on port ${port}`));
