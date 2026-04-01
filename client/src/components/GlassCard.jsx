import React from "react";

const GlassCard = ({ children, className = "", onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white/10 backdrop-blur-md border border-white/10 rounded-xl ${className} ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
