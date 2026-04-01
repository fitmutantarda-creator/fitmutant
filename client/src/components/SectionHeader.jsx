import React from "react";

const SectionHeader = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
        <span className="w-1.5 h-6 bg-primary rounded-full"></span>
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
