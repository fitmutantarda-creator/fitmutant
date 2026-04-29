import React from "react";
import { FaCheck } from "react-icons/fa";

const PackageCard = ({
  title,
  image,
  price,
  originalPrice,
  features,
  themeColor,
}) => {
  const phoneNumber = "905418142732";
  const message = encodeURIComponent(
    `Selam! *${title}* paketi hakkında bilgi almak istiyorum. (Fiyat: ${price} TL)`
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  // ... (importlar ve whatsappUrl kısmı aynı)

  return (
    <div
      className="package-card-container" // CSS tarafında yönetmek daha kolaydır ama inline devam edelim
      style={{
        backgroundColor: "var(--bg-card)",
        borderRadius: "8px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${themeColor}`,
        boxShadow: `0 0 10px ${themeColor}20`,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        height: "550px",
        margin: "4px",
        position: "relative"
      }}
      // onMouseEnter ve onMouseLeave aynı kalsın...
    >
      {/* Görsel Alanı */}
      <div style={{ height: "180px", minHeight: "180px" }}>
        <img
          src={image}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* İçerik Alanı */}
      <div
        style={{
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          flex: 1, // Kalan tüm boşluğu doldurması için
          justifyContent: "space-between" // Butonu en alta iter
        }}
      >
        <div>
          <h3 style={{ 
            color: themeColor, 
            fontSize: "1.2rem", 
            marginBottom: "10px",
            height: "2.8rem", // Başlık alanını sabitle
            overflow: "hidden" 
          }}>
            {title}
          </h3>

          <div style={{ marginBottom: "15px" }}>
            <span style={{ textDecoration: "line-through", color: "var(--text-muted)", marginRight: "10px", fontSize: "0.85rem" }}>
              {originalPrice} TL
            </span>
            <span style={{ color: "var(--text-main)", fontSize: "1.3rem", fontWeight: "bold" }}>
              {price} TL
            </span>
          </div>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {features.slice(0, 5).map((feature, index) => ( // Özellik sayısını sınırla veya alanı sabitle
              <li key={index} style={{ marginBottom: "8px", display: "flex", alignItems: "center", color: "var(--text-muted)" }}>
                <FaCheck style={{ color: themeColor, marginRight: "8px", minWidth: "12px" }} />
                <span style={{ fontSize: "0.85rem" }}>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* WhatsApp Linki */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: themeColor,
            color: "black",
            padding: "12px",
            borderRadius: "4px",
            fontWeight: "bold",
            textAlign: "center",
            textDecoration: "none",
            display: "block",
            marginTop: "10px"
          }}
        >
          SATIN AL / BİLGİ AL
        </a>
      </div>
    </div>
  );
};

export default PackageCard;