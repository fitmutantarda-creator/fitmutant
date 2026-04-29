import React from "react";
import { Link } from "react-router-dom";

const CategoryButton = ({ to, color, title, description, imgSrc }) => {
  return (
    <Link
      to={to}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "94%",
        maxWidth: "420px",
        minWidth: "260px",
        minHeight: "140px",
        padding: "8px 18px",
        backgroundColor: color,
        border: `2px solid ${color}`,
        borderRadius: "24px",
        boxSizing: "border-box",
        textDecoration: "none",
        color: "white",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: `0 12px 30px ${color}30`,
        overflow: "visible",
        zIndex: 1,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {/* Image - Absolutely positioned at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: "18px",
          width: "150px",
          height: "180px",
          borderRadius: "18px",
          backgroundColor: "transparent",
          overflow: "visible",
          zIndex: 0,
          
        }}
      >
        <img
          src={imgSrc}
          alt={title}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "100%",
            height: "100%",
            objectFit: "fill",
            margin: 0,
            padding: 0,
          }}
        />
      </div>

      {/* Content - Text and title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "left",
          zIndex: 2,
          position: "relative",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "800", lineHeight: 1.1 }}>
          {title}
        </h2>
        <p style={{ margin: "10px 0 0", fontSize: "0.95rem", opacity: 0.9, maxWidth: "220px" }}>
          {description}
        </p>
      </div>
    </Link>
  );
};

export default CategoryButton;
