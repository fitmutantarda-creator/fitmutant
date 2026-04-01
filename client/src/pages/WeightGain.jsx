import React, { useState, useEffect } from "react";
import PackageCard from "../components/PackageCard";
import heroImg from "../assets/kiloalma.jpeg";
import img1 from "../assets/kilo-alma-mini-baslangic.jpg";
import img2 from "../assets/kilo-alma-orta-baslangic.jpg";
import img3 from "../assets/kilo-alma-tam-baslangic.jpg";
import { getPackages } from "../services/packageService";

const staticImages = [img1, img2, img3];

const WeightGain = () => {
  const themeColor = "var(--theme-orange)";
  const phoneNumber = "905555555555";
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackages("Kilo Alma");
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const handleSelect = (pkg) => {
    const message = `Merhaba Arda Bey, Kilo Alma - ${pkg.title} hakkında bilgi almak ve başlamak istiyorum.`;
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>Yükleniyor...</div>
    );
  }

  return (
    <div style={{ paddingBottom: "80px" }}>
      {/* Header Image/Banner */}
      <div
        style={{ height: "250px", position: "relative", marginBottom: "20px" }}
      >
        <img
          src={heroImg}
          alt="Kilo Alma"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: "0.6",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", color: themeColor }}>KİLO ALMA</h1>
          <p style={{ fontSize: "1.2rem", color: "var(--text-main)" }}>
            Hacim kazan, güçlen.
          </p>
        </div>
      </div>

      {/* Discount Bar */}
      <div
        style={{
          backgroundColor: themeColor,
          color: "black",
          textAlign: "center",
          padding: "10px",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        %30 İNDİRİM FIRSATINI KAÇIRMA!
      </div>

      {/* Packages Grid */}
      <div
        style={{
          display: "flex", // Grid yerine Flex
          flexWrap: "wrap", // Sığmayınca alt satıra geç (Mobilde alt alta gelmesini sağlar)
          justifyContent: "center", // Her zaman yatayda ortala
          gap: "25px",
          padding: "0 20px",
          maxWidth: "1200px",
          margin: "0 auto", // Konteynırı ortala
          width: "100%", // Genişliği koru
          boxSizing: "border-box",
        }}
      >
        {packages.map((pkg, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              maxWidth: "350px", // Kartın mobilde ekranı patlatmasını, tablette çok büyümesini engeller
              display: "flex",
              justifyContent: "center",
            }}
          >
            <PackageCard
              {...pkg}
              image={staticImages[index % 3]}
              themeColor={themeColor}
              onSelect={() => handleSelect(pkg)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeightGain;
