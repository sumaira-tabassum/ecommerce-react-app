import express from "express";
import {getStats} from "../controller/statsController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
const router = express.Router();

router.get("/stats", getStats);

export default router