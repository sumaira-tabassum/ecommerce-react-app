import express from "express";
import { logIn, signUp, getMe } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/me", authMiddleware, getMe);

export default router;