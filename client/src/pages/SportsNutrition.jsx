import React, { useState, useEffect } from "react";
import PackageCard from "../components/PackageCard";
import heroImg from "../assets/sporcubeslenmesi.jpg";
import img1 from "../assets/sporcu-beslenmesi-mini-baslangic.jpg";
import img2 from "../assets/sporcu-beslenmesi-orta-baslangic.jpg";
import img3 from "../assets/sporcu-beslenmesi-tam-baslangic.jpg";
import { getPackages } from "../services/packageService";

const staticImages = [img1, img2, img3];

const SportsNutrition = () => {
  const themeColor = "var(--theme-green)";
  const phoneNumber = "905555555555";
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackages("Sporcu Beslenmesi");
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
    const message = `Merhaba Arda Bey, Sporcu Beslenmesi - ${pkg.title} hakkında bilgi almak ve başlamak istiyorum.`;
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
        overflowX: "hidden", // Yatay scrollu kesin olarak bitirir
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
          alt="Sporcu Beslenmesi"
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
            SPORCU BESLENMESİ
          </h1>
          <p style={{ fontSize: "1.2rem", color: "white" }}>
            Maksimum performans, hızlı toparlanma.
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
        }}
      >
        %30 İNDİRİM FIRSATINI KAÇIRMA!
      </div>
      {/* Packages Grid - KESİN ÇÖZÜM */}
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
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "25px",
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          {packages.map((pkg, index) => (
            <div
              key={index}
              style={{
                // flex: "0 0 340px" -> Büyüme (0), Küçülme (0), Hep 340px kal!
                flex: "0 0 340px",
                maxWidth: "100%", // Mobil ekran 340px'den küçükse dışarı taşmasın
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "100%" }}>
                {" "}
                {/* Kartın genişliğini zorla %100 yapıyoruz */}
                <PackageCard
                  {...pkg}
                  image={pkg.image || staticImages[index % staticImages.length]}
                  themeColor={themeColor}
                  onSelect={() => handleSelect(pkg)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SportsNutrition;
