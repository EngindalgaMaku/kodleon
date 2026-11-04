# Kodleon

kodleon.com: işletmelere özel uygulamaların tanıtım sitesi. Next.js, veritabanı yok.

```bash
npm install
npm run dev
```

## Yeni uygulama eklemek

1. `lib/apps.ts` içindeki `APPS` listesine bir kayıt ekleyin.
2. Gerçek ekran görüntülerini `public/apps/<slug>/` içine `.webp` olarak koyun (780×1688).

Kart, sayfa, başlık ve site haritası kendiliğinden oluşur.

## Yayın

Coolify'da `npm run build` ve `npm start`. WhatsApp numarası `lib/site.ts` içindedir.

## Ziyaretçi sayacı

Çerezsiz, kişi bilgisi tutmaz. Görmek için `STATS_KEY` ortam değişkenine uzun bir değer verin, `https://kodleon.com/istatistik?key=<değer>` adresini açın. Sayılar `STATS_DIR` klasöründe (varsayılan `storage/stats`) durur; yayınlar arasında korunması için bu klasöre kalıcı disk bağlanmalıdır.
