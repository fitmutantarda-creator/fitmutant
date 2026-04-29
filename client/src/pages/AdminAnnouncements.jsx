import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdClose, MdAdd } from "react-icons/md";
import {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../services/announcementService";
import ConfirmModal from "../components/ConfirmModal";
import AdminNav from "../components/AdminNav";
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

const AdminAnnouncements = () => {
  const { modalProps, showConfirm, showAlert } = useModal();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    emoji: "🎉",
    color: "#FF6B35",
    textColor: "#FFFFFF",
    active: true,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error(error);
      showAlert({ title: "Hata", message: "Duyurular yüklenirken hata oluştu", type: "alert" });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.message.trim()) {
      showAlert({ title: "Hata", message: "Başlık ve mesaj gereklidir", type: "alert" });
      return;
    }

    try {
      if (editingId) {
        await updateAnnouncement(editingId, formData);
        showAlert({ title: "Başarılı", message: "Duyuru güncellendi", type: "success" });
      } else {
        await createAnnouncement(formData);
        showAlert({ title: "Başarılı", message: "Duyuru oluşturuldu", type: "success" });
      }

      setFormData({
        title: "",
        message: "",
        emoji: "🎉",
        color: "#FF6B35",
        textColor: "#FFFFFF",
        active: true,
      });
      setEditingId(null);
      setShowForm(false);
      fetchData();
    } catch (error) {
      showAlert({ title: "Hata", message: "İşlem başarısız oldu", type: "alert" });
    }
  };

  const handleEdit = (announcement) => {
    setFormData({
      title: announcement.title,
      message: announcement.message,
      emoji: announcement.emoji || "🎉",
      color: announcement.color || "#FF6B35",
      textColor: announcement.textColor || "#FFFFFF",
      active: announcement.active,
    });
    setEditingId(announcement._id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    showConfirm({
      title: "Duyuruyu Sil",
      message: "Bu duyuruyu silmek istediğinizden emin misiniz?",
      onConfirm: async () => {
        try {
          await deleteAnnouncement(id);
          showAlert({ title: "Başarılı", message: "Duyuru silindi", type: "success" });
          fetchData();
        } catch (error) {
          showAlert({ title: "Hata", message: "Silme işlemi başarısız oldu", type: "alert" });
        }
      },
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: "",
      message: "",
      emoji: "🎉",
      color: "#FF6B35",
      textColor: "#FFFFFF",
      active: true,
    });
  };

  if (loading) {
    return <div style={{ padding: "20px" }}>Yükleniyor...</div>;
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <AdminNav />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "var(--text-main)" }}>Duyurular</h1>
        <button
          onClick={() => setShowForm(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "var(--theme-orange)",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          <MdAdd size={20} /> Yeni Duyuru
        </button>
      </div>

      {showForm && (
        <div
          style={{
            backgroundColor: "var(--bg-body)",
            border: "1.5px solid var(--border-col)",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "30px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-main)" }}>
              {editingId ? "Duyuru Düzenle" : "Yeni Duyuru"}
            </h2>
            <button
              onClick={handleCancel}
              style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "24px" }}
            >
              <MdClose />
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
            <div>
              <label style={lbl}>Başlık</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="örn: Nisan Ayına Özel"
                style={inp}
              />
            </div>

            <div>
              <label style={lbl}>Mesaj</label>
              <input
                type="text"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="örn: %30 İNDİRİM"
                style={inp}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={lbl}>Emoji</label>
                <input
                  type="text"
                  name="emoji"
                  value={formData.emoji}
                  onChange={handleInputChange}
                  placeholder="🎉"
                  style={inp}
                  maxLength="2"
                />
              </div>

              <div>
                <label style={lbl}>Arka Plan Rengi</label>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <input
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    style={{ ...inp, width: "50px", height: "40px", padding: "2px", cursor: "pointer" }}
                  />
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    style={{ ...inp, flex: 1 }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={lbl}>Metin Rengi</label>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <input
                    type="color"
                    name="textColor"
                    value={formData.textColor}
                    onChange={handleInputChange}
                    style={{ ...inp, width: "50px", height: "40px", padding: "2px", cursor: "pointer" }}
                  />
                  <input
                    type="text"
                    value={formData.textColor}
                    onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                    style={{ ...inp, flex: 1 }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
                <label style={{ ...lbl, marginBottom: "12px", flex: 1 }}>
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleInputChange}
                    style={{ marginRight: "8px", cursor: "pointer" }}
                  />
                  Aktif
                </label>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "10px" }}>
              <button
                type="submit"
                style={{
                  backgroundColor: "var(--theme-orange)",
                  color: "white",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                {editingId ? "Güncelle" : "Oluştur"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  backgroundColor: "transparent",
                  color: "var(--text-main)",
                  border: "1.5px solid var(--border-col)",
                  padding: "12px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: "grid", gap: "12px" }}>
        {announcements.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-muted)" }}>
            Henüz duyuru oluşturulmamış
          </div>
        ) : (
          announcements.map((announcement) => (
            <div
              key={announcement._id}
              style={{
                backgroundColor: announcement.color,
                color: announcement.textColor,
                padding: "16px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: "18px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "20px", marginRight: "8px" }}>{announcement.emoji}</span>
                  <strong>{announcement.title}</strong>
                </div>
                <div style={{ fontSize: "14px", opacity: 0.9 }}>{announcement.message}</div>
                <div style={{ fontSize: "12px", opacity: 0.7, marginTop: "4px" }}>
                  {announcement.active ? "✓ Aktif" : "Pasif"}
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleEdit(announcement)}
                  style={{
                    background: "none",
                    border: "none",
                    color: announcement.textColor,
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => handleDelete(announcement._id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: announcement.textColor,
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <ConfirmModal {...modalProps} />
    </div>
  );
};

export default AdminAnnouncements;
