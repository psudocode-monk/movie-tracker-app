import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.config.js";
import authRouter from "./routes/auth.routes.js";
import movieRouter from "./routes/movie.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api", movieRouter);

const port = process.env.PORT || 8080;

connectDb().then(() => {
  app.listen(port, () => console.log(`Server listening on port ${port}`));
});
