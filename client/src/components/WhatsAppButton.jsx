import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import ConfirmModal from "./ConfirmModal";
import useModal from "../hooks/useModal";

const WhatsAppButton = () => {
  const { modalProps, showConfirm } = useModal();
  const phoneNumber = "905418142732";
  const message = "Merhaba, koçluk hakkında bilgi almak istiyorum.";

  const handleClick = async () => {
    const ok = await showConfirm({
      title: "WhatsApp ile İletişim",
      message: "WhatsApp ile iletişime geçmek istiyor musunuz?",
      confirmText: "Evet, Aç",
    });
    if (ok) {
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#25D366",
          color: "white",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          zIndex: 1000,
          fontSize: "30px",
          cursor: "pointer",
          border: "none",
        }}
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </button>

      <ConfirmModal {...modalProps} />
    </>
  );
};

export default WhatsAppButton;
