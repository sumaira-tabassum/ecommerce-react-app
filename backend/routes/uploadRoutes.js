import express from "express";
import upload from "../middleware/upload.js";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
   
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(file.buffer); 
    });

    res.json({
      message: "Image uploaded successfully",
      imageUrl: result.secure_url
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;