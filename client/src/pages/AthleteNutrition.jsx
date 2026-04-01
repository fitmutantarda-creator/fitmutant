import React, { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import Header from "../components/Header";
import ListItemCard from "../components/ListItemCard";
import BottomNavigation from "../components/BottomNavigation";
import {
  MdArrowBackIosNew,
  MdBolt,
  MdSpeed,
  MdAdd,
  MdScience,
  MdRestaurantMenu,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AthleteNutrition = () => {
  const [activeTab, setActiveTab] = useState("Pre-Workout");
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased selection:bg-primary/30 min-h-screen pb-24 transition-colors">
      {/* Mobile Container (Simulating Phone Form Factor) - Removing constraint for full page */}
      {/* Header Section */}
      <Header title="Performans ve Fonksiyonellik" showBack={true} />

      {/* Main Content */}
      <main className="px-6 py-6 space-y-8">
        {/* Hero Scientific Banner */}
        <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-primary/20 shadow-md dark:shadow-none">
          <img
            alt="Performance Nutrition"
            className="w-full h-full object-cover brightness-75 dark:brightness-50"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFdRmVTdgCEhwQu95dqyB6aKuCRVBblPO_FjC-N_Ch52pa5SVAoocgwbqDnuGa0Rx5Vw598jwZqj-4RAC6LWa8Y_qpqjoFUXxUte9NJTTOlhdRwD6av2YrG6ZrGOpen8qJkt-YTvlEsv331iToDhCC2DOUvflLrQesEFOLUfVpIQpVibDRrvwlvGzOVhjWy_Estk6qD27pv2ZWmMgoMitFBpwG8C3awU8qDkLbVGcbw2l917KtdvxEtLG4We56lp1_t8E1aXRH0iEW"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent dark:from-background-dark dark:via-transparent dark:to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary text-background-dark font-bold uppercase tracking-tighter">
                Pro Elite
              </span>
            </div>
            <p className="text-sm text-slate-100 dark:text-slate-300">
              Gelişmiş toparlanma ve maksimum güç için bilimsel veri temelli
              makro planlaması.
            </p>
          </div>
        </div>

        {/* Adherence Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Hedef Uyum
              </span>
              <MdBolt className="text-primary text-lg" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              94<span className="text-sm font-normal text-slate-500">%</span>
            </div>
            <div className="w-full h-1.5 bg-primary/20 rounded-full mt-2">
              <div className="w-[94%] h-full bg-primary rounded-full"></div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Metabolizma
              </span>
              <MdSpeed className="text-primary text-lg" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              2.8k
              <span className="text-sm font-normal text-slate-500"> kcal</span>
            </div>
            <div className="text-[10px] text-primary mt-2">
              +120 kcal yakım hızı
            </div>
          </div>
        </div>

        {/* Segmented Control Tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1 rounded-lg border border-slate-200 dark:border-primary/5 overflow-x-auto no-scrollbar">
          {["Pre-Workout", "Intra", "Post-Workout", "Recovery"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-3 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${activeTab === tab ? "bg-primary text-background-dark shadow-sm" : "text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-white/5"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Timing Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <SectionHeader title="Antrenman Öncesi (Timing)" className="mb-0" />
            <span className="text-xs text-primary underline cursor-pointer">
              Scientific Whitepaper
            </span>
          </div>

          {/* Macro Split */}
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  İdeal Makro Dağılımı
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  Glikojen Deposu: %85 Dolu
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500 dark:text-slate-400">
                      Karbonhidrat (Kompleks)
                    </span>
                    <span className="font-bold text-primary">60%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[60%] h-full bg-primary"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500 dark:text-slate-400">
                      Protein (İzole/Hızlı)
                    </span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      30%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[30%] h-full bg-slate-400"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500 dark:text-slate-400">
                      Yağ (MCT/Hafif)
                    </span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      10%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[10%] h-full bg-slate-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coach Insight */}
        <div className="bg-primary/10 border-l-4 border-primary p-5 rounded-r-xl">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-primary/30">
              <img
                alt="Coach"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9FOy4Q0eY5HlpmEGrnoemFNRo2m1f7EO_ybC10KR_X3beM53faJNtwKXu6cazFYnWjpSn7lKrpBmNI-bs-8Pmn2vP1DzlhIFnqzjxhtxyFoHgjuy6SIIrRwyLWfuKIYXXeqYJ9eJJ7OJg-4GrdYiVm9EvnnQDcNJGY2qSoml_EvdFAWfDHC8zQ1Kga244p1V-DNkWd3Pzp3Nv0ISRqtNG1Tod0pprgleazQm1mDIjEjwG-BN0Jncvpzu7FzoNZ_JqQQc9F6xiHpaT"
              />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-primary">
                Coach Mutant Diyor ki:
              </h4>
              <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                Antrenmandan 90-120 dk önce düşük glisemik indeksli karbonhidrat
                tüketmek, insülin dalgalanmasını önler ve sürdürülebilir enerji
                sağlar.
              </p>
            </div>
          </div>
        </div>

        {/* Recommended Meals List */}
        <div className="space-y-4">
          <h3 className="text-md font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Önerilen Öğünler
          </h3>
          <div className="space-y-3">
            <ListItemCard
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuBVCWNiMzvnaXObZiEX8QWn6YGRuJHtcx9sA6_WgzihjbRawpYmCOrDJTcKVCWmzWRNPL1OGnqiPkJn-5aoS-9W_US-8sySuxQYuu12OWfv0hfiQvoS_N5_7iRGGsGIIWPjmaXP99gPiczSX8jrQLu0_6DphT9m86xN5yFKiWu1riQg-nOFzodWPKPr-XVfp5WpGOLyUovgFd-zZ6AjbR3wypPG6YHHOqhoqGWWHfV0FcjrQ6OpNIOl2aIg4k5_gJ3akplxaE5OfJAA"
              title="Proteinli Yulaf Kasesi"
              subtitle="450 kcal • 32g Protein • 55g Carb"
              actionIcon="add"
              className="bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800"
            />
            <ListItemCard
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuARs7qfl7IkAThTqbK9dMQJEbR5z__v09sQKn4PF5Qq_WQhfEGD-d_CgHDFn8n1_JbvGy77qQekHNKC9aZ3LAFmkQdAGgMSSRuR1wFb2q0E8NX9EBeeziuNSFofESgWMhUWNPTFT98ASsMvQHFMtlOg0NZ2yNMsFgCt9vUzd2fB2-ts0v5R82Dc3MxsEMNQcAYlHDBVweJ30xyxx26HMpuqwLUpmeE-pkHOKZyDGTZGvZAtg5ZVWBFwooEXLOpkr03T91xop9Ty-m5u"
              title="Tavuklu Kinoa Salatası"
              subtitle="380 kcal • 40g Protein • 28g Carb"
              actionIcon="add"
              className="bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800"
            />
          </div>
        </div>

        {/* Scientific Lab Info Section */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-primary/20 relative overflow-hidden text-white shadow-lg">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full"></div>
          <div className="relative z-10 flex flex-col items-center text-center space-y-3">
            <MdScience className="text-primary text-4xl" />
            <h3 className="font-bold text-white">Emilim Optimizasyonu</h3>
            <p className="text-xs text-slate-300">
              Sindirim hızı (gastric emptying) performansı doğrudan etkiler. Bu
              planda, antrenman sırasındaki sindirim stresi %40 minimize
              edilmiştir.
            </p>
            <button className="text-xs font-bold text-primary border border-primary/30 px-4 py-2 rounded-full hover:bg-primary/10 transition-colors">
              Detaylı Analizi Görüntüle
            </button>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Action Bar (iOS Style) */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-6 bg-gradient-to-t from-background-light/95 via-background-light/95 to-transparent dark:from-background-dark dark:via-background-dark/95 dark:to-transparent pointer-events-none pb-24 z-40">
        <button className="w-full pointer-events-auto bg-primary text-background-dark font-bold py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
          <MdRestaurantMenu className="text-xl" />
          GÜNLÜK PLANA EKLE
        </button>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default AthleteNutrition;
