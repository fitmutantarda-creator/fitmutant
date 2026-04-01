import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdOutlineHome,
  MdOutlineFitnessCenter,
  MdOutlineRestaurantMenu,
  MdOutlinePersonOutline,
  MdAdd,
} from "react-icons/md";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: MdOutlineHome, label: "Ana Sayfa", path: "/" },
    { icon: MdOutlineFitnessCenter, label: "Program", path: "/muscle-gain" },
    { isAction: true, label: "Ekle", path: "/apply" },
    { icon: MdOutlineRestaurantMenu, label: "Diyet", path: "/nutrition" },
    { icon: MdOutlinePersonOutline, label: "Profil", path: "/about" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full glass-nav border-t border-primary/10 px-6 py-2 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-xl flex justify-center shadow-lg dark:shadow-none">
      <div className="w-full max-w-md flex justify-between items-center relative h-[60px]">
        {navItems.map((item, index) => {
          if (item.isAction) {
            return (
              <div
                key="action-btn"
                className="relative flex justify-center items-center w-1/5"
              >
                <button
                  onClick={() => navigate(item.path)}
                  className="w-12 h-12 bg-primary text-background-dark rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(13,242,108,0.4)] border-2 border-background-light dark:border-background-dark transition-transform active:scale-95"
                >
                  <MdAdd className="text-3xl" />
                </button>
              </div>
            );
          }

          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-1 w-1/5 transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
              }`}
            >
              <item.icon className="text-2xl" />
              <span
                className={`text-[10px] ${isActive ? "font-bold" : ""} uppercase tracking-tighter`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
