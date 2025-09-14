import dotenv from "dotenv";
dotenv.config();  // ✅ load env before anything else

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";

import authRoutes from "./routes/authRoutes";
import "./config/passport"; // ✅ now env is ready

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.json({ message: "Server is running!" }));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
