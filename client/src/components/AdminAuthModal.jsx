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
    // Mobil cihazlarda anında klavyeyi açması için
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { password: password.trim() });
      sessionStorage.setItem("adminToken", res.data.token);
      onClose(); // Modalı kapat
      navigate("/admin/packages"); // Admin paneline yönlendir
    } catch (err) {
      setError(
        err.response?.data?.message || "Giriş başarısız. Şifreyi kontrol edin.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="bg-(--bg-card) border border-(--border-col) rounded-[2.5rem] w-full max-w-85 shadow-2xl relative"
        style={{ padding: "40px 24px" }}
      >
        <button
          onClick={onClose}
          style={{ width: "40px", height: "40px" }}
          className="absolute top-4 right-4 flex items-center justify-center rounded-full bg-(--bg-body) text-(--text-muted) hover:text-white transition-all active:scale-90"
        >
          ✕
        </button>

        <div className="text-center" style={{ marginBottom: "32px" }}>
          {" "}
          <h2 className="text-xl font-black text-(--text-main) mb-2 font-heading uppercase tracking-[0.2em]">
            ADMİN GİRİŞİ
          </h2>
          <div className="h-1 w-12 bg-(--theme-orange) mx-auto rounded-full opacity-80"></div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col"
          style={{ gap: "20px" }}
        >
          {" "}
          <div className="flex flex-col" style={{ gap: "8px" }}>
            <label className="text-[10px] font-bold uppercase tracking-widest text-(--text-muted) ml-1">
              GÜVENLİK ANAHTARI
            </label>
            <input
              ref={inputRef}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "18px",
                height: "60px",
                letterSpacing: "0.5em",
                display: "block",
              }}
              className="w-full bg-(--bg-body) text-(--text-main) border border-(--border-col) rounded-2xl outline-none focus:border-(--theme-orange) text-center text-xl font-mono shadow-inner appearance-none"
            />
          </div>
          {error && (
            <p className="text-red-500 text-[10px] font-black text-center uppercase tracking-wider">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "18px",
              height: "60px",
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="w-full bg-(--text-main) text-(--bg-body) font-black rounded-2xl uppercase tracking-[0.15em] text-xs active:scale-[0.96] transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? "GİRİŞ YAPILIYOR..." : "SİSTEME GİR"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuthModal;
