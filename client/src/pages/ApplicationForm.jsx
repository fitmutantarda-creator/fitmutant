import React, { useState } from "react";
import Header from "../components/Header";
import {
  MdPerson,
  MdPhone,
  MdLocationOn,
  MdExpandMore,
  MdArrowForward,
} from "react-icons/md";

const ApplicationForm = () => {
  const packages = [
    {
      id: "1",
      months: "1",
      label: "Standart Başlangıç",
      price: "315",
      oldPrice: "450",
      recommended: false,
      bestValue: false,
    },
    {
      id: "3",
      months: "3",
      label: "Gelişim Paketi",
      price: "840",
      oldPrice: "1,200",
      recommended: true,
      bestValue: false,
    },
    {
      id: "6",
      months: "6",
      label: "Tam Değişim",
      price: "1,470",
      oldPrice: "",
      recommended: false,
      bestValue: true,
    },
  ];
  const [selectedPackage, setSelectedPackage] = useState("3");

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display pb-24 transition-colors">
      {/* Responsive Container */}
      <div className="max-w-7xl mx-auto min-h-screen relative flex flex-col">
        {/* Header & Logo */}
        <Header title="Başvuru Formu" showBack={true} />

        {/* Form Section */}
        <main className="px-6 pb-32 flex-grow">
          <form
            action="#"
            className="space-y-8 max-w-4xl mx-auto"
            method="POST"
          >
            {/* Package Selection */}
            <section>
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                Paket Seçimi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                  <label
                    key={pkg.id}
                    className="relative group cursor-pointer h-full"
                  >
                    <input
                      type="radio"
                      name="package"
                      value={pkg.id}
                      className="peer sr-only"
                      checked={selectedPackage === pkg.id}
                      onChange={() => setSelectedPackage(pkg.id)}
                    />
                    <div
                      className={`p-4 h-full flex flex-col justify-between rounded-2xl border-2 transition-all ${selectedPackage === pkg.id ? "border-primary bg-primary/10" : "border-slate-200 dark:border-white/5 bg-white dark:bg-white/5"}`}
                    >
                      {pkg.recommended && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-background-dark text-[10px] font-black px-3 py-1 rounded-full uppercase z-10">
                          Önerilen
                        </div>
                      )}
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-lg font-bold text-slate-900 dark:text-white">
                            {pkg.months} Aylık
                          </p>
                          {pkg.bestValue && (
                            <div className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded inline-block">
                              En İyi Değer
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                          {pkg.label}
                        </p>
                      </div>

                      <div className="text-right mt-auto">
                        {pkg.oldPrice && (
                          <p className="text-sm line-through text-slate-400 dark:text-slate-500">
                            ₺{pkg.oldPrice}
                          </p>
                        )}
                        <p className="text-xl font-extrabold text-primary">
                          ₺{pkg.price}
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            {/* Personal Info */}
            <section>
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                Kişisel Bilgiler
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <MdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl" />
                  <input
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-primary dark:focus:border-transparent focus:ring-2 focus:ring-primary rounded-xl py-4 pl-12 pr-4 text-sm outline-none transition-all placeholder:text-slate-500 dark:placeholder:text-slate-600 text-slate-900 dark:text-white"
                    placeholder="Ad Soyad"
                    type="text"
                  />
                </div>
                <div className="relative">
                  <MdPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl" />
                  <input
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-primary dark:focus:border-transparent focus:ring-2 focus:ring-primary rounded-xl py-4 pl-12 pr-4 text-sm outline-none transition-all placeholder:text-slate-500 dark:placeholder:text-slate-600 text-slate-900 dark:text-white"
                    placeholder="Telefon Numarası"
                    type="tel"
                  />
                </div>
                <div className="relative md:col-span-2">
                  <MdLocationOn className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl" />
                  <select className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-primary dark:focus:border-transparent focus:ring-2 focus:ring-primary rounded-xl py-4 pl-12 pr-4 text-sm outline-none transition-all appearance-none text-slate-500 dark:text-slate-300">
                    <option disabled defaultValue="">
                      Şehir Seçiniz
                    </option>
                    <option>Adana</option>
                    <option>Ankara</option>
                    <option>Antalya</option>
                    <option>Bursa</option>
                    <option>İstanbul</option>
                    <option>İzmir</option>
                    <option>...</option>
                  </select>
                  <MdExpandMore className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-xl" />
                </div>
              </div>
            </section>

            {/* Physical Metrics */}
            <section>
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                Fiziksel Durum
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-xs text-slate-500 font-medium ml-1">
                    Mevcut Kilo (kg)
                  </label>
                  <input
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-primary dark:focus:border-transparent focus:ring-2 focus:ring-primary rounded-xl py-4 px-4 text-center text-lg font-bold outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-700 text-slate-900 dark:text-white"
                    placeholder="00"
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-500 font-medium ml-1">
                    Hedef Kilo (kg)
                  </label>
                  <input
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-primary dark:focus:border-transparent focus:ring-2 focus:ring-primary rounded-xl py-4 px-4 text-center text-lg font-bold outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-700 text-slate-900 dark:text-white"
                    placeholder="00"
                    type="number"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-500 font-medium ml-1">
                  Sağlık Durumu / Sakatlık Bilgisi
                </label>
                <textarea
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-primary dark:focus:border-transparent focus:ring-2 focus:ring-primary rounded-xl p-4 text-sm outline-none transition-all placeholder:text-slate-500 dark:placeholder:text-slate-600 resize-none text-slate-900 dark:text-white"
                  placeholder="Herhangi bir sağlık sorununuz veya sakatlığınız varsa belirtin..."
                  rows="4"
                ></textarea>
              </div>
            </section>

            {/* Agreement */}
            <section className="flex items-start gap-3 px-1">
              <div className="flex items-center h-5">
                <input
                  className="w-5 h-5 rounded border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-primary focus:ring-primary transition-all accent-primary"
                  id="terms"
                  type="checkbox"
                />
              </div>
              <label
                className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed"
                htmlFor="terms"
              >
                Kullanım koşullarını ve kişisel verilerimin işlenmesine yönelik{" "}
                <span className="text-primary underline cursor-pointer">
                  aydınlatma metnini
                </span>{" "}
                okudum, onaylıyorum.
              </label>
            </section>
          </form>
        </main>

        {/* Sticky Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-light/95 via-background-light/95 to-transparent dark:from-background-dark dark:via-background-dark/95 dark:to-transparent pt-10 z-40 pb-28 md:pb-6 pointer-events-none">
          <div className="max-w-md mx-auto pointer-events-auto">
            <button className="w-full bg-primary text-background-dark font-extrabold py-5 rounded-2xl shadow-[0_0_20px_rgba(13,242,108,0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
              HEMEN BAŞVUR - FORMU GÖNDER
              <MdArrowForward className="group-hover:translate-x-1 transition-transform text-xl" />
            </button>
          </div>
        </div>

        {/* Decoration elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10 rounded-full"></div>
        <div className="absolute bottom-40 left-0 w-48 h-48 bg-primary/5 blur-[80px] -z-10 rounded-full"></div>
      </div>
    </div>
  );
};

export default ApplicationForm;
