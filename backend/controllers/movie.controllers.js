import Movie from "../models/movie.models.js";

export const createMovie = async (req, res) => {
  try {
    const {
      title,
      director,
      budget,
      location,
      duration,
      yearOrTime,
      genre,
      rating,
      description,
    } = req.body;

    if (
      !title ||
      !director ||
      !budget ||
      !location ||
      !duration ||
      !yearOrTime ||
      !genre
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const newMovie = new Movie({
      title,
      director,
      budget,
      location,
      duration,
      yearOrTime,
      genre,
      rating,
      description,
      user: req.userId,
    });

    const savedMovie = await newMovie.save();
    res.status(201).json({
      success: true,
      message: "Movie created successfully",
      data: savedMovie,
    });
  } catch (error) {
    console.error("Error creating movie:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);
    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }

    // Update fields dynamically
    const updates = req.body;
    Object.keys(updates).forEach((key) => {
      movie[key] = updates[key];
    });

    const updatedMovie = await movie.save();

    res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      data: updatedMovie,
    });
  } catch (error) {
    console.error("Error updating movie:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }

    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const getMoviesByUser = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const movies = await Movie.find({ user: userId });
    res.status(200).json(movies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch movies", error: error.message });
  }
};
