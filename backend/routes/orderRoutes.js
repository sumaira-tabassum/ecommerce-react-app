import express from "express";
import { createOrder, getOrders, updateOrderStatus } from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Anyone can place an order; only admins can see or update them
router.post("/", createOrder);
router.get("/", authMiddleware, adminMiddleware, getOrders);
router.put("/:id", authMiddleware, adminMiddleware, updateOrderStatus);

export default router
