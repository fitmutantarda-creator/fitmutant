import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdLogout } from "react-icons/md";

const AdminNav = () => {
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    window.location.href = "/";
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      style={{
        backgroundColor: "var(--bg-body)",
        borderBottom: "1.5px solid var(--border-col)",
        padding: "16px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          to="/admin/packages"
          style={{
            color: isActive("/admin/packages") ? "var(--theme-orange)" : "var(--text-main)",
            textDecoration: "none",
            fontWeight: isActive("/admin/packages") ? "700" : "600",
            fontSize: "14px",
            borderBottom: isActive("/admin/packages") ? "2px solid var(--theme-orange)" : "none",
            paddingBottom: "4px",
            transition: "all 0.2s ease",
          }}
        >
          Paketler
        </Link>
        <Link
          to="/admin/announcements"
          style={{
            color: isActive("/admin/announcements") ? "var(--theme-orange)" : "var(--text-main)",
            textDecoration: "none",
            fontWeight: isActive("/admin/announcements") ? "700" : "600",
            fontSize: "14px",
            borderBottom: isActive("/admin/announcements") ? "2px solid var(--theme-orange)" : "none",
            paddingBottom: "4px",
            transition: "all 0.2s ease",
          }}
        >
          Duyurular
        </Link>
      </div>

      <button
        onClick={handleLogout}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          backgroundColor: "transparent",
          color: "var(--text-muted)",
          border: "1px solid var(--border-col)",
          padding: "8px 12px",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.color = "var(--theme-orange)";
          e.target.style.borderColor = "var(--theme-orange)";
        }}
        onMouseLeave={(e) => {
          e.target.style.color = "var(--text-muted)";
          e.target.style.borderColor = "var(--border-col)";
        }}
      >
        <MdLogout size={16} /> Çıkış
      </button>
    </div>
  );
};

export default AdminNav;
