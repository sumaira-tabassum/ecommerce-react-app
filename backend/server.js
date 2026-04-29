import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import { seedAdmin } from "./utils/seedAdmin.js";
import connectCloudinary from "./config/cloudinary.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
seedAdmin();
connectCloudinary();
app.get("/", (req, res) => {
  res.send("API is running");
});

import productRoutes from "./routes/productRoutes.js";
app.use("/api/products", productRoutes);

import categoryRoutes from "./routes/categoryRoutes.js";
app.use("/api/categories", categoryRoutes);

import uploadRoutes from "./routes/uploadRoutes.js";
app.use("/api/uploads", uploadRoutes);

import orderRoutes from "./routes/orderRoutes.js";
app.use("/api/orders", orderRoutes);

import userRoutes from "./routes/userRoutes.js";
app.use("/api/auth", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});