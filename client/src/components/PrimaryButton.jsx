import React from "react";

const PrimaryButton = ({
  text,
  icon,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-primary hover:bg-primary/90 text-background-dark font-black py-4 rounded-xl italic uppercase tracking-wider flex items-center justify-center gap-2 mutant-glow transition-all ${className}`}
    >
      {text}
      {icon && <span className="text-xl">{icon}</span>}
    </button>
  );
};

export default PrimaryButton;
