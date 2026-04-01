import React from "react";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";
import {
  MdBolt,
  MdNotificationsActive,
  MdCameraAlt,
  MdChat,
} from "react-icons/md";

const About = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white selection:bg-primary/30 min-h-screen pb-32 transition-colors">
      <Header title="Hakkımızda" showBack={true} />

      <main className="px-6 pt-6">
        {/* Title Section */}
        <div className="mb-6">
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">
            Premium Coaching
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Fit Mutant <br />
            <span className="text-primary">Nedir?</span>
          </h1>
        </div>

        {/* Hero Visual Element */}
        <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-8 group shadow-md dark:shadow-none">
          <img
            alt="Fit Mutant Philosophy"
            className="w-full h-full object-cover opacity-90 dark:opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvfzSjkxug9j3b4kyMj5j7oKL3Zs88hQjEw0hf-_8ud-bS5DYAUcySL-MiWGx8kQlMQjuJVS5ElJk4MGsOhvPAU4N_K_-iQq1Xl1Te8TtIOA3CXJYb41d16DQfz2umFJD0IKpaEG1aoTisi_L-AaCDJXi92UbxgzxrDX6Cjw54t-75LepfIGpzPG46SzOR8m2lTR5tyziGfF_qu-fHEnitS7BoNwfk2EowN_EBhA3Rlkz4WKkPyoVn7oXFRqwSV4l7tXto5tuTQcTb"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent dark:from-background-dark dark:via-transparent dark:to-transparent"></div>
          <div className="absolute bottom-4 left-4">
            <div className="bg-primary px-3 py-1 rounded-full text-[10px] font-bold text-background-dark uppercase">
              Limitlerini Zorla
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Disiplin ve Vizyon
              </h2>
            </div>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm">
              Fit Mutant, sadece bir spor uygulaması değil; genetik limitlerini
              zorlamak isteyenlerin buluştuğu elit bir topluluktur. Bizim için
              fitness, salonun kapısından çıktığınızda biten bir aktivite değil,
              bir yaşam biçimidir.
            </p>
          </section>

          <section className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
            <h3 className="text-primary font-bold mb-2">
              Genetik Mirasın Ötesi
            </h3>
            <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">
              Her birey farklıdır. "Mutant" felsefesi, size özel biyolojik
              yapınızı analiz ederek, size dayatılan standart programların
              ötesine geçmenizi sağlar. Kişiselleştirilmiş antrenman ve beslenme
              planlarımızla, potansiyelinizin zirvesine ulaşmanız için
              yanınızdayız.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Topluluk Gücü
              </h2>
            </div>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm">
              Fit Mutant ailesi, profesyonel koçlar ve kararlı sporculardan
              oluşur. Bilgi paylaşımı, motivasyon ve profesyonel destek
              ekosistemimizin temel taşlarıdır.
            </p>
          </section>
        </div>

        {/* Contact Section */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/5">
          <h2 className="text-center text-sm font-semibold text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-6">
            Bize Ulaşın
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Instagram */}
            <a
              href="#"
              className="flex flex-col items-center justify-center p-4 bg-white/50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center mb-2 text-white">
                <MdCameraAlt className="text-2xl" />
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-gray-300">
                Instagram
              </span>
            </a>
            {/* WhatsApp */}
            <a
              href="#"
              className="flex flex-col items-center justify-center p-4 bg-white/50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center mb-2 text-white">
                <MdChat className="text-2xl" />
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-gray-300">
                WhatsApp
              </span>
            </a>
          </div>
        </div>
      </main>

      {/* Sticky Footer Notification */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-slate-200 dark:border-white/5 z-40 pb-24">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-slate-900 dark:text-white text-xs font-bold tracking-wide uppercase">
                Resmi Satışlar Yakında
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-gray-500">
              Premium planlar ve mağaza açılışı için takipte kalın.
            </p>
          </div>
          <div className="bg-primary/20 px-3 py-2 rounded-lg">
            <MdNotificationsActive className="text-primary" />
          </div>
        </div>
        {/* iOS Home Indicator Space */}
        <div className="h-4"></div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default About;
