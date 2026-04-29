# FitMutant 💪

**Arda Pekcan tarafından tasarlanan, modern fitness ve beslenme rehberi uygulaması**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org/)

## 📋 Proje Açıklaması

FitMutant, kilo alma, kilo verme ve sporcu beslenmesi gibi farklı fitness hedefleri için bilimsel temelli rehberlik sağlayan bir web uygulamasıdır. Kullanıcılar paket seçebilir, admin paneli aracılığıyla duyurular yönetebilir ve WhatsApp entegrasyonu ile iletişim kurabilir.

## ✨ Özellikler

- 🎯 **Üç Ana Program**: Kilo Alma, Kilo Verme, Sporcu Beslenmesi
- 📦 **Paket Yönetimi**: Farklı seviyelerde antrenman ve beslenme paketleri
- 🔐 **Admin Paneli**: Paket ve duyuru yönetimi (korumalı rota)
- 📢 **Duyuru Sistemi**: Aktif duyuruları ana sayfada gösterme
- 💬 **WhatsApp Entegrasyonu**: Doğrudan bağlantı ile müşteri iletişimi
- 🎨 **Modern UI**: Responsive tasarım ve tema desteği
- 🖼️ **Galeri & Transformasyon**: Kullanıcı dönüşüm fotoğrafları

## 🛠️ Teknoloji Stack

### Frontend (Client)
- **React 18** - UI kütüphanesi
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Icons** - İkon library

### Backend (Server)
- **Node.js + Express** - Server framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Cloudinary** - Image upload

## 📁 Proje Yapısı

```
fitmutant/
├── client/                 # React uygulaması
│   ├── src/
│   │   ├── components/    # Reusable componentler
│   │   ├── pages/         # Sayfalar
│   │   ├── services/      # API servisleri
│   │   ├── context/       # Theme Context
│   │   ├── hooks/         # Custom hooks
│   │   └── assets/        # Resimler & statik dosyalar
│   └── package.json
│
├── server/                 # Express uygulaması
│   ├── routes/            # API rotaları
│   ├── controllers/        # İş mantığı
│   ├── models/            # Mongoose şemaları
│   ├── middleware/        # Auth ve diğer middleware'ler
│   ├── config/            # Konfigürasyon
│   └── package.json
│
├── API_SETUP_GUIDE.md     # API kurulum rehberi
├── CLOUDINARY_UPLOAD_GUIDE.md
└── README.md
```

## 🚀 Başlangıç

### Ön Koşullar
- Node.js >= 18
- npm veya yarn
- MongoDB instance
- Cloudinary account (resim yükleme için)

### Client Kurulumu

```bash
cd client
npm install
npm run dev
```

### Server Kurulumu

```bash
cd server
npm install
npm run dev
```

### Ortam Değişkenleri

**.env dosyalarını oluşturun:**

**Client (.env):**
```
VITE_API_URL=http://localhost:5000/api
```

**Server (.env):**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fitmutant
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📖 Rehberler

- [API Setup Guide](./API_SETUP_GUIDE.md) - Backend kurulumu ve ayarları
- [Cloudinary Upload Guide](./CLOUDINARY_UPLOAD_GUIDE.md) - Resim yükleme konfigürasyonu

## 🔑 Admin Panel Kullanımı

1. Ana sayfada admin butonuna tıklayın
2. İki adımlı doğrulama (telefon numarası ve kod) ile giriş yapın
3. Paketleri ve duyuruları yönetin

## 📝 API Endpoints

### Paketler
- `GET /api/packages` - Tüm paketleri getir
- `GET /api/packages/:category` - Kategoriye göre paketleri getir
- `POST /api/packages` - Yeni paket oluştur (Admin)
- `PUT /api/packages/:id` - Paketi güncelle (Admin)
- `DELETE /api/packages/:id` - Paketi sil (Admin)

### Duyurular
- `GET /api/announcements/active` - Aktif duyuruları getir
- `GET /api/announcements` - Tüm duyuruları getir (Admin)
- `POST /api/announcements` - Yeni duyuru oluştur (Admin)
- `PUT /api/announcements/:id` - Duyuruyu güncelle (Admin)
- `DELETE /api/announcements/:id` - Duyuruyu sil (Admin)

## 🤝 Katkıda Bulunma

Katkılar hoşgeldiniz! Lütfen aşağıdaki adımları izleyin:

1. Fork yapın
2. Feature branch'i oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişiklikleri commit edin (`git commit -m 'Add AmazingFeature'`)
4. Branch'e push yapın (`git push origin feature/AmazingFeature`)
5. Pull Request açın

Detaylar için [CONTRIBUTING.md](./CONTRIBUTING.md) dosyasına bakınız.

## 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Detaylar için [LICENSE](./LICENSE) dosyasına bakınız.

## 👨‍💻 Geliştirici

Tasarım ve Konsept: **Arda Pekcan**

## 📞 İletişim

Sorularınız veya önerileriniz için:
- WhatsApp: [Bağlantı](https://wa.me/905555555555)
- Email: contact@fitmutant.com

---

**FitMutant** - Fitness ve performans üzerine yapılan bilimsel çalışmaların uygulamalı hali.
