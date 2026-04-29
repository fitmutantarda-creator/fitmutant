# Katkıda Bulunma Rehberi

FitMutant projesine katkıda bulunmak istediğiniz için teşekkürler! Bu rehber, katkıda bulunma sürecini açıklamaktadır.

## 🎯 Başlamadan Önce

- Projeyi fork yapın
- Yerel makinenize clone edin: `git clone https://github.com/YOUR_USERNAME/fitmutant.git`
- Branch'inizi oluşturun: `git checkout -b feature/your-feature-name`

## 📝 Kodlama Standartları

### JavaScript/React

```javascript
// ✅ İyi örnek
const handleUserSubmit = (userData) => {
  const validatedData = validateUserData(userData);
  return submitToAPI(validatedData);
};

// ❌ Kötü örnek
function handleUserSubmit(userData) {
  return submitToAPI(userData);
}
```

- Arrow functions tercih edilir
- Tanımlayıcı fonksiyon isimleri kullanın
- Yorum satırları yazın (özellikle karmaşık mantık için)
- `const` kullanın, `let` ve `var` yerine

### Dosya Organizasyonu

```
components/
├── MyComponent.jsx        # Component
├── MyComponent.test.jsx   # Test (opsiyonel)
└── index.js              # Export

pages/
├── MyPage.jsx
└── index.js
```

## 🔄 Commit Mesajları

Commit mesajlarını aşağıdaki formatı takip ederek yazın:

```
[TYPE] Short description (50 chars max)

Detailed explanation if needed (72 chars max per line)

Fixes #123
```

### Tip Seçenekleri:
- `feat:` Yeni özellik
- `fix:` Bug fix
- `docs:` Dokumentasyon
- `style:` Format/lint değişiklikleri
- `refactor:` Kod yeniden düzenleme
- `test:` Test ekleme/güncelleme
- `chore:` Bağımlılık güncellemeleri

### Örnekler:

```
feat: Admin paneline paket analitikleri ekle

- Haftalık satış grafiği
- Popüler paketler listesi
- Conversion rate metrikleri

Fixes #456
```

## 🧪 Testing

Test yazınız:

```bash
# Client
cd client
npm test

# Server
cd server
npm test
```

## 📋 Pull Request Süreci

1. **Branch'i güncelleyin:**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Push yapın:**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **GitHub'da PR açın** ve aşağıdaki şablonu doldurun:

```markdown
## 📝 Açıklama
Neyi değiştirdiniz ve neden?

## 🔗 İlgili Issue
Closes #123

## 🧪 Test Edilmiş
- [ ] Frontend değişiklikleri test edildi
- [ ] Backend değişiklikleri test edildi
- [ ] Responsive tasarım kontrol edildi

## ✅ Kontrol Listesi
- [ ] Kodlama standartlarını takip ettim
- [ ] Yorum satırları ekledim
- [ ] Testler geçti
- [ ] README güncelleme gerekli mi? Hayır / Evet
```

## 🐛 Bug Raporlama

Bug bulduysanız, Issue oluşturun:

**Başlık:** `[BUG] Kısa tanımlama`

**Açıklama:**
```markdown
## Sorun
Sorunu açıklayın

## Adımlar
1. Adım 1
2. Adım 2
3. Sorun ortaya çıkıyor

## Beklenen Davranış
Ne olması gerekiyordu

## Gerçek Davranış
Ne oldu

## Ekran Görüntüsü
Varsa ekleyin

## Ortam
- OS: Windows/Mac/Linux
- Browser: Chrome/Firefox/Safari
- Version: x.x.x
```

## ✨ Özellik İsteği

Yeni özellik görmek istiyorsanız:

**Başlık:** `[FEATURE] Kısa tanımlama`

**Açıklama:**
```markdown
## Amaç
Neden bu özellik gerekli?

## Çözüm
Nasıl uygulanmalı?

## Alternatifler
Başka seçenekler var mı?

## Ek Bağlam
Başka bilgiler
```

## 📚 Dokümantasyon

- API değişiklikleri yaptıysanız `API_SETUP_GUIDE.md` güncelleyin
- Yeni feature eklediyseniz `README.md`'deki özellikler bölümüne ekleyin
- Karmaşık özellikleri dokumente edin

## 🚀 Deployment

Merging seçenekleri:
- **Squash:** Birden fazla commit içeriyorsa
- **Rebase:** Clean history için tercih edilir
- **Merge Commit:** Büyük özellikler için

## ❓ Soru & Destek

- Issue açın (`[QUESTION]` etiketi ile)
- Discussions kısmını kullanın
- Belge okuyun ve Wiki'ye bakın

## 📞 İletişim

Sorularınız varsa:
- GitHub Issues aracılığıyla
- WhatsApp: +90 555 555 5555
- Email: contact@fitmutant.com

---

**Katkılarınız için teşekkürler! 🙏**

Belirsiz bir nokta varsa sormaktan çekinmeyin!
