import React from "react";
import { FaCheck } from "react-icons/fa";

const PackageCard = ({
  title,
  image,
  price,
  originalPrice,
  features,
  themeColor,
  onSelect,
}) => {
  return (
    <div
      style={{
        backgroundColor: "var(--bg-card)",
        borderRadius: "8px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${themeColor}`,
        boxShadow: `0 0 10px ${themeColor}20`, // 20 is hex opacity
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = `0 10px 20px ${themeColor}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = `0 0 10px ${themeColor}20`;
      }}
    >
      <div style={{ height: "200px", overflow: "hidden" }}>
        <img
          src={image}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div
        style={{
          padding: "20px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3
          style={{
            color: themeColor,
            fontSize: "1.5rem",
            marginBottom: "10px",
          }}
        >
          {title}
        </h3>

        <div style={{ marginBottom: "20px" }}>
          <span
            style={{
              textDecoration: "line-through",
              color: "var(--text-muted)",
              marginRight: "10px",
              fontSize: "0.9rem",
            }}
          >
            {originalPrice} TL
          </span>
          <span
            style={{
              color: "var(--text-main)",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {price} TL
          </span>
        </div>

        <ul style={{ listStyle: "none", marginBottom: "20px", flex: 1 }}>
          {features.map((feature, index) => (
            <li
              key={index}
              style={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                color: "var(--text-muted)",
              }}
            >
              <FaCheck
                style={{
                  color: themeColor,
                  marginRight: "10px",
                  minWidth: "15px",
                }}
              />
              <span style={{ fontSize: "0.9rem" }}>{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={onSelect}
          style={{
            backgroundColor: themeColor,
            color: "black", // Assuming text on bright colors should be black
            padding: "15px",
            borderRadius: "4px",
            fontWeight: "bold",
            fontSize: "1rem",
            width: "100%",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          SATIN AL / BİLGİ AL
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
