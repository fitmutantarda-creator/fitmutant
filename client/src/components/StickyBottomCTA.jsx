import React from "react";
import { MdBolt } from "react-icons/md";

const StickyBottomCTA = ({
  price,
  buttonText,
  onButtonClick,
  infoText,
  subPriceText,
  className = "",
}) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-light/90 via-background-light/90 to-transparent dark:from-background-dark dark:via-background-dark dark:to-transparent z-40 pointer-events-none pb-24 ${className}`}
    >
      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-4 rounded-2xl flex items-center justify-between pointer-events-auto shadow-lg dark:shadow-none">
        {price && (
          <div>
            {subPriceText && (
              <span className="block text-[10px] uppercase text-slate-500 dark:text-slate-400 font-bold tracking-widest">
                {subPriceText}
              </span>
            )}
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {price}
            </span>
          </div>
        )}
        {infoText && !price && (
          <div className="flex-1 mr-4 text-slate-700 dark:text-slate-300">
            {infoText}
          </div>
        )}

        <button
          onClick={onButtonClick}
          className={`bg-primary hover:bg-primary/90 text-background-dark font-black px-6 py-4 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(13,242,108,0.3)] active:scale-95 transition-transform ${!price ? "w-full justify-center" : ""}`}
        >
          {buttonText}
          <MdBolt className="text-xl" />
        </button>
      </div>
      {/* iOS Home Indicator Space */}
      <div className="h-4 w-full"></div>
    </div>
  );
};

export default StickyBottomCTA;
