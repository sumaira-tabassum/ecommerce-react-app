import express from "express";
import { getStats } from "../controllers/statsController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getStats);

export default router;
