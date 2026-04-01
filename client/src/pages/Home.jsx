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

/**
 * CategoryButton Component
 * Displays category cards with icon, title, and description
 */
const CategoryButton = ({ to, title, Icon, description, bgColor, textColor }) => (
  <Link
    to={to}
    className={`group relative flex flex-col items-center justify-center gap-3 p-5 sm:p-7 rounded-xl sm:rounded-2xl no-underline transition-smooth transform hover:scale-105 hover:shadow-xl focus-within:ring-2 focus-within:ring-offset-2 ${bgColor} ${textColor}`}
  >
    <div className="flex-shrink-0 transform group-hover:scale-110 transition-transform">
      <Icon size={40} className="sm:size-50" />
    </div>
    <h3 className="text-lg sm:text-2xl font-black uppercase text-center tracking-wide">
      {title}
    </h3>
    <p className="text-sm sm:text-base font-medium opacity-90 text-center">
      {description}
    </p>
  </Link>
);

/**
 * Home Page Component
 * Main landing page with hero, about, categories, and contact sections
 */
const Home = () => {
  const contact = {
    phone: "+905418142732",
    email: "fitmutantarda@gmail.com",
    instagram: "fit.mutant",
  };

  const categories = [
    {
      id: "weight-loss",
      to: "/weight-loss",
      title: "Kilo Verme",
      Icon: FaRunning,
      description: "Yağ yakımı ve sıkılaşma.",
      bgColor: "bg-[#b7ff05]",
      textColor: "text-black",
    },
    {
      id: "weight-gain",
      to: "/weight-gain",
      title: "Kilo Alma",
      Icon: FaDumbbell,
      description: "Hacim ve kütle artışı.",
      bgColor: "bg-[#ff5757]",
      textColor: "text-white",
    },
    {
      id: "sports-nutrition",
      to: "/sports-nutrition",
      title: "Sporcu Beslenmesi",
      Icon: FaBolt,
      description: "Performans ve recovery.",
      bgColor: "bg-[#00ffe1]",
      textColor: "text-black",
    },
  ];

  const socialLinks = [
    {
      id: "instagram",
      icon: FaInstagram,
      label: "Instagram",
      color: "bg-[#e4405f]",
      shadow: "shadow-[#e4405f]/30",
      href: `https://www.instagram.com/${contact.instagram}/`,
      isExternal: true,
    },
    {
      id: "whatsapp",
      icon: FaWhatsapp,
      label: "WhatsApp",
      color: "bg-[#25d366]",
      shadow: "shadow-[#25d366]/30",
      href: `https://wa.me/${contact.phone.replace("+", "")}`,
      isExternal: true,
    },
    {
      id: "email",
      icon: FaEnvelope,
      label: "Email",
      color: "bg-[#d93026]",
      shadow: "shadow-[#d93026]/30",
      href: `mailto:${contact.email}`,
      isExternal: false,
    },
    {
      id: "phone",
      icon: FaPhoneAlt,
      label: "Telefon",
      color: "bg-[#00a8e1]",
      shadow: "shadow-[#00a8e1]/30",
      href: `tel:${contact.phone}`,
      isExternal: false,
    },
  ];

  const handleSocialClick = (label, href, isExternal) => {
    const confirmed = window.confirm(
      `${label} ile iletişime geçmek istiyor musunuz?`
    );
    if (confirmed) {
      if (isExternal) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = href;
      }
    }
  };

  const scrollToSection = () => {
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full bg-[var(--bg-body)] text-[var(--text-main)] overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50 sm:opacity-60"
          style={{ backgroundImage: `url(${heroImg})` }}
          role="img"
          aria-label="Hero background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
        <div className="relative z-20 px-4 sm:px-6 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight mb-6 sm:mb-8 uppercase tracking-tight">
            Hayalindeki Vücut <br />
            <span className="text-[#b7ff05] drop-shadow-lg">MUTANT</span> MODUNDA
          </h1>
          <button
            onClick={scrollToSection}
            className="px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-black bg-[#ff5757] text-white rounded-full shadow-lg shadow-[#ff5757]/50 hover:bg-[#e63e3e] active:scale-95 transition-smooth focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            aria-label="Programını seç"
          >
            Programını Seç
          </button>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-[var(--text-main)] uppercase tracking-wide">
            Ben Kimim?
          </h2>
          <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed text-[var(--text-muted)]">
            <p>
              Merhaba, ben{" "}
              <strong className="text-[#b7ff05] bg-[var(--bg-body)] px-3 py-1 rounded-lg inline-block font-black">
                Arda Pekcan
              </strong>
              .
            </p>
            <p>
              Girişimci ve <strong className="text-[var(--text-main)]">Wellness Coach</strong> olarak; İzmir,
              Antalya, İstanbul ve Ankara başta olmak üzere tüm Türkiye'ye
              dijital içerik üreticisi ve spor danışmanı olarak hizmet
              vermekteyim.
            </p>
            <p>
              "Fit Mutant" felsefesiyle amacım, sadece fiziksel değişim değil,
              sürdürülebilir bir yaşam disiplini oluşturmanıza rehberlik
              etmektir.
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-[var(--border-col)] bg-[var(--bg-card)] text-center hover:shadow-lg transition-smooth">
            <FaMapMarkerAlt
              size={32}
              className="text-[#ff5757] mb-4 mx-auto"
              aria-hidden="true"
            />
            <h3 className="text-lg sm:text-xl font-black text-[var(--text-main)] mb-2 uppercase">
              Merkez Ofis
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-muted)]">
              Fahrettin Altay Mah. 65/17 Sokak No:3/A, İzmir
            </p>
          </div>
          <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-[var(--border-col)] bg-[var(--bg-card)] text-center hover:shadow-lg transition-smooth">
            <FaRunning
              size={32}
              className="text-[#b7ff05] mb-4 mx-auto"
              aria-hidden="true"
            />
            <h3 className="text-lg sm:text-xl font-black text-[var(--text-main)] mb-2 uppercase">
              Hizmet Bölgeleri
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-muted)]">
              İzmir • Antalya • İstanbul • Ankara
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section
        id="categories"
        className="py-16 sm:py-24 px-4 sm:px-6 bg-[var(--bg-body)]/50"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-12 sm:mb-16 text-[var(--text-main)] uppercase tracking-wide">
            Programlar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((cat) => (
              <CategoryButton
                key={cat.id}
                to={cat.to}
                title={cat.title}
                Icon={cat.Icon}
                description={cat.description}
                bgColor={cat.bgColor}
                textColor={cat.textColor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-12 sm:mb-16 text-[var(--text-main)] uppercase tracking-wide">
            Bana Ulaşın
          </h2>

          <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
            {socialLinks.map(({ id, icon: Icon, label, color, shadow, href, isExternal }) => (
              <button
                key={id}
                onClick={() => handleSocialClick(label, href, isExternal)}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${color} flex items-center justify-center text-white shadow-lg ${shadow} hover:scale-110 active:scale-95 transition-smooth focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2`}
                title={label}
                aria-label={label}
              >
                <Icon size={24} className="sm:size-28" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;