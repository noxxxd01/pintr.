import asyncHandler from "../middlewares/asyncHandler.js";
import Genre from "../models/Genre.js";

const createGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new Error("Name is required");
    }

    const existsGenre = await Genre.findOne({ name });
    if (existsGenre) {
      res.status(400);
      throw new Error("Genre already exists");
    }

    const genre = await new Genre({ name }).save();
    res.json(genre);
  } catch (error) {
    return res.status(400).json(error);
  }
});

const updateGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const genre = await Genre.findOne({ _id: id });

    if (!genre) {
      return res.status(400).json({ error: "Genre not found" });
    }

    genre.name = name;

    const updatedGenre = await genre.save();
    res.json(updatedGenre);
  } catch (error) {
    return res.status(400).json(error);
  }
});

const deleteGenre = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const remove = await Genre.findByIdAndDelete(id);

    if (!remove) {
      return res.status(400).json({ error: "Genre not found" });
    } else {
      res.json(remove);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

const listGenres = asyncHandler(async (req, res) => {
  try {
    const results = await Genre.find({});
    res.json(results);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Internal server error" });
  }
});

const getGenre = asyncHandler(async (req, res) => {
  try {
    const genre = await Genre.findOne({ _id: req.params.id });
    res.json(genre);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Internal server error" });
  }
});

export { createGenre, updateGenre, deleteGenre, listGenres, getGenre };
