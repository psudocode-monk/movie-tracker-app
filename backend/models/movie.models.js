import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    director: { type: String, required: true },
    budget: { type: Number, required: true },
    location: { type: String, required: true },
    duration: { type: String, required: true },
    yearOrTime: { type: String, required: true },
    genre: { type: String, required: true },
    rating: { type: Number, default: 0 },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // add this
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
