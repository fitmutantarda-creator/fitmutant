import React, { useState, useEffect } from "react";
import {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
} from "../services/packageService";

const AdminPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    originalPrice: "",
    category: "Kilo Alma",
    features: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getPackages();
      setPackages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      features: formData.features
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f !== ""),
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
    };

    try {
      if (editingId) {
        await updatePackage(editingId, payload);
      } else {
        await createPackage(payload);
      }
      resetForm();
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (pkg) => {
    setFormData({
      title: pkg.title,
      price: pkg.price,
      originalPrice: pkg.originalPrice,
      category: pkg.category,
      features: pkg.features.join(", "),
      image: pkg.image || "",
    });
    setEditingId(pkg._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Silmek istediğinize emin misiniz?")) {
      try {
        await deletePackage(id);
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      originalPrice: "",
      category: "Kilo Alma",
      features: "",
      image: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen pb-20 bg-[var(--bg-body)]">
      <main className="px-4 py-8 space-y-10 max-w-7xl mx-auto flex flex-col items-center">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 px-2">
          <h1 className="text-2xl font-bold text-[var(--text-main)] uppercase tracking-widest font-heading text-center sm:text-left">
            Yönetim Paneli
          </h1>
          <span className="bg-[var(--bg-card)] border border-[var(--border-col)] text-[var(--text-muted)] px-4 py-1.5 rounded-full text-xs font-bold uppercase shadow-sm">
            {packages.length} Kayıtlı Paket
          </span>
        </div>
        {(showForm || packages.length === 0) && (
          <section
            className="bg-[var(--bg-card)] border border-[var(--border-col)] rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500 w-full max-w-4xl mx-auto"
            style={{
              padding: "clamp(1rem, 4vw, 2.5rem)", // Dış boşluğu mobilde azalttık
              marginBottom: "1.5rem",
            }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 border-b border-[var(--border-col)]/30 pb-4">
              <div className="text-left">
                <h2 className="text-xl md:text-2xl font-bold text-[var(--text-main)] uppercase font-heading">
                  {editingId ? "Paket Güncelle" : "Yeni Paket"}
                </h2>
                <p className="text-[10px] md:text-xs text-[var(--text-muted)] mt-1 font-medium uppercase tracking-wider">
                  {editingId ? "Düzenleme modu aktif" : "Tüm alanları doldurun"}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {" "}
              {/* Mobilde aralar daha dar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5 text-left w-full">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] ml-1">
                    Paket Adı
                  </label>
                  <input
                    required
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    style={{ padding: "12px 16px" }} // Mobilde daha ince (16px -> 12px)
                    className="w-full bg-[var(--bg-body)] rounded-xl border border-[var(--border-col)] text-[var(--text-main)] outline-none focus:border-[var(--theme-orange)]"
                  />
                </div>
                <div className="space-y-1.5 text-left w-full">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] ml-1">
                    Kategori
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    style={{ padding: "12px 16px" }}
                    className="w-full bg-[var(--bg-body)] rounded-xl border border-[var(--border-col)] text-[var(--text-main)] outline-none appearance-none"
                  >
                    <option value="Kilo Verme">Kilo Verme</option>
                    <option value="Kilo Alma">Kilo Alma</option>
                    <option value="Sporcu Beslenmesi">Sporcu Beslenmesi</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
                {" "}
                {/* Mobilde yan yana gelmesi için grid-cols-2 yaptık */}
                <div className="space-y-1.5 text-left w-full">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] ml-1">
                    Eski Fiyat
                  </label>
                  <input
                    required
                    name="originalPrice"
                    type="number"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    style={{ padding: "12px 16px" }}
                    className="w-full bg-[var(--bg-body)] rounded-xl border border-[var(--border-col)] text-[var(--text-main)]"
                  />
                </div>
                <div className="space-y-1.5 text-left w-full">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] ml-1">
                    Yeni Fiyat
                  </label>
                  <input
                    required
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    style={{ padding: "12px 16px" }}
                    className="w-full bg-[var(--bg-body)] rounded-xl border border-[var(--border-col)] text-[var(--theme-orange)] font-bold"
                  />
                </div>
              </div>
              <div className="space-y-1.5 text-left w-full">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] ml-1">
                  Özellikler
                </label>
                <textarea
                  required
                  name="features"
                  rows="3" // Satır sayısını 4'ten 3'e indirdik
                  value={formData.features}
                  onChange={handleInputChange}
                  style={{ padding: "12px 16px" }}
                  className="w-full bg-[var(--bg-body)] rounded-xl border border-[var(--border-col)] text-[var(--text-main)] outline-none resize-none"
                ></textarea>
              </div>
              <div className="flex flex-row gap-3 pt-2">
                {" "}
                {/* Mobilde zorla yan yana tutmak için flex-row */}
                {editingId && (
                  <button
                    onClick={resetForm}
                    type="button"
                    style={{
                      padding: "14px 16px", // Buton yüksekliğini mobilde azalttık
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      lineHeight: "1",
                    }}
                    className="flex-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-[10px] font-black tracking-widest uppercase"
                  >
                    <span>✕ VAZGEÇ</span>
                  </button>
                )}
                <button
                  type="submit"
                  style={{
                    padding: "14px 16px",
                    lineHeight: "1",
                  }}
                  className="flex-[2] bg-[var(--theme-orange)] text-black font-black rounded-xl shadow-lg uppercase tracking-widest text-[10px] active:scale-95"
                >
                  {editingId ? "KAYDET" : "EKLE"}
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="w-full flex justify-center px-4">
          {" "}
          {/* Section'ı flex yaparak içindekini ortaladık */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl justify-center">
            {!loading &&
              packages.map((pkg) => {
                const colorMap = {
                  "Kilo Verme": "var(--theme-magenta)",
                  "Kilo Alma": "var(--theme-orange)",
                  "Sporcu Beslenmesi": "var(--theme-green)",
                };
                const themeColor =
                  colorMap[pkg.category] || "var(--theme-orange)";

                return (
                  <div
                    key={pkg._id}
                    className="bg-[var(--bg-card)] rounded-[2.5rem] border-x border-b border-[var(--border-col)] border-t-[6px] flex flex-col shadow-lg transition-all duration-500 w-full max-w-sm md:max-w-none mx-auto relative overflow-hidden"
                    style={{ borderTopColor: themeColor, padding: "2.5rem" }}
                  >
                    <div className="flex justify-between items-start mb-8">
                      <span
                        className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${themeColor} 12%, transparent)`,
                          color: themeColor,
                          borderColor: `color-mix(in srgb, ${themeColor} 25%, transparent)`,
                        }}
                      >
                        {pkg.category}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(pkg)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--bg-body)] border border-[var(--border-col)] text-[var(--text-muted)] hover:text-[var(--theme-orange)] transition-all"
                        >
                          <span>✎</span>
                        </button>
                        <button
                          onClick={() => handleDelete(pkg._id)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-500"
                        >
                          <span>✕</span>
                        </button>
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-[var(--text-main)] mb-3 uppercase leading-tight tracking-tight">
                      {pkg.title}
                    </h3>

                    <div className="flex items-baseline gap-3 mb-8">
                      <span
                        className="text-3xl font-black tracking-tighter"
                        style={{ color: themeColor }}
                      >
                        {pkg.price} ₺
                      </span>
                      <span className="text-sm text-[var(--text-muted)] line-through opacity-40 font-bold">
                        {pkg.originalPrice} ₺
                      </span>
                    </div>

                    <div className="mt-auto pt-8 border-t border-[var(--border-col)]/40">
                      <ul className="space-y-4">
                        {pkg.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-4 text-[15px] text-[var(--text-main)] font-medium"
                          >
                            <span
                              className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5"
                              style={{ backgroundColor: themeColor }}
                            ></span>
                            <span className="leading-snug text-left">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      </main>

      {!showForm && (
        <button
          onClick={() => {
            setShowForm(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="fixed bottom-8 right-8 w-16 h-16 bg-[var(--theme-orange)] text-black rounded-full shadow-2xl flex items-center justify-center active:scale-90 hover:scale-110 transition-all z-40 text-4xl font-light"
        >
          +
        </button>
      )}
    </div>
  );
};

export default AdminPackages;
