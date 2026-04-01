import React, { useState, useEffect } from "react";
import PackageCard from "../components/PackageCard";
import heroImg from "../assets/kiloverme.jpeg";
import img1 from "../assets/kilo-verme-mini-baslangic.jpg";
import img2 from "../assets/kilo-verme-orta-baslangic.jpg";
import img3 from "../assets/kilo-verme-tam-baslangic.jpg";
import { getPackages } from "../services/packageService";

const staticImages = [img1, img2, img3];

const WeightLoss = () => {
  const themeColor = "var(--theme-magenta)";
  const phoneNumber = "905555555555";
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackages("Kilo Verme");
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
    const message = `Merhaba Arda Bey, Kilo Verme - ${pkg.title} hakkında bilgi almak ve başlamak istiyorum.`;
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          color: "var(--text-main)",
        }}
      >
        Yükleniyor...
      </div>
    );
  }

  return (
    <div
      style={{
        paddingBottom: "80px",
        width: "100%",
        overflowX: "hidden", // Yatay kaymayı engeller
        boxSizing: "border-box",
      }}
    >
      {/* Header Image/Banner */}
      <div
        style={{
          height: "250px",
          position: "relative",
          marginBottom: "20px",
          overflow: "hidden",
        }}
      >
        <img
          src={heroImg}
          alt="Kilo Verme"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: "0.5",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
            zIndex: 2,
          }}
        >
          <h1
            style={{ fontSize: "2.5rem", color: themeColor, fontWeight: "900" }}
          >
            KİLO VERME
          </h1>
          <p style={{ fontSize: "1.2rem", color: "white" }}>
            Hayalindeki vücuda kavuş.
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            zIndex: 1,
          }}
        />
      </div>

      {/* Discount Bar */}
      <div
        style={{
          backgroundColor: themeColor,
          color: "black",
          textAlign: "center",
          padding: "12px",
          fontWeight: "900",
          marginBottom: "40px",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        %30 İNDİRİM FIRSATINI KAÇIRMA!
      </div>

      {/* Packages Container (DÜZELTİLEN KISIM) */}
      <section
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "0 20px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap", // Sığmayınca alt satıra atar (Mobilde alt alta)
            justifyContent: "center", // Her zaman ortalar
            gap: "30px",
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          {packages.map((pkg, index) => (
            <div
              key={index}
              style={{
                width: "100%",
                maxWidth: "360px", // Kartın çok yayılmasını engeller
                display: "flex",
                justifyContent: "center",
              }}
            >
              <PackageCard
                {...pkg}
                image={pkg.image || staticImages[index % staticImages.length]}
                themeColor={themeColor}
                onSelect={() => handleSelect(pkg)}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WeightLoss;
