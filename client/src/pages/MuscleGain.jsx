import React from "react";
import SectionHeader from "../components/SectionHeader";
import Header from "../components/Header";
import StickyBottomCTA from "../components/StickyBottomCTA";
import TransformationCard from "../components/TransformationCard";
import BottomNavigation from "../components/BottomNavigation";
import {
  MdChevronLeft,
  MdShare,
  MdRestaurant,
  MdFitnessCenter,
  MdScience,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MuscleGain = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 antialiased min-h-screen pb-32 transition-colors">
      {/* iOS Status Bar Placeholder */}
      <div className="h-11 w-full bg-background-light dark:bg-background-dark sticky top-0 z-50"></div>

      {/* Sticky Header */}
      {/* Sticky Header */}
      <Header title="Fit Mutant" showBack={true} />

      <main>
        {/* Hero Section */}
        <section className="relative h-[420px] w-full overflow-hidden">
          <img
            alt="Professional bodybuilder training"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOz3onTVP7y72V4O83eP2APorC1HMhmxoELwLQDUcSuxjJddj4t9TQYGup_itdjoUI4FsxB0T9Hyb9qfRCz-WjMf4kTU7ad60f9sFJFfCaI8VyX0RzJ3E26FMQBz8jNaPI7uLaGH9ZWBsHpjdSuOs1MnSfJEpDApAAOg2-Z3VdSTN9zIYKugJ3oEzvzLC8_Za7SAXZD4uhXUJmdqACtnj0voQGVgAq21yiCag4y9UtSqKoNAX9dXTwGgg9yVf5nEzO89K7P_vCF20w"
          />
          <div className="absolute inset-0 hero-gradient bg-gradient-to-t from-background-light via-background-light/40 to-transparent dark:from-background-dark dark:via-background-dark/40 dark:to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <div className="inline-block px-3 py-1 rounded-full bg-primary text-background-dark text-[10px] font-extrabold uppercase mb-3">
              Kilo Alma & Hacim
            </div>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 dark:text-white mb-2">
              Güçlü Bir Fizik İçin{" "}
              <span className="text-primary">Kas Kütleni Artır</span>
            </h1>
            <p className="text-slate-700 dark:text-slate-300 text-sm max-w-xs">
              Ectomorph (Hardgainer) genetiğine özel, bilimsel temelli büyüme
              stratejileri.
            </p>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-3 gap-4 px-6 -mt-8 relative z-10">
          <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 dark:border-white/10 flex flex-col items-center shadow-lg dark:shadow-none">
            <span className="text-primary font-bold text-lg">12</span>
            <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400">
              Hafta
            </span>
          </div>
          <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 dark:border-white/10 flex flex-col items-center shadow-lg dark:shadow-none">
            <span className="text-primary font-bold text-lg">5+</span>
            <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400">
              Gün/Hafta
            </span>
          </div>
          <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 dark:border-white/10 flex flex-col items-center shadow-lg dark:shadow-none">
            <span className="text-primary font-bold text-lg">Zor</span>
            <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400">
              Seviye
            </span>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="px-6 mt-10">
          <SectionHeader title="Program Stratejisi" />
          <div className="space-y-4">
            {/* Clean Bulking */}
            <div className="group p-5 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5 hover:border-primary/30 transition-all shadow-sm dark:shadow-none">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <MdRestaurant className="text-primary text-3xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                    Clean Bulking
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Yağlanmadan kas kütlesi kazanmak için optimize edilmiş
                    yüksek kalorili beslenme planı. Makro dengen her hafta
                    güncellenir.
                  </p>
                </div>
              </div>
            </div>
            {/* Hypertrophy Training */}
            <div className="group p-5 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5 hover:border-primary/30 transition-all shadow-sm dark:shadow-none">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <MdFitnessCenter className="text-primary text-3xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                    Hipertrofi Odaklı Antrenman
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Kas liflerini maksimum düzeyde uyarmak için tasarlanmış
                    progresif yükleme (progressive overload) sistemi.
                  </p>
                </div>
              </div>
            </div>
            {/* Supplement Consultancy */}
            <div className="group p-5 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5 hover:border-primary/30 transition-all shadow-sm dark:shadow-none">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <MdScience className="text-primary text-3xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                    Supplement Danışmanlığı
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Creatine, Whey Protein ve Gainer gibi desteklerin en verimli
                    kullanım zamanlamaları ve dozajları.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coach Card */}
        <section className="px-6 mt-10">
          <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-2xl border border-primary/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <img
                  alt="Professional Fitness Coach"
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrcoDJI28hc7reYD1BPTc_1VG0q0wO9asLD-ELfwKgroMTGBEdqYBB0pwAo0S1fqLso-AqYhZiGWUrSygvvepsm5e447xVV9GBcj7NGanvrITnESJkcgGOlYg4tOmaYrhcOG0d3KDu_cYuBjZJZrKy6t4YERpnLTh4zai3enCwGVBLh5Ps0wzs70MxK57iuNTlOAtKpqbnNrsFH_alw8NuhBBjVUefgwYxDYvykrMRzWqgVCTOYCBpHfoLSBw7UMFr7i8pDiXWER5S"
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-primary rounded-full border-2 border-background-light dark:border-background-dark"></div>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-lg">
                  Koç Kerem Mutant
                </h4>
                <p className="text-primary text-xs font-medium uppercase">
                  Kıdemli Hipertrofi Uzmanı
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 italic">
              "Genetik sınırlarını zorlamak için sadece çok çalışmak yetmez,
              akıllıca beslenmek ve planlı dinlenmek zorundasın. Bu yolda
              beraberiz."
            </p>
          </div>
        </section>

        {/* Nutrition Preview */}
        <section className="px-6 mt-10">
          <SectionHeader title="Beslenme Örneği" />
          <div className="relative rounded-2xl overflow-hidden group shadow-md dark:shadow-none">
            <img
              alt="High calorie clean meal"
              className="w-full h-48 object-cover opacity-90 dark:opacity-60 group-hover:scale-105 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSuhQb1RDgquq6jp4kQKRHWSeGy0qqSkLugbw6OqjcXqOYeX3F-63qkN0cypcJLW16uyFoYBFySRexQGAP0rz9EdTsl2VJK4cacRYXuNdng7_pEG9-S4Znug8auKnJHWn2syQiMTY6_NIO9kyuHjdonYB5_3ciwccYaqYbolutw6OTMSXO4qbFK9rGGPB76K4wD5QdabMR-YhjK1E8tWBI_Mga2as_HqszE-w6H7YAcyfq9Fn5E8x-MOJJ3tMi95UgA7M7LWQ7J0W3"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent dark:from-background-dark dark:via-background-dark/20 dark:to-transparent p-6 flex flex-col justify-end">
              <div className="flex justify-between items-end">
                <div>
                  <h5 className="font-bold text-white uppercase text-xs tracking-widest mb-1">
                    MUTANT ÖĞÜN #04
                  </h5>
                  <p className="text-lg font-bold text-white">
                    Biftek & Kompleks Karbonhidrat
                  </p>
                </div>
                <div className="text-right">
                  <span className="block text-primary font-bold">850 kcal</span>
                  <span className="text-[10px] text-slate-300 font-bold">
                    45g Protein
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transformation */}
        <section className="px-6 mt-10">
          <SectionHeader title="Mutant Başarıları" />
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
            <TransformationCard
              beforeImage="https://lh3.googleusercontent.com/aida-public/AB6AXuAAKaGG5q3RrKcwgmTysuxGquI_tgO6qOAd8KtrKEel2CjhuUqihrAhODzbZ5dWSFiwJVCk39EUarHf3FsmGqSKIA6A4bVcl2IjAKxkNrC1NAeIxQN61v3VmqyJAsh2FwlyNevgBzIxmP34kCIw7PkfNQ77zmlPz0pipHmYg2sJaU7LU8RUhOiSgfmaqzAtWw3aFGsAvwQb57o7cxS6zIBXoUdfpqbeeyGPPM_BkB93NMvDrKXdw4NySDpRxTTwA6xMYlj54NLIfFPd"
              afterImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDSxJmubGVM2cC5Xu_d-FagYGviVcR7RWDSDZ1S2i-Yl5U7RwAFl9ZUip4QJcqWYojnqjMjd_6-XxgTua5yso99N0tmTiyrlFoiQGuliLkC11_TLPrVr01Yx5Yz36dLJcxUtM2XjkzxDhnCRABQHgzlENFZdBW6LSMsIP7a_Uz_Z9A-NfGj48t-uG0TB0zedKyz2uMsvs0pLJVKy1F827kf3TlZPMz4lREfuRKzUowhDit3JqzE-j0l3I92tw609jCI_IB7Wr4V7SFo"
              name="Emre K."
              duration="12 Haftalık Değişim"
              result="+9.2 KG KAS KÜTLESİ"
              resultLabel=""
            />
          </div>
        </section>
      </main>

      <StickyBottomCTA
        subPriceText="Aylık Ücret"
        price="499.00₺"
        buttonText="PROGRAMA KATIL"
        onButtonClick={() => {}}
      />
      <BottomNavigation />
    </div>
  );
};

export default MuscleGain;
