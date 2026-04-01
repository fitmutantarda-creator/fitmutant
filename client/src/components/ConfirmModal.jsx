import React, { useEffect } from "react";
import { MdWarning, MdInfo, MdCheckCircle, MdClose } from "react-icons/md";

/**
 * ConfirmModal — Tema uyumlu özel modal.
 *
 * Props:
 *  - isOpen       : boolean
 *  - type         : "confirm" | "alert" | "success"   (default: "confirm")
 *  - title        : string
 *  - message      : string
 *  - confirmText  : string (default: "Evet")
 *  - cancelText   : string (default: "İptal")
 *  - onConfirm    : () => void
 *  - onCancel     : () => void
 */
const ConfirmModal = ({
  isOpen,
  type = "confirm",
  title,
  message,
  confirmText,
  cancelText = "İptal",
  onConfirm,
  onCancel,
}) => {
  // ESC tuşuyla kapat
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onCancel?.();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onCancel]);

  // Açıkken scroll'u kilitle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const config = {
    confirm: {
      icon: MdWarning,
      iconColor: "var(--theme-orange)",
      iconBg: "rgba(255,140,0,0.12)",
      defaultTitle: "Emin misiniz?",
      defaultConfirm: "Evet, Devam Et",
      confirmBg: "var(--theme-orange)",
      confirmColor: "#000",
    },
    alert: {
      icon: MdInfo,
      iconColor: "#ef4444",
      iconBg: "rgba(239,68,68,0.12)",
      defaultTitle: "Uyarı",
      defaultConfirm: "Tamam",
      confirmBg: "#ef4444",
      confirmColor: "#fff",
    },
    success: {
      icon: MdCheckCircle,
      iconColor: "var(--theme-green)",
      iconBg: "rgba(0,200,100,0.12)",
      defaultTitle: "Başarılı",
      defaultConfirm: "Tamam",
      confirmBg: "var(--theme-green)",
      confirmColor: "#000",
    },
  };

  const c = config[type] || config.confirm;
  const Icon = c.icon;
  const isAlertOnly = type === "alert" || type === "success";

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onCancel}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          zIndex: 9998,
          animation: "modalFadeIn 0.2s ease",
        }}
      />

      {/* Modal Box */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          width: "min(90vw, 380px)",
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-col)",
          borderRadius: "20px",
          boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
          padding: "28px 24px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "0",
          animation: "modalSlideUp 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Close button (sağ üst) */}
        <button
          onClick={onCancel}
          aria-label="Kapat"
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: "1px solid var(--border-col)",
            backgroundColor: "var(--bg-body)",
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--border-col)";
            e.currentTarget.style.color = "var(--text-main)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-body)";
            e.currentTarget.style.color = "var(--text-muted)";
          }}
        >
          <MdClose size={14} />
        </button>

        {/* Icon */}
        <div
          style={{
            width: "54px",
            height: "54px",
            borderRadius: "16px",
            backgroundColor: c.iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <Icon size={28} color={c.iconColor} />
        </div>

        {/* Title */}
        <h2
          id="modal-title"
          style={{
            fontSize: "1.05rem",
            fontWeight: 900,
            color: "var(--text-main)",
            fontFamily: "var(--font-heading, inherit)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: "8px",
          }}
        >
          {title || c.defaultTitle}
        </h2>

        {/* Message */}
        {message && (
          <p
            style={{
              fontSize: "13.5px",
              color: "var(--text-muted)",
              lineHeight: 1.6,
              marginBottom: "24px",
              fontWeight: 500,
            }}
          >
            {message}
          </p>
        )}

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: isAlertOnly ? "column" : "row",
            marginTop: message ? 0 : "24px",
          }}
        >
          {/* Cancel — sadece confirm tipinde göster */}
          {!isAlertOnly && (
            <button
              onClick={onCancel}
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1.5px solid var(--border-col)",
                backgroundColor: "var(--bg-body)",
                color: "var(--text-main)",
                fontSize: "12px",
                fontWeight: 800,
                fontFamily: "var(--font-heading, inherit)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--text-muted)";
                e.currentTarget.style.backgroundColor = "var(--border-col)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-col)";
                e.currentTarget.style.backgroundColor = "var(--bg-body)";
              }}
            >
              {cancelText}
            </button>
          )}

          {/* Confirm */}
          <button
            onClick={onConfirm}
            style={{
              flex: isAlertOnly ? "unset" : 1,
              width: isAlertOnly ? "100%" : "auto",
              padding: "12px 16px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: c.confirmBg,
              color: c.confirmColor,
              fontSize: "12px",
              fontWeight: 900,
              fontFamily: "var(--font-heading, inherit)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.88";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {confirmText || c.defaultConfirm}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translate(-50%, -44%) scale(0.92); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </>
  );
};

export default ConfirmModal;
