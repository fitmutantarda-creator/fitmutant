import React from "react";
import { MdAdd } from "react-icons/md";

const ListItemCard = ({
  icon,
  image,
  title,
  subtitle,
  description,
  actionIcon,
  onAction,
  className = "",
}) => {
  return (
    <div
      className={`group p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-primary/30 transition-all flex items-center ${className}`}
    >
      <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0 flex items-center justify-center">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : icon ? (
          React.createElement(icon, { className: "text-primary text-3xl" })
        ) : null}
      </div>
      <div className="ml-4 flex-1">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
          {title}
        </h4>
        {subtitle && (
          <p className="text-[10px] text-slate-500 dark:text-slate-500">
            {subtitle}
          </p>
        )}
        {description && (
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {actionIcon && (
        <button
          onClick={onAction}
          className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center transition-colors hover:bg-primary hover:text-white"
        >
          {typeof actionIcon === "string" && actionIcon === "add" ? (
            <MdAdd className="text-sm" />
          ) : (
            actionIcon
          )}
        </button>
      )}
    </div>
  );
};

export default ListItemCard;
