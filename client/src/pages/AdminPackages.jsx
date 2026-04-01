import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdClose, MdAdd } from "react-icons/md";
import {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
  uploadImage,
} from "../services/packageService";
import ConfirmModal from "../components/ConfirmModal";
import useModal from "../hooks/useModal";

const inp = {
  width: "100%",
  backgroundColor: "var(--bg-body)",
  border: "1.5px solid var(--border-col)",
  borderRadius: "10px",
  padding: "10px 14px",
  fontSize: "14px",
  color: "var(--text-main)",
  outline: "none",
  transition: "border-color 0.2s ease",
  boxSizing: "border-box",
};

const lbl = {
  fontSize: "10px",
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "var(--text-muted)",
  display: "block",
  marginBottom: "6px",
};

const AdminPackages = () => {
  const { modalProps, showConfirm, showAlert } = useModal();
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

    if (file.size > 5 * 1024 * 1024) {
      showAlert({ title: "Dosya Çok Büyük", message: "Dosya boyutu 5MB'dan küçük olmalıdır.", type: "alert" });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      const response = await uploadImage(file);
      setFormData((prev) => ({ ...prev, imgURL: response.url }));
    } catch (error) {
      console.error("Upload hatası:", error);
      showAlert({ title: "Yükleme Hatası", message: "Resim yüklenemedi. Lütfen tekrar deneyin.", type: "alert" });
      setImagePreview("");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.imgURL) {
      showAlert({ title: "Resim Gerekli", message: "Lütfen pakete bir görsel yükleyin.", type: "alert" });
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
      showAlert({ title: "Hata", message: "İşlem başarısız oldu. Lütfen tekrar deneyin.", type: "alert" });
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
    const ok = await showConfirm({
      title: "Paketi Sil",
      message: "Bu paketi kalıcı olarak silmek istediğinize emin misiniz?",
      confirmText: "Evet, Sil",
      cancelText: "İptal",
    });
    if (ok) {
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
    <div style={{ minHeight: "100vh", paddingBottom: "80px", backgroundColor: "var(--bg-body)" }}>
      <main style={{ padding: "24px 16px", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>

        {/* Header */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <h1 style={{
            fontSize: "clamp(1.1rem, 4vw, 1.5rem)",
            fontWeight: 900,
            color: "var(--text-main)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            fontFamily: "var(--font-heading)",
          }}>
            Yönetim Paneli
          </h1>
          <span style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-col)",
            color: "var(--text-muted)",
            padding: "4px 14px",
            borderRadius: "999px",
            fontSize: "10px",
            fontWeight: 700,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}>
            {packages.length} Kayıtlı Paket
          </span>
        </div>

        {/* Form Section */}
        {(showForm || packages.length === 0) && (
          <section style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-col)",
            borderRadius: "16px",
            overflow: "hidden",
          }}>
            <div style={{ padding: "clamp(16px, 4vw, 32px)" }}>
              {/* Form Header */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "12px",
                marginBottom: "20px",
                paddingBottom: "16px",
                borderBottom: "1px solid color-mix(in srgb, var(--border-col) 30%, transparent)",
              }}>
                <div>
                  <h2 style={{
                    fontSize: "clamp(1rem, 3vw, 1.3rem)",
                    fontWeight: 900,
                    color: "var(--text-main)",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-heading)",
                    letterSpacing: "0.08em",
                    margin: 0,
                  }}>
                    {editingId ? "Paket Güncelle" : "Yeni Paket"}
                  </h2>
                  <p style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "4px", fontWeight: 600, textTransform: "uppercase" }}>
                    {editingId ? "Düzenleme modu aktif" : "Tüm alanları doldurun"}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Image Upload */}
                <div>
                  <label style={lbl}>Paket Görseli</label>
                  <div style={{
                    position: "relative",
                    border: "2px dashed color-mix(in srgb, var(--theme-orange) 35%, transparent)",
                    borderRadius: "12px",
                    padding: "16px",
                    transition: "border-color 0.2s ease",
                  }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={uploading}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer", zIndex: 10 }}
                    />
                    {imagePreview ? (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{ maxWidth: "180px", maxHeight: "180px", borderRadius: "10px", objectFit: "contain" }}
                        />
                        <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                          {uploading ? "Yükleniyor..." : "Görsel yüklendi"}
                        </p>
                        {!uploading && (
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview("");
                              setFormData((prev) => ({ ...prev, imgURL: "" }));
                              const fileInput = document.querySelector('input[type="file"]');
                              if (fileInput) fileInput.value = "";
                            }}
                            style={{ fontSize: "11px", color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}
                          >
                            Görseli Sil
                          </button>
                        )}
                      </div>
                    ) : (
                      <div style={{ textAlign: "center", padding: "24px 0" }}>
                        <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                          {uploading ? "Yükleniyor..." : "Resim seçmek için tıklayın"}
                        </p>
                        <p style={{ color: "var(--text-muted)", fontSize: "11px", marginTop: "4px", opacity: 0.6 }}>(Max 5MB)</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Paket Adı */}
                <div>
                  <label style={lbl}>Paket Adı</label>
                  <input
                    required
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    style={inp}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--theme-orange)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-col)")}
                  />
                </div>

                {/* Kategori */}
                <div>
                  <label style={lbl}>Kategori</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    style={inp}
                  >
                    <option value="Kilo Verme">Kilo Verme</option>
                    <option value="Kilo Alma">Kilo Alma</option>
                    <option value="Sporcu Beslenmesi">Sporcu Beslenmesi</option>
                  </select>
                </div>

                {/* Fiyatlar */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={lbl}>Eski Fiyat</label>
                    <input
                      required
                      name="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      style={inp}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--theme-orange)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-col)")}
                    />
                  </div>
                  <div>
                    <label style={lbl}>Yeni Fiyat</label>
                    <input
                      required
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      style={{ ...inp, color: "var(--theme-orange)", fontWeight: 700 }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--theme-orange)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-col)")}
                    />
                  </div>
                </div>

                {/* Özellikler */}
                <div>
                  <label style={lbl}>Özellikler</label>
                  <textarea
                    required
                    name="features"
                    rows={3}
                    value={formData.features}
                    onChange={handleInputChange}
                    placeholder="Virgülle ayırın (örn: Protein desteği, Vitamin, Mineral)"
                    style={{ ...inp, resize: "none" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--theme-orange)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-col)")}
                  />
                  <p style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "4px", opacity: 0.7 }}>
                    Özellikleri virgülle ayırarak yazın
                  </p>
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "8px" }}>
                  {editingId && (
                    <button
                      onClick={resetForm}
                      type="button"
                      style={{
                        flex: 1,
                        backgroundColor: "rgba(239,68,68,0.1)",
                        color: "#ef4444",
                        border: "1px solid rgba(239,68,68,0.25)",
                        borderRadius: "10px",
                        padding: "12px 16px",
                        fontSize: "11px",
                        fontWeight: 900,
                        fontFamily: "var(--font-heading)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <MdClose size={16} />
                      <span>VAZGEÇ</span>
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={uploading}
                    style={{
                      flex: 2,
                      backgroundColor: uploading ? "color-mix(in srgb, var(--theme-orange) 60%, transparent)" : "var(--theme-orange)",
                      color: "#000",
                      border: "none",
                      borderRadius: "10px",
                      padding: "13px 20px",
                      fontSize: "11px",
                      fontWeight: 900,
                      fontFamily: "var(--font-heading)",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      cursor: uploading ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
                    }}
                  >
                    {editingId ? "GÜNCELLE" : "PAKET EKLE"}
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}

        {/* Packages Grid */}
        <section>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px 0" }}>
              <div style={{
                width: "40px",
                height: "40px",
                border: "3px solid var(--border-col)",
                borderTopColor: "var(--theme-orange)",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }} />
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
              gap: "20px",
            }}>
              {packages.map((pkg) => {
                const colorMap = {
                  "Kilo Verme": "var(--theme-magenta)",
                  "Kilo Alma": "var(--theme-orange)",
                  "Sporcu Beslenmesi": "var(--theme-green)",
                };
                const themeColor = colorMap[pkg.category] || "var(--theme-orange)";

                return (
                  <div
                    key={pkg._id}
                    style={{
                      backgroundColor: "var(--bg-card)",
                      borderRadius: "18px",
                      border: "1px solid var(--border-col)",
                      borderTop: `5px solid ${themeColor}`,
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)";
                    }}
                  >
                    <div style={{ padding: "16px" }}>
                      {/* Card Header */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                        <span
                          style={{
                            padding: "4px 10px",
                            borderRadius: "999px",
                            fontSize: "9px",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            backgroundColor: `color-mix(in srgb, ${themeColor} 12%, transparent)`,
                            color: themeColor,
                            border: `1px solid color-mix(in srgb, ${themeColor} 30%, transparent)`,
                          }}
                        >
                          {pkg.category}
                        </span>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            onClick={() => handleEdit(pkg)}
                            style={{
                              width: "34px",
                              height: "34px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "10px",
                              backgroundColor: "var(--bg-body)",
                              border: "1px solid var(--border-col)",
                              color: "var(--text-muted)",
                              cursor: "pointer",
                              transition: "color 0.2s ease",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--theme-orange)")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                          >
                            <MdEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(pkg._id)}
                            style={{
                              width: "34px",
                              height: "34px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "10px",
                              backgroundColor: "rgba(239,68,68,0.1)",
                              border: "1px solid rgba(239,68,68,0.2)",
                              color: "#ef4444",
                              cursor: "pointer",
                              transition: "background-color 0.2s ease",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.2)")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.1)")}
                          >
                            <MdDelete size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Image */}
                      {(pkg.imgURL || pkg.image) && (
                        <div style={{
                          width: "100%",
                          height: "160px",
                          borderRadius: "10px",
                          marginBottom: "12px",
                          overflow: "hidden",
                          backgroundColor: "var(--bg-body)",
                        }}>
                          <img
                            src={pkg.imgURL || pkg.image}
                            alt={pkg.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease" }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                          />
                        </div>
                      )}

                      {/* Title */}
                      <h3 style={{
                        fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                        fontWeight: 900,
                        color: "var(--text-main)",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        lineHeight: 1.2,
                        marginBottom: "8px",
                        fontFamily: "var(--font-heading)",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}>
                        {pkg.title}
                      </h3>

                      {/* Price */}
                      <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "16px" }}>
                        <span style={{ fontSize: "clamp(1.4rem, 4vw, 1.8rem)", fontWeight: 900, color: themeColor, letterSpacing: "-0.02em" }}>
                          {pkg.price} ₺
                        </span>
                        <span style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "line-through", opacity: 0.45, fontWeight: 700 }}>
                          {pkg.originalPrice} ₺
                        </span>
                      </div>

                      {/* Features */}
                      <div style={{
                        paddingTop: "14px",
                        borderTop: "1px solid color-mix(in srgb, var(--border-col) 40%, transparent)",
                      }}>
                        <ul style={{ display: "flex", flexDirection: "column", gap: "8px", listStyle: "none", padding: 0, margin: 0 }}>
                          {pkg.features.slice(0, 4).map((feature, idx) => (
                            <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "var(--text-main)", fontWeight: 500 }}>
                              <span style={{
                                width: "7px",
                                height: "7px",
                                borderRadius: "50%",
                                backgroundColor: themeColor,
                                flexShrink: 0,
                                marginTop: "5px",
                              }} />
                              <span style={{ lineHeight: 1.4 }}>{feature}</span>
                            </li>
                          ))}
                          {pkg.features.length > 4 && (
                            <li style={{ fontSize: "11px", color: "var(--text-muted)", fontStyle: "italic" }}>
                              +{pkg.features.length - 4} özellik daha
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Floating Action Button */}
      {!showForm && packages.length > 0 && (
        <button
          onClick={() => {
            setShowForm(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "52px",
            height: "52px",
            backgroundColor: "var(--theme-orange)",
            color: "#000",
            border: "none",
            borderRadius: "50%",
            boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 40,
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.12)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          aria-label="Yeni paket ekle"
        >
          <MdAdd size={26} />
        </button>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <ConfirmModal {...modalProps} />
    </div>
  );
};

export default AdminPackages;