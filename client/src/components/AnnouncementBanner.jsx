import React, { useState, useEffect } from "react";
import { getActiveAnnouncements } from "../services/announcementService";
import { MdClose } from "react-icons/md";

const AnnouncementBanner = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dismissedIds, setDismissedIds] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const data = await getActiveAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (announcements.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % announcements.length);
      }, 5000); // Change every 5 seconds
      return () => clearInterval(interval);
    }
  }, [announcements]);

  const handleDismiss = (id) => {
    setDismissedIds([...dismissedIds, id]);
    const filtered = announcements.filter((a) => a._id !== id);
    setAnnouncements(filtered);
    if (currentIndex >= filtered.length && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading || announcements.length === 0) {
    return null;
  }

  const current = announcements[currentIndex];

  return (
    <div
      style={{
        backgroundColor: current.color,
        color: current.textColor,
        padding: "12px 20px",
        textAlign: "center",
        fontSize: "16px",
        fontWeight: "600",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        position: "relative",
        animation: "slideIn 0.3s ease-in-out",
      }}
    >
      <span style={{ fontSize: "20px" }}>{current.emoji}</span>
      <span>
        <strong>{current.title}</strong>
        {current.message && ` - ${current.message}`}
      </span>
      <button
        onClick={() => handleDismiss(current._id)}
        style={{
          position: "absolute",
          right: "15px",
          background: "none",
          border: "none",
          color: current.textColor,
          cursor: "pointer",
          fontSize: "20px",
          padding: "0",
          display: "flex",
          alignItems: "center",
        }}
        aria-label="Dismiss"
      >
        <MdClose />
      </button>
      {announcements.length > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: "4px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "4px",
          }}
        >
          {announcements.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor:
                  idx === currentIndex ? current.textColor : `${current.textColor}50`,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      )}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBanner;
