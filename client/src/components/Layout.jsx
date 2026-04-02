import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import WhatsAppButton from "./WhatsAppButton";

import logo from "../assets/logo3.jpg";
import { FaArrowLeft, FaSun, FaMoon } from "react-icons/fa";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState("dark");



  // Load theme from local storage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };



  const isHome = location.pathname === "/";
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <header
        style={{
          padding: "10px 20px",
          backgroundColor: "var(--bg-header)",
          borderBottom: "1px solid var(--border-col)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 100,
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        }}
      >
        {/* LEFT: Back Button + Logo + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {!isHome && (
            <button
              onClick={() => navigate(-1)}
              style={{
                background: "transparent",
                color: "var(--text-main)",
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                padding: "5px",
              }}
              aria-label="Go Back"
            >
              <FaArrowLeft />
            </button>
          )}

          <Link
            to="/"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <img
              src={logo}
              alt="Fit Mutant Logo"
              style={{ height: "40px", borderRadius: "50%" }}
            />
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "var(--text-main)",
                letterSpacing: "1px", // Agresif font
              }}
            >
              ARDA PEKCAN
            </span>
          </Link>
        </div>

        {/* RIGHT: Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            background: "transparent",
            color: "var(--text-main)",
            fontSize: "1.2rem",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--border-col)",
            borderRadius: "8px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--bg-card)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // İçindeki her şeyi yatayda ortalar
          width: "100%",
        }}
      >
        {children}
      </main>

      <footer
        style={{
          padding: "30px 20px",
          textAlign: "center",
          backgroundColor: "var(--bg-header)", // Header ile aynı rengi alması bütünlük sağlar
          borderTop: "1px solid var(--border-col)",
          color: "var(--text-muted)",
          fontSize: "12px",
          width: "100%",
        }}
      >
        <div
          className="select-none transition-opacity"
          style={{ margin: 0 }}
        >
          <p style={{ margin: "0 0 8px 0" }}>
            &copy; {new Date().getFullYear()} ARDA PEKCAN | FIT MUTANT. All rights reserved.
          </p>
          <p style={{ margin: 0, fontSize: "11px", color: "var(--text-muted)", opacity: 0.8 }}>
            Bu uygulama{" "}
            <Link to="/" style={{ color: "#b7ff05", textDecoration: "none", fontWeight: "600" }}>
              Fit Mutant
            </Link>{" "}
            için{" "}
            <a href="https://b-exp.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: "#ff8c00", textDecoration: "none", fontWeight: "600" }}>
              B-Exp
            </a>{" "}
            tarafından geliştirilmiştir.
          </p>
        </div>
      </footer>

      {!isAdmin && <WhatsAppButton />}


    </div>
  );
};

export default Layout;
