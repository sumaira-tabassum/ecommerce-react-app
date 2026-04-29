import express from "express";
import { createCategory, getCategories } from "../controllers/categoryController.js";
// import adminMiddleware from "../middleware/adminMiddleware.js";
// import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);

export default router