import React from "react";

const TransformationCard = ({
  beforeImage,
  afterImage,
  name,
  duration,
  result,
  resultLabel,
}) => {
  return (
    <div className="min-w-[280px] bg-white/5 rounded-xl p-4 border border-white/5">
      <div className="flex gap-2 mb-3">
        <div className="w-1/2 aspect-[4/5] rounded-lg bg-slate-800 overflow-hidden relative">
          <img
            src={beforeImage}
            alt="Before transformation"
            className="w-full h-full object-cover grayscale opacity-50"
          />
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 text-[8px] rounded uppercase text-white">
            Önce
          </span>
        </div>
        <div className="w-1/2 aspect-[4/5] rounded-lg bg-slate-800 overflow-hidden relative border border-primary/40">
          <img
            src={afterImage}
            alt="After transformation"
            className="w-full h-full object-cover"
          />
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-background-dark text-[8px] font-bold rounded uppercase italic">
            Sonra
          </span>
        </div>
      </div>
      <p className="text-xs text-slate-400">
        <strong className="text-white">{name}</strong> ({duration})
      </p>
      <p className="text-[10px] text-primary mt-1 font-bold">
        {result} {resultLabel}
      </p>
    </div>
  );
};

export default TransformationCard;
