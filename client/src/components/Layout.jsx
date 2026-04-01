import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import WhatsAppButton from "./WhatsAppButton";
import AdminAuthModal from "./AdminAuthModal";
import logo from "../assets/logo3.jpg";
import { FaArrowLeft, FaSun, FaMoon } from "react-icons/fa";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState("dark");

  // Easter Egg Authentication State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef(null);

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

  // Handle Easter Egg Footer Clicks
  const handleFooterClick = () => {
    setClickCount((prev) => prev + 1);

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    clickTimeoutRef.current = setTimeout(() => {
      setClickCount(0); // Reset after 2 seconds
    }, 2000);
  };

  useEffect(() => {
    if (clickCount >= 5) {
      setShowAuthModal(true);
      setClickCount(0);
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    }
  }, [clickCount]);

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
        <p
          onClick={handleFooterClick}
          className="select-none cursor-default active:opacity-50 transition-opacity"
          style={{ margin: 0 }}
        >
          &copy; {new Date().getFullYear()} ARDA PEKCAN | FIT MUTANT. All rights
          reserved.
        </p>
      </footer>

      {!isAdmin && <WhatsAppButton />}

      {showAuthModal && (
        <AdminAuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

export default Layout;
