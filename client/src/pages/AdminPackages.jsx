import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdClose, MdAdd } from "react-icons/md";
import {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
  uploadImage,
} from "../services/packageService";

const AdminPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    originalPrice: "",
    category: "Kilo Alma",
    features: "",
    imgURL: "",
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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Dosya boyutunu kontrol et (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Dosya boyutu 5MB'dan küçük olmalıdır");
      return;
    }

    // Preview göster
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload et
    try {
      setUploading(true);
      const response = await uploadImage(file);
      setFormData((prev) => ({ ...prev, imgURL: response.url }));
    } catch (error) {
      console.error("Upload hatası:", error);
      alert("Resim yüklenemedi");
      setImagePreview("");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.imgURL) {
      alert("Lütfen resim yükleyin");
      return;
    }

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
      alert("İşlem başarısız oldu");
    }
  };

  const handleEdit = (pkg) => {
    setFormData({
      title: pkg.title,
      price: pkg.price,
      originalPrice: pkg.originalPrice,
      category: pkg.category,
      features: pkg.features.join(", "),
      imgURL: pkg.imgURL || pkg.image || "",
    });
    setImagePreview(pkg.imgURL || pkg.image || "");
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
      imgURL: "",
    });
    setImagePreview("");
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen pb-20 bg-(--bg-body)">
      <main className="px-4 py-8 space-y-10 max-w-7xl mx-auto flex flex-col items-center">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 px-2">
          <h1 className="text-2xl font-bold text-(--text-main) uppercase tracking-widest font-heading text-center sm:text-left">
            Yönetim Paneli
          </h1>
          <span className="bg-(--bg-card) border border-(--border-col) text-(--text-muted) px-4 py-1.5 rounded-full text-xs font-bold uppercase shadow-sm">
            {packages.length} Kayıtlı Paket
          </span>
        </div>
        {(showForm || packages.length === 0) && (
          <section
            className="bg-(--bg-card) border border-(--border-col) rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500 w-full max-w-4xl mx-auto"
            style={{
              padding: "clamp(1rem, 4vw, 2.5rem)",
              marginBottom: "1.5rem",
            }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 border-b border-(--border-col)/30 pb-4">
              <div className="text-left">
                <h2 className="text-xl md:text-2xl font-bold text-(--text-main) uppercase font-heading">
                  {editingId ? "Paket Güncelle" : "Yeni Paket"}
                </h2>
                <p className="text-[10px] md:text-xs text-(--text-muted) mt-1 font-medium uppercase tracking-wider">
                  {editingId ? "Düzenleme modu aktif" : "Tüm alanları doldurun"}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Image Upload Section */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-(--text-muted) ml-1">
                  Paket Görseli
                </label>
                <div className="relative border-2 border-dashed border-(--theme-orange)/30 rounded-xl p-4 hover:border-(--theme-orange)/60 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={uploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {imagePreview ? (
                    <div className="flex flex-col items-center gap-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          maxWidth: "200px",
                          maxHeight: "200px",
                          borderRadius: "8px",
                        }}
                      />
                      <p className="text-xs text-(--text-muted)">
                        {uploading ? "Yükleniyor..." : "Görsel yüklendi"}
                      </p>
                      {!uploading && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setImagePreview("");
                            setFormData((prev) => ({ ...prev, imgURL: "" }));
                            document.querySelector('input[type="file"]').value =
                              "";
                          }}
                          className="text-xs text-red-500 hover:text-red-600"
                        >
                          Sil
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-(--text-muted) text-sm">
                        {uploading
                          ? "Yükleniyor..."
                          : "Resim seçmek için tıklayın"}
                      </p>
                      <p className="text-[10px] text-(--text-muted)/60 mt-1">
                        (Max 5MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {" "}
              {/* Mobilde aralar daha dar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5 text-left w-full">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-(--text-muted) ml-1">
                    Paket Adı
                  </label>
                  <input
                    required
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    style={{ padding: "12px 16px" }} // Mobilde daha ince (16px -> 12px)
                    className="w-full bg-(--bg-body) rounded-xl border border-(--border-col) text-(--text-main) outline-none focus:border-(--theme-orange)"
                  />
                </div>
                <div className="space-y-1.5 text-left w-full">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-(--text-muted) ml-1">
                    Kategori
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    style={{ padding: "12px 16px" }}
                    className="w-full bg-(--bg-body) rounded-xl border border-(--border-col) text-(--text-main) outline-none appearance-none"
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
                  <label className="text-[10px] font-bold uppercase tracking-wider text-(--text-muted) ml-1">
                    Eski Fiyat
                  </label>
                  <input
                    required
                    name="originalPrice"
                    type="number"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    style={{ padding: "12px 16px" }}
                    className="w-full bg-(--bg-body) rounded-xl border border-(--border-col) text-(--text-main)"
                  />
                </div>
                <div className="space-y-1.5 text-left w-full">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-(--text-muted) ml-1">
                    Yeni Fiyat
                  </label>
                  <input
                    required
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    style={{ padding: "12px 16px" }}
                    className="w-full bg-(--bg-body) rounded-xl border border-(--border-col) text-(--theme-orange) font-bold"
                  />
                </div>
              </div>
              <div className="space-y-1.5 text-left w-full">
                <label className="text-[10px] font-bold uppercase tracking-wider text-(--text-muted) ml-1">
                  Özellikler
                </label>
                <textarea
                  required
                  name="features"
                  rows="3" // Satır sayısını 4'ten 3'e indirdik
                  value={formData.features}
                  onChange={handleInputChange}
                  style={{ padding: "12px 16px" }}
                  className="w-full bg-(--bg-body) rounded-xl border border-(--border-col) text-(--text-main) outline-none resize-none"
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
                      padding: "14px 16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      lineHeight: "1",
                    }}
                    className="flex-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-[10px] font-black tracking-widest uppercase hover:bg-red-500/20 transition-all"
                  >
                    <MdClose size={16} />
                    <span>VAZGEÇ</span>
                  </button>
                )}
                <button
                  type="submit"
                  disabled={uploading}
                  style={{
                    padding: "14px 16px",
                    lineHeight: "1",
                    opacity: uploading ? 0.5 : 1,
                  }}
                  className="flex-2 bg-(--theme-orange) text-black font-black rounded-xl shadow-lg uppercase tracking-widest text-[10px] active:scale-95 disabled:cursor-not-allowed"
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
                    className="bg-(--bg-card) rounded-[2.5rem] border-x border-b border-(--border-col) border-t-[6px] flex flex-col shadow-lg transition-all duration-500 w-full max-w-sm md:max-w-none mx-auto relative overflow-hidden"
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
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-(--bg-body) border border-(--border-col) text-(--text-muted) hover:text-(--theme-orange) transition-all"
                        >
                          <MdEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(pkg._id)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all"
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Image Display */}
                    {(pkg.imgURL || pkg.image) && (
                      <div
                        style={{
                          width: "100%",
                          height: "200px",
                          borderRadius: "12px",
                          marginBottom: "16px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={pkg.imgURL || pkg.image}
                          alt={pkg.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}

                    <h3 className="text-2xl font-black text-(--text-main) mb-3 uppercase leading-tight tracking-tight">
                      {pkg.title}
                    </h3>

                    <div className="flex items-baseline gap-3 mb-8">
                      <span
                        className="text-3xl font-black tracking-tighter"
                        style={{ color: themeColor }}
                      >
                        {pkg.price} ₺
                      </span>
                      <span className="text-sm text-(--text-muted) line-through opacity-40 font-bold">
                        {pkg.originalPrice} ₺
                      </span>
                    </div>

                    <div className="mt-auto pt-8 border-t border-(--border-col)/40">
                      <ul className="space-y-4">
                        {pkg.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-4 text-[15px] text-(--text-main) font-medium"
                          >
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5"
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
          className="fixed bottom-8 right-8 w-12 h-12 bg-(--theme-orange) text-black rounded-full shadow-2xl flex items-center justify-center active:scale-90 hover:scale-110 transition-all z-40"
        >
          <MdAdd size={32} />
        </button>
      )}
    </div>
  );
};

export default AdminPackages;
