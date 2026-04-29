import React, { useState, useEffect, useRef } from "react";
import AdminAuthModal from "../components/AdminAuthModal";
import CategoryButton from "../components/CategoryButton";
import Gallery from "../components/Gallery";
import ProgramCard from "../components/ProgramCard";
import AnnouncementBanner from "../components/AnnouncementBanner";
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
  FaFacebook,
} from "react-icons/fa";
import ConfirmModal from "../components/ConfirmModal";
import useModal from "../hooks/useModal";

const Home = () => {
  const { modalProps, showConfirm } = useModal();
  const phone = "+905418142732";
  const email = "fitmutantarda@gmail.com";
  const instagram = "fit.mutant";

  const programCards = [
    {
      title: "Kütle Yönetimi (Kilo Alma)",
      subtitle: "MUTANT BULK: HACİM VE GÜÇ",
      points: [
        "Kişisel Makro Stratejisi: Vücut tipine özel, temiz kütle artışı sağlayan kalori planlaması.",
        "Hipertrofi Odaklı Beslenme: Maksimum kas gelişimi için protein ve karbonhidrat optimizasyonu.",
        "Supplement Rehberliği: Gelişimini hızlandıracak, gereksiz harcamadan kaçınan takviye planı.",
        "Haftalık Form Analizi: Arda Pekcan ile gelişim takibi ve anlık plan güncellemeleri.",
      ],
      color: "var(--theme-orange)",
      whatsappText: "Merhaba, MUTANT BULK programı hakkında bilgi almak istiyorum.",
      buttonText: "ŞİMDİ HACİM KAZAN",
    },
    {
      title: "Definasyon (Kilo Verme)",
      subtitle: "SHREDDED MODE: KESKİN HATLAR",
      points: [
        "Metabolik Ateşleme: Kas kaybını önleyen, yağ yakımını maksimize eden düşük kalorili özel diyet.",
        "Açlık Yönetimi & Disiplin: Sürdürülebilir, doyurucu ve enerji seviyeni düşürmeyen öğünler.",
        "Kardiyo ve Hareket Protokolü: Yağ yakımını destekleyen günlük aktivite ve antrenman rehberi.",
        "Motivasyon & Takip: Duygusal yeme krizlerine karşı Arda Pekcan ile bire bir destek.",
      ],
      color: "var(--theme-magenta)",
      whatsappText: "Merhaba, SHREDDED MODE programı hakkında bilgi almak istiyorum.",
      buttonText: "YAĞ YAKMAYA BAŞLA",
    },
    {
      title: "Performans (Sporcu Beslenmesi)",
      subtitle: "ELITE PERFORMANCE: PROFESYONEL DESTEK",
      points: [
        "Antrenman Odaklı Yakıt: Yoğun idmanlarda enerjini zirvede tutacak dinamik beslenme programı.",
        "Hızlı Recovery (Toparlanma): Kas onarımını hızlandıran, bir sonraki idmana seni hazır tutan stratejiler.",
        "Mikro Besin Optimizasyonu: Vitamin, mineral ve hormon sağlığı için detaylı içerik analizi.",
        "Profesyonel İzleme: Performans verilerinin analizi ve elit seviye gelişim raporlaması.",
      ],
      color: "var(--theme-green)",
      whatsappText: "Merhaba, ELITE PERFORMANCE programı hakkında bilgi almak istiyorum.",
      buttonText: "POTANSİYELİNİ SERBEST BIRAK",
    },
  ];

  // Easter Egg Authentication State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef(null);

  // Handle Easter Egg Name Clicks
  const handleAdminAuthClick = () => {
    setClickCount((prev) => prev + 1);

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    clickTimeoutRef.current = setTimeout(() => {
      setClickCount(0); // Reset after 2 seconds
    }, 2000);
  };

  useEffect(() => {
    if (clickCount >= 6) {
      setShowAuthModal(true);
      setClickCount(0);
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    }
  }, [clickCount]);

  return (
    <div
      style={{
        backgroundColor: "var(--bg-body)",
        color: "var(--text-main)",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <AnnouncementBanner />
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
          <img
            src="/benkimim.png"
            alt="Arda Pekcan"
            style={{
              width: "180px",
              maxWidth: "100%",
              borderRadius: "50%",
              display: "block",
              margin: "0 auto 24px",
            }}
          />
          <div style={{ fontSize: "1.15rem", lineHeight: "1.8", opacity: 0.9 }}>
            <p style={{ marginBottom: "15px" }}>
              Merhaba, ben{" "}
              <strong
                onClick={handleAdminAuthClick}
                style={{
                  color: "#b7ff05",
                  backgroundColor: "#000",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  cursor: "default",
                  userSelect: "none",
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
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "48px",
                height: "48px",
                margin: "0 auto 12px",
              }}
            >
              <FaMapMarkerAlt size={25} color="#ff5757" />
            </div>
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
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "48px",
                height: "48px",
                margin: "0 auto 12px",
              }}
            >
              <FaRunning size={25} color="#b7ff05" />
            </div>
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
            gap: "30px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <CategoryButton
            to="/weight-loss"
            color="var(--theme-magenta)"
            title="KİLO VERME"
            imgSrc="/kiloverme.png"
            description="Yağ yakımı ve sıkılaşma."
          />
          <CategoryButton
            to="/weight-gain"
            color="var(--theme-orange)"
            title="KİLO ALMA"
            imgSrc="/kiloalma.png"
            description="Hacim ve kütle artışı."
          />
          <CategoryButton
            to="/sports-nutrition"
            color="var(--theme-green)"
            title="SPORCU BESLENMESİ"
            imgSrc="/sporcubeslenmesi.png"
            description="Performans ve recovery."
          />
        </div>
      </section>
      <AnnouncementBanner />
      {/* PROGRAMLAR SECTION */}
      <section style={{ padding: "40px 20px", backgroundColor: "var(--bg-body)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 900, margin: 0 }}>
              Programlar
            </h2>
            <p style={{ marginTop: "12px", fontSize: "1rem", opacity: 0.85, maxWidth: "720px", marginLeft: "auto", marginRight: "auto" }}>
              Her program, hedefe yönelik destek ve danışmanlıkla birlikte hazırlanmıştır.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "24px",
            }}
          >
            {programCards.map((program, index) => (
              <ProgramCard
                key={index}
                title={program.title}
                subtitle={program.subtitle}
                points={program.points}
                color={program.color}
                whatsappNumber={phone.replace("+", "")}
                whatsappText={program.whatsappText}
                buttonText={program.buttonText}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FIT MUTANT GALERİ SECTION */}
      <section style={{ padding: "80px 20px", backgroundColor: "var(--bg-body)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* BAŞLIK VE AÇIKLAMA */}
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                marginBottom: "15px",
              }}
            >
              FIT MUTANT <span style={{ color: "#b7ff05" }}>Değişimin Kanıtı</span>
            </h2>
            <p
              style={{
                fontSize: "1rem",
                opacity: 0.8,
                lineHeight: "1.6",
                maxWidth: "600px",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "30px",
              }}
            >
              Sadece rakamlar değil, aynadaki gerçek fark. Disiplin ve doğru programla hayallerine ulaşanların yolculuğuna tanıklık edin.
            </p>
          </div>

          {/* GALERİ KOMPONENTİ */}
          <Gallery
            images={[
              "/before-after/WhatsApp Image 2026-04-29 at 15.38.27 (1).jpeg",
              "/before-after/WhatsApp Image 2026-04-29 at 15.38.27 (2).jpeg",
              "/before-after/WhatsApp Image 2026-04-29 at 15.38.27.jpeg",
              "/before-after/WhatsApp Image 2026-04-29 at 15.38.28 (1).jpeg",
              "/before-after/WhatsApp Image 2026-04-29 at 15.38.28.jpeg",
              "/before-after/WhatsApp Image 2026-04-29 at 15.38.29 (1).jpeg",
            ]}
          />

          {/* İNSTAGRAM BUTONU */}
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <button
              onClick={() => {
                window.open(`https://www.instagram.com/${instagram}/`, "_blank");
              }}
              style={{
                padding: "16px 40px",
                fontSize: "1rem",
                fontWeight: "bold",
                backgroundColor: "#b7ff05",
                color: "#000",
                border: "none",
                borderRadius: "50px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 25px rgba(183, 255, 5, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(183, 255, 5, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(183, 255, 5, 0.3)";
              }}
            >
              📱 İNSTAGRAM'DA TAKİP ET
            </button>
          </div>
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
              icon: FaFacebook,
              color: "#1877F2",
              link: "https://www.facebook.com/fit.mutantt",
              label: "Facebook",
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
              onClick={async (e) => {
                e.preventDefault();
                const ok = await showConfirm({
                  title: `${item.label} ile İletişim`,
                  message: `${item.label} ile iletişime geçmek istiyor musunuz?`,
                  confirmText: "Evet, Aç",
                });
                if (ok) {
                  if (item.link.startsWith("tel:") || item.link.startsWith("mailto:")) {
                    const a = document.createElement("a");
                    a.href = item.link;
                    a.click();
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

      <ConfirmModal {...modalProps} />

      {showAuthModal && (
        <AdminAuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

export default Home;