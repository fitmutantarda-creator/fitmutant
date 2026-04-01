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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[var(--bg-card)] border border-[var(--border-col)] rounded-2xl w-full max-w-sm shadow-2xl relative p-6 sm:p-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--bg-body)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-fast active:scale-90 font-black text-xl"
        >
          ✕
        </button>

        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-main)] mb-3 uppercase tracking-wider">
            ADMİN GİRİŞİ
          </h2>
          <div className="h-1 w-12 bg-[#ff5757] mx-auto rounded-full opacity-90"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">
              GÜVENLİK ANAHTARI
            </label>
            <input
              ref={inputRef}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 sm:py-4 bg-[var(--bg-body)] text-[var(--text-main)] border border-[var(--border-col)] rounded-lg outline-none focus:border-[#ff5757] text-center text-lg font-mono shadow-inner appearance-none transition-fast"
            />
          </div>
          {error && (
            <p className="text-red-400 text-xs font-black text-center uppercase tracking-wider">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 sm:py-4 bg-[var(--text-main)] text-[var(--bg-body)] font-black rounded-lg uppercase tracking-wider text-sm active:scale-95 transition-fast shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "GİRİŞ YAPILIYOR..." : "SİSTEME GİR"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuthModal;
