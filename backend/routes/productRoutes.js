import express from "express";
import { getProducts, getProductById, createProduct, deleteProduct, updateProduct } from "../controllers/productController.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", authMiddleware, adminMiddleware, createProduct);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);
router.put("/:id", authMiddleware, adminMiddleware, updateProduct);

export default router