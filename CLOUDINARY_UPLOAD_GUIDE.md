# Cloudinary ve Multer Entegrasyonu - Kuruluş Rehberi

## 🎯 Yapılan Değişiklikler

### Backend (server/)

#### 1. **Package Model** (`server/models/Package.js`)
- `imgURL` alanı eklendi (Cloudinary görselleri tutmak için)
- `image` alanı eski verilerle uyumlu kalmak için saklandı

```javascript
imgURL: {
  type: String, // Cloudinary URL
  default: ''
},
image: {
  type: String, // Eski verileri uyumlu tutmak için
  default: ''
}
```

#### 2. **Upload Controller** (`server/controllers/uploadController.js`) - YENİ DOSYA
- `uploadImage`: Dosya yüklemesini işler
- `deleteImage`: Cloudinary'den resim silmesini işler

**Özellikler:**
- Max 5MB dosya boyutu kontrolü
- Sadece resim dosyaları kabul edilir
- Cloudinary'de `fit-mutant/packages` klasöründe saklanır
- Geçici dosya otomatik silinir

#### 3. **Upload Routes** (`server/routes/uploadRoutes.js`)
- Multer konfigürasyonu iyileştirildi
- `protectAdmin` middleware'i eklendi (sadece admin upload yapabilir)

```
POST   /api/upload         - Resim yükle (admin)
DELETE /api/upload/:publicId - Resim sil (admin)
```

#### 4. **Package Controller** (`server/controllers/packageController.js`)
- `createPackage`: `imgURL` alanını kullana güncellendi
- `updatePackage`: Görsel güncelleme desteği eklendi

### Frontend (client/)

#### 1. **Package Service** (`client/src/services/packageService.js`)
Yeni fonksiyonlar eklendi:
```javascript
uploadImage(file)      // Resim Cloudinary'ye yükle
deleteImage(publicId)  // Cloudinary'den resim sil
```

#### 2. **Admin Packages Page** (`client/src/pages/AdminPackages.jsx`)

**Yeni State'ler:**
- `uploading` - Upload işleminin durumunu takip eder
- `imagePreview` - Yüklenen resmin önizlemesini gösterir

**Yeni Fonksiyonlar:**
- `handleImageChange()` - Resim seçim ve yüklemesini işler

**Yeni UI Öğeleri:**
1. **Resim Upload Alanı** (form başında):
   - Drag & drop desteği
   - Dosya boyutu kontrolü (max 5MB)
   - Resim önizlemesi
   - Resmi silme seçeneği
   - Yükleme durumu göstergesi

2. **Paket Kartında Resim**:
   - Her paket kartının üst kısmında 200px yükseklikte resim gösterilir
   - Cover fit ile ölçeklendirilir

---

## 🚀 Nasıl Kullanılır?

### Yeni Paket Ekleme
1. Admin paneline git
2. `+` butonuna tıkla
3. **Resim yükle** seçeneğine tıkla
4. Resmini seç (max 5MB, PNG/JPG/JPEG)
5. Resim önizlemesi görünecek
6. Diğer alanları doldur (Başlık, Fiyat, Kategori, Özellikler)
7. **EKLE** butonuna tıkla

### Paket Güncelleme
1. Düzenlemek istediğin paketin **✎** butonuna tıkla
2. Resmi yenisi ile değiştir (isteğe bağlı)
3. Diğer alanları güncelle
4. **KAYDET** butonuna tıkla

### Paket Silme
1. Silmek istediğin paketin **✕** butonuna tıkla
2. Onay verdin
3. Paket silinir (Cloudinary'deki resim kalmaya devam edebilir)

---

## 🔧 Teknik Detaylar

### Upload Flow
```
Frontend (File Input)
    ↓
Client Side Validation (5MB, image/* check)
    ↓
Multer (geçici dosyaya kaydeder)
    ↓
Cloudinary (cloud'a yükler)
    ↓
Geçici dosya silinir
    ↓
URL Frontend'e dönülür
    ↓
MongoDB'de imgURL olarak kaydedilir
```

### Dosya Yapısı
```
Cloudinary Cloud:
de9pcgcce/
├── fit-mutant/
│   └── packages/
│       ├── paket1_abc123.jpg
│       ├── paket2_def456.png
│       └── ...
```

---

## ✅ Test Etmelisiniz

### Lokal Test
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

### Manuel Test Adımları
1. ✅ Resim yükle (5MB'dan küçük)
2. ✅ Resim önizlemesinin göründüğünü doğrula
3. ✅ Paket oluştur (create)
4. ✅ Paket kartında resmin göründüğünü doğrula
5. ✅ Paket güncelle (update) - resmi değiştir
6. ✅ Paket sil (delete)
7. ✅ Hata durumları: 5MB+ dosya, resim olmayan dosya yükleme

---

## 🐛 Troubleshooting

### Resim yüklenmiyorsa
- ✅ Cloudinary credentials'ı .env'de kontrol et
- ✅ Dosya boyutunu kontrol et (max 5MB)
- ✅ Browser console'da hataları kontrol et

### Resim gösterilmiyorsa
- ✅ MongoDB'de `imgURL` veya `image` alanı var mı kontrol et
- ✅ Cloudinary URL'sinin geçerli olup olmadığını kontrol et
- ✅ Network tab'ında 404 hatası var mı kontrol et

### Admin erişimi olmiyorsa
- ✅ Admin token'ı sessionStorage'da var mı kontrol et
- ✅ JWT secret'ı kontrol et
- ✅ Admin middleware'inin çalışıp çalışmadığını kontrol et

---

## 📦 Cloudinary Integration

**Cloud Name:** de9pcgcce

**Environment Variables** (.env):
```
CLOUDINARY_CLOUD_NAME=de9pcgcce
CLOUDINARY_API_KEY=978366451351375
CLOUDINARY_API_SECRET=btsHylCGMOlYNz3Pokcf4WaQvWo
```

---

## 🔐 Güvenlik Notları

1. **Admin Only**: Upload sadece admin middleware'i ile korumalı
2. **File Validation**: Multer ile sadece resim dosyaları kabul edilir
3. **Size Limit**: 5MB limit zorunlu tutulur
4. **Secure URLs**: Cloudinary secure_url'si kullanılır

---

## 📝 API Endpoints

### Upload
```
POST /api/upload
Headers: Authorization: Bearer {token}
Body: FormData { image: File }

Response:
{
  success: true,
  url: "https://res.cloudinary.com/...",
  publicId: "fit-mutant/packages/..."
}
```

### Packages (güncellendi)
```
POST /api/packages
{
  title: "Paket Adı",
  price: 999,
  originalPrice: 1999,
  category: "Kilo Verme",
  features: ["Özellik 1", "Özellik 2"],
  imgURL: "https://res.cloudinary.com/..."
}

PUT /api/packages/:id
{
  ...aynı alanlar,
  imgURL: "https://res.cloudinary.com/..."
}
```

---

## 🎓 Öğrenme Kaynakları

- **Multer Docs**: https://github.com/expressjs/multer
- **Cloudinary Docs**: https://cloudinary.com/documentation
- **Cloudinary Node.js SDK**: https://cloudinary.com/documentation/node_integration

---

**Hazırlanma Tarihi:** Nisan 2026
