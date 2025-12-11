import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(compression());
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

async function start() {
  const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/netflix_clone";
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");

  app.get("/health", (_req, res) => res.json({ ok: true, ts: Date.now() }));

  // sample model
  const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    slug: { type: String, index: true },
    duration: Number,
    publishedAt: Date,
    assets: {
      poster: String,
      hls: String
    }
  }, { timestamps: true });

  const Video = mongoose.model("Video", videoSchema);

  // sample route
  app.get("/api/videos", async (req, res) => {
    const videos = await Video.find().limit(20);
    res.json({ data: videos });
  });

  app.listen(PORT, () => {
    console.log(`Backend listening on ${PORT}`);
  });
}

start().catch(err => {
  console.error("Failed to start:", err);
  process.exit(1);
});
