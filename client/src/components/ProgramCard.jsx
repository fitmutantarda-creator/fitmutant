import React from "react";

const ProgramCard = ({ title, subtitle, points, whatsappNumber, whatsappText, color, buttonText }) => {
  const message = encodeURIComponent(whatsappText);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "380px",
        minWidth: "280px",
        backgroundColor: "var(--bg-card)",
        border: `1px solid ${color}20`,
        borderRadius: "28px",
        padding: "24px",
        boxSizing: "border-box",
        boxShadow: `0 20px 50px ${color}10`,
        display: "flex",
        flexDirection: "column",
        gap: "18px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <p style={{ margin: 0, color: color, fontSize: "0.9rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
          {title}
        </p>
        <h3 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 900, lineHeight: 1.15 }}>
          {subtitle}
        </h3>
      </div>

      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "12px" }}>
        {points.map((point, index) => (
          <li key={index} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <span
              style={{
                minWidth: "8px",
                minHeight: "8px",
                borderRadius: "50%",
                backgroundColor: color,
                marginTop: "8px",
              }}
            />
            <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6, opacity: 0.92 }}>
              {point}
            </p>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "auto" }}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "14px 18px",
            borderRadius: "999px",
            backgroundColor: color,
            color: "black",
            fontWeight: 700,
            textDecoration: "none",
            textAlign: "center",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {buttonText || "HEMEN KATIL"}
        </a>
      </div>
    </div>
  );
};

export default ProgramCard;
