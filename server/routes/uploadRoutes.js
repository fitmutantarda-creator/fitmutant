import express from "express";
import multer from "multer";
import { uploadImage, deleteImage } from "../controllers/uploadController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer konfigürasyonu - geçici klasöre upload et
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Sadece resim dosyalarına izin ver
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Upload endpoint
router.post("/", upload.single("image"), uploadImage);

// Delete endpoint
router.delete("/:publicId", protectAdmin, deleteImage);

export default router;