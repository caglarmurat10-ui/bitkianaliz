# 🌱 Akıllı Tarım Asistanı v3.0

Yapay zeka destekli bitki hastalık teşhisi, konum bazlı hava durumu analizi ve zirai yönetim sistemi.

## 🚀 Özellikler

- **AI Teşhis**: Bitki fotoğrafından hastalık ve zararlı tespiti (Gemini 2.5 Flash).
- **Hava Durumu**: Konuma özel rüzgar, nem ve sıcaklık takibi.
    - *Zirai Don* ve *Fırtına* alarmları.
- **Karışabilirlik Testi**: Gübre ve ilaçların birlikte kullanım uygunluğu.
- **Akıllı Rotasyon**: İlaç direnci oluşumunu engellemek için rotasyon uyarısı.
- **Uygulama Takvimi**: İlaçlama ve gübreleme geçmişi kaydı.
- **Zirai Rehber**: İlaç ve gübre veritabanı (Dozaj bilgileri ile).
- **Dark Mode**: Göz yormayan profesyonel karanlık tema.

## 🛠️ Kurulum

Gerekli paketleri yükleyin:

```bash
npm install
```

## ▶️ Çalıştırma

Geliştirme modunda başlatmak için:

```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 🔑 Çevre Değişkenleri (.env.local)

Aşağıdaki API anahtarlarının tanımlı olduğundan emin olun:

```bash
NEXT_PUBLIC_GEMINI_API_KEY=...
NEXT_PUBLIC_WEATHER_API_KEY=...
```
