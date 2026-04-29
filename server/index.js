import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Yapılandırma
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
  origin: [
    "http://localhost:5173", // Local Vite dev server
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:5000",
    "http://127.0.0.1:5000",
    "https://fitmutant.vercel.app",  // Vercel deployment
    "https://www.fitmutant.com",     // Production domain
    "https://fitmutant.com",         // Production domain (www'suz)
    process.env.FRONTEND_URL,        // Environment variable for production
  ].filter(Boolean),
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware (Ara Yazılımlar)
app.use(express.json({ limit: "50mb" })); // JSON gövdesini ayrıştırmak için
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors(corsOptions)); // Cross-Origin kaynak paylaşımı için

import packageRoutes from "./routes/packageRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";

// MongoDB Bağlantısı
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Bağlantısı Başarılı");
  })
  .catch((err) => console.log("❌ MongoDB Bağlantı Hatası:", err));

// Routes
app.use("/api/packages", packageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/announcements", announcementRoutes);

// Health check and Ping endpoint (UptimeRobot için)
app.get("/api/health", async (req, res) => {
  try {
    // Veritabanının ve sunucunun uyku moduna geçmesini engellemek için db'ye ufak bir sorgu (ping)
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.db.admin().ping();
    }
    res.json({ 
      status: "ok", 
      message: "Fit Mutant API is active and Database connection is alive",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Ping Hatası:", error);
    res.status(500).json({ status: "error", message: "Database ping failed" });
  }
});

// Temel Başlangıç Rotası
app.get("/", (req, res) => {
  res.send("Fit Mutant API Sunucusu çalışıyor...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// Sunucuyu Başlat
const HOST = process.env.HOST || "0.0.0.0";
app.listen(PORT, HOST, () => {
  console.log(`🚀 Sunucu http://localhost:${PORT} adresinde yayında`);
  console.log(`📍 CORS Enabled for: ${corsOptions.origin.join(", ")}`);
});

