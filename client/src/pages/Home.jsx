import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/kiloverme.jpeg";
import {
  FaRunning,
  FaDumbbell,
  FaBolt,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";

// eslint-disable-next-line no-unused-vars
const CategoryButton = ({ to, color, title, icon: Icon, description }) => (
  <Link
    to={to}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: color,
      border: `2px solid ${color}`,
      borderRadius: "16px",
      padding: "30px 20px",
      textAlign: "center",
      color: color === "#b7ff05" ? "black" : "white",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      textDecoration: "none",
      boxShadow: `0 10px 20px ${color}30`,
      flex: "0 0 320px",
      maxWidth: "100%",
      boxSizing: "border-box",
    }}
    onMouseEnter={(e) =>
      (e.currentTarget.style.transform = "translateY(-10px)")
    }
    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
  >
    <Icon size={40} style={{ marginBottom: "15px" }} />
    <h2 style={{ fontSize: "1.4rem", marginBottom: "10px", fontWeight: "800" }}>
      {title}
    </h2>
    <p style={{ fontSize: "0.95rem", fontWeight: "500", opacity: 0.9 }}>
      {description}
    </p>
  </Link>
);

const Home = () => {
  const phone = "+905418142732";
  const email = "fitmutantarda@gmail.com";
  const instagram = "fit.mutant";

  return (
    <div
      style={{
        backgroundColor: "var(--bg-body)",
        color: "var(--text-main)",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* HERO SECTION */}
      <section
        style={{
          position: "relative",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: "#000",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
            zIndex: 2,
          }}
        />
        <div style={{ position: "relative", zIndex: 3, padding: "0 20px" }}>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
              fontWeight: "900",
              color: "white",
              lineHeight: "1",
              marginBottom: "20px",
            }}
          >
            HAYALİNDEKİ VÜCUT <br />{" "}
            <span style={{ color: "#b7ff05" }}>MUTANT</span> MODUNDA
          </h1>
          <button
            onClick={() =>
              document
                .getElementById("categories")
                .scrollIntoView({ behavior: "smooth" })
            }
            style={{
              padding: "18px 45px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              backgroundColor: "#ff5757",
              color: "white",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              boxShadow: "0 10px 25px rgba(255, 87, 87, 0.4)",
            }}
          >
            PROGRAMINI SEÇ
          </button>
        </div>
      </section>

      {/* BEN KİMİM & KÜNYE SECTION */}
      <section
        style={{ padding: "80px 20px", maxWidth: "1000px", margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "900",
              marginBottom: "20px",
            }}
          >
            BEN KİMİM?
          </h2>
          <div style={{ fontSize: "1.15rem", lineHeight: "1.8", opacity: 0.9 }}>
            <p style={{ marginBottom: "15px" }}>
              Merhaba, ben{" "}
              <strong
                style={{
                  color: "#b7ff05",
                  backgroundColor: "#000",
                  padding: "2px 8px",
                  borderRadius: "4px",
                }}
              >
                Arda Pekcan
              </strong>
              .
            </p>
            <p>
              Girişimci ve <strong>Wellness Coach</strong> olarak; İzmir,
              Antalya, İstanbul ve Ankara başta olmak üzere tüm Türkiye'ye
              dijital içerik üreticisi ve spor danışmanı olarak hizmet
              vermekteyim. "Fit Mutant" felsefesiyle amacım, sadece fiziksel
              değişim değil, sürdürülebilir bir yaşam disiplini oluşturmanıza
              rehberlik etmektir.
            </p>
          </div>
        </div>

        {/* Künye Bilgi Kartları */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              flex: "1 1 280px",
              padding: "20px",
              borderRadius: "15px",
              border: "1px solid var(--border-col)",
              textAlign: "center",
            }}
          >
            <FaMapMarkerAlt
              size={25}
              color="#ff5757"
              style={{ marginBottom: "10px" }}
            />
            <h4 style={{ marginBottom: "5px" }}>Merkez Ofis</h4>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              Fahrettin Altay Mah. 65/17 Sokak No:3/A, İzmir
            </p>
          </div>
          <div
            style={{
              flex: "1 1 280px",
              padding: "20px",
              borderRadius: "15px",
              border: "1px solid var(--border-col)",
              textAlign: "center",
            }}
          >
            <FaRunning
              size={25}
              color="#b7ff05"
              style={{ marginBottom: "10px" }}
            />
            <h4 style={{ marginBottom: "5px" }}>Hizmet Bölgeleri</h4>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              İzmir • Antalya • İstanbul • Ankara
            </p>
          </div>
        </div>
      </section>

      {/* KATEGORİLER SECTION */}
      <section
        id="categories"
        style={{ padding: "40px 20px", backgroundColor: "rgba(0,0,0,0.02)" }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "25px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <CategoryButton
            to="/weight-loss"
            color="var(--theme-magenta)"
            title="KİLO VERME"
            icon={FaRunning}
            description="Yağ yakımı ve sıkılaşma."
          />
          <CategoryButton
            to="/weight-gain"
            color="var(--theme-orange)"
            title="KİLO ALMA"
            icon={FaDumbbell}
            description="Hacim ve kütle artışı."
          />
          <CategoryButton
            to="/sports-nutrition"
            color="var(--theme-green)"
            title="SPORCU BESLENMESİ"
            icon={FaBolt}
            description="Performans ve recovery."
          />
        </div>
      </section>

      {/* SOSYAL MEDYA & İLETİŞİM */}
      <section style={{ padding: "80px 20px", textAlign: "center" }}>
        <h3
          style={{ fontSize: "2rem", fontWeight: "900", marginBottom: "40px" }}
        >
          BANA ULAŞIN
        </h3>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {[
            {
              icon: FaInstagram,
              color: "#E1306C",
              link: `https://www.instagram.com/${instagram}/`,
              label: "Instagram",
            },
            {
              icon: FaWhatsapp,
              color: "#25D366",
              link: `https://wa.me/${phone.replace("+", "")}`,
              label: "WhatsApp",
            },
            {
              icon: FaEnvelope,
              color: "#34495e",
              link: `mailto:${email}`,
              label: "Email",
            },
            { icon: FaPhoneAlt, color: "#2c3e50", link: `tel:${phone}`, label: "Telefon" },
          ].map((item, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.preventDefault();
                const confirmed = window.confirm(
                  `${item.label} ile iletişime geçmek istiyor musunuz?`
                );
                if (confirmed) {
                  if (item.link.startsWith("tel:") || item.link.startsWith("mailto:")) {
                    window.location.href = item.link;
                  } else {
                    window.open(item.link, "_blank");
                  }
                }
              }}
              style={{
                width: "65px",
                height: "65px",
                borderRadius: "50%",
                backgroundColor: item.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "1.6rem",
                transition: "all 0.3s ease",
                boxShadow: `0 8px 15px ${item.color}40`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.15) rotate(10deg)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1) rotate(0deg)")
              }
            >
              <item.icon />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
