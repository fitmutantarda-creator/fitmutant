import mongoose from "mongoose";
import dotenv from "dotenv";
import Package from "./models/Package.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Bağlantısı Başarılı");

    const count = await Package.countDocuments();
    if (count === 0) {
      const initialPackages = [
        // Kilo Alma
        {
          category: "Kilo Alma",
          title: "Mini Başlangıç Paketi",
          price: 3400,
          originalPrice: 4030,
          features: [
            "2 Öğün Shake",
            "Protein Bar (Hediye)",
            "Shaker Hediye",
            "Ücretsiz Kargo",
            "Kas Gelişim Koçluğu",
          ],
        },
        {
          category: "Kilo Alma",
          title: "Orta Başlangıç Paketi",
          price: 4250,
          originalPrice: 5500,
          features: [
            "2 Öğün Shake",
            "Rebuild Strength (Kas Yapılanma)",
            "Protein Bar",
            "Shaker Hediye",
            "Ücretsiz Kargo",
            "Birebir Antrenman & Beslenme Planı",
          ],
        },
        {
          category: "Kilo Alma",
          title: "Tam Başlangıç Paketi",
          price: 5400,
          originalPrice: 7000,
          features: [
            "2 Öğün Shake",
            "Rebuild Strength",
            "CR7 Drive (Performans)",
            "Protein Bar",
            "Shaker Hediye",
            "VIP Koçluk Desteği",
          ],
        },
        // Kilo Verme
        {
          category: "Kilo Verme",
          title: "Mini Başlangıç Paketi",
          price: 3400,
          originalPrice: 4030,
          features: [
            "2 Öğün Shake",
            "Detoks Çayı (50g)",
            "Shaker Hediye",
            "Ücretsiz Kargo",
            "Birebir Koçluk Takibi",
          ],
        },
        {
          category: "Kilo Verme",
          title: "Orta Başlangıç Paketi",
          price: 4250,
          originalPrice: 5500,
          features: [
            "2 Öğün Shake",
            "Detoks Çayı (50g)",
            "Aloe Vera Konsantre İçecek",
            "Shaker Hediye",
            "Ücretsiz Kargo",
            "Birebir Koçluk + Beslenme Planı",
          ],
        },
        {
          category: "Kilo Verme",
          title: "Tam Başlangıç Paketi",
          price: 5400,
          originalPrice: 7000,
          features: [
            "2 Öğün Shake",
            "Detoks Çayı (100g)",
            "Aloe Vera",
            "Termo Complete (Yağ Yakıcı)",
            "Shaker Hediye",
            "VIP Koçluk Desteği",
          ],
        },
        // Sporcu Beslenmesi
        {
          category: "Sporcu Beslenmesi",
          title: "Performans Paketi",
          price: 3500,
          originalPrice: 4500,
          features: [
            "CR7 Drive (Elektrolit)",
            "Rebuild Strength",
            "Shaker Hediye",
            "Ücretsiz Kargo",
            "Maç/Antrenman Koçluğu",
          ],
        },
        {
          category: "Sporcu Beslenmesi",
          title: "Elit Sporcu Paketi",
          price: 5000,
          originalPrice: 6500,
          features: [
            "CR7 Drive",
            "Rebuild Strength",
            "Rebuild Endurance",
            "Shaker Hediye",
            "Ücretsiz Kargo",
            "Profesyonel Beslenme Koçluğu",
          ],
        },
        {
          category: "Sporcu Beslenmesi",
          title: "Şampiyon Paketi",
          price: 7500,
          originalPrice: 9000,
          features: [
            "Tam Performans Serisi (H24)",
            "Özel Takviyeler",
            "Kişiye Özel Antrenman Programı",
            "7/24 VIP Koçluk",
            "Hediye Ekipmanlar",
          ],
        },
      ];
      await Package.insertMany(initialPackages);
      console.log("✅ Initial Packages Seeded");
    } else {
      console.log("ℹ️ Veritabanında zaten paketler mevcut. Seed işlemi atlandı.");
    }
  } catch (error) {
    console.error("❌ Error Seeding Packages:", error);
  } finally {
    mongoose.connection.close(); // İşlem bitince DB bağlantısını kapat
    process.exit(0);
  }
};

seedData();
