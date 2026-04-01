import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AdminAuthModal = ({ onClose }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { password: password.trim() });
      sessionStorage.setItem("adminToken", res.data.token);
      onClose();
      navigate("/admin/packages");
    } catch (err) {
      setError(
        err.response?.data?.message || "Giriş başarısız. Şifreyi kontrol edin.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        backgroundColor: "rgba(0,0,0,0.82)",
        backdropFilter: "blur(6px)",
        padding: "16px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-col)",
          borderRadius: "20px",
          padding: "28px 24px",
          width: "100%",
          maxWidth: "420px",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          zIndex: 51,
          boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: "24px",
            paddingBottom: "20px",
            borderBottom: "1px solid color-mix(in srgb, var(--border-col) 30%, transparent)",
            position: "relative",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              position: "absolute",
              top: "-4px",
              right: "0px",
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              fontSize: "26px",
              lineHeight: 1,
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s ease",
              borderRadius: "8px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--theme-orange)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            aria-label="Kapat"
          >
            ×
          </button>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.5rem, 5vw, 2rem)",
              fontWeight: 900,
              color: "var(--text-main)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              margin: 0,
            }}
          >
            Giriş Yap
          </h2>
          <p
            style={{
              fontSize: "10px",
              color: "var(--text-muted)",
              marginTop: "6px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Yönetim Paneline Erişim
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              marginBottom: "20px",
              padding: "12px 16px",
              backgroundColor: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: "12px",
            }}
          >
            <p style={{ color: "#ef4444", fontSize: "13px", fontWeight: 700 }}>
              {error}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              style={{
                fontSize: "10px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
              }}
            >
              Admin Şifresi
            </label>
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifreyi girin"
              autoFocus
              style={{
                width: "100%",
                backgroundColor: "var(--bg-body)",
                border: "1.5px solid var(--border-col)",
                borderRadius: "12px",
                padding: "12px 16px",
                fontSize: "14px",
                color: "var(--text-main)",
                outline: "none",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--theme-orange)";
                e.currentTarget.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--theme-orange) 20%, transparent)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--border-col)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: "var(--theme-orange)",
              color: "#000",
              border: "none",
              borderRadius: "12px",
              padding: "14px 24px",
              fontSize: "12px",
              fontWeight: 900,
              fontFamily: "var(--font-heading)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              transition: "all 0.2s ease",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
            }}
          >
            {loading ? "Kontrol ediliyor..." : "Giriş Yap"}
          </button>
        </form>

        {/* Footer */}
        <p
          style={{
            textAlign: "center",
            fontSize: "10px",
            color: "var(--text-muted)",
            marginTop: "24px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Yetkisiz erişim yasaktır.
        </p>
      </div>
    </div>
  );
};

export default AdminAuthModal;
