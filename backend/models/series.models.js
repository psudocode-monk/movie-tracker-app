import mongoose from "mongoose";

const tvSeriesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    type: {
      type: String,
      default: "TV Show",
      immutable: true,
    },
    director: {
      type: String,
      required: [true, "Director is required"],
      trim: true,
    },
    budget: {
      type: Number,
      required: [true, "Budget is required"],
      min: [0, "Budget cannot be negative"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    airingStatus: {
      type: String,
      enum: ["Airing", "Finished"],
      required: [true, "Airing status is required"],
    },
    yearOrTime: {
      type: String,
      required: [true, "Year or Time is required"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
    },
    rating: {
      type: Number,
      min: [0, "Rating cannot be less than 0"],
      max: [10, "Rating cannot exceed 10"],
      default: 0,
    },
    totalSeasons: {
      type: Number,
      min: [1, "Seasons must be at least 1"],
      required: [true, "Total seasons are required"],
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const TVSeries = mongoose.model("TVSeries", tvSeriesSchema);
export default TVSeries;
