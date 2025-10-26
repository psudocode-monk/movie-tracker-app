import { Router } from "express"
import {
  createMovie,
  deleteMovie,
  getMoviesByUser,
  updateMovie,
} from "../controllers/movie.controllers.js"
import { authMiddleware } from "../middlewares/auth.middlewares.js"
import Movie from "../models/movie.models.js"

const movieRouter = Router()

movieRouter.post("/create-movies", authMiddleware, createMovie)
movieRouter.delete("/delete-movies/:id", authMiddleware, deleteMovie)
movieRouter.get("/get-movies", authMiddleware, getMoviesByUser)

movieRouter.get("/api/get-movie/:id", authMiddleware, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
    if (!movie) return res.status(404).json({ message: "Movie not found" })
    res.json(movie)
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

movieRouter.put("/api/update-movie/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updated) return res.status(404).json({ message: "Movie not found" })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})


export default movieRouter
