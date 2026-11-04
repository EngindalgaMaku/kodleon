// Every app on the site comes from this list: add one entry and its card, page, sitemap entry
// and search title appear. Screenshots go to public/apps/<slug>/ and must be real screens.

export interface AppShot {
  file: string;
  title: string;
  text: string;
}

export interface AppEntry {
  slug: string;
  name: string;
  sector: string;
  headline: string;
  summary: string;
  audience: string[];
  highlights: string[];
  features: Array<{ title: string; text: string }>;
  shots: AppShot[];
  /** Colours of the app itself, so its card and page look like it */
  theme: { bg: string; panel: string; text: string; muted: string; line: string; accent: string; accentText: string };
  links: { demo: string; signUp: string; apk: string };
}

export const APPS: AppEntry[] = [
  {
    slug: "autopro",
    name: "AutoPro",
    sector: "Oto detailing ve oto kuaför",
    headline: "Araç plakayla gelir, gerisini atölye panosu takip eder.",
    summary:
      "Kabulden teslime detailing atölyesinin bütün işi: hasar ve boya kaydı, PPF ve seramik ayrıntıları, müşteriye takip bağlantısı, garanti belgesi ve kasa.",
    audience: ["Detailing stüdyoları", "Oto kuaförler", "Oto yıkamalar", "PPF ve cam filmi uygulayıcıları"],
    highlights: ["Plakayla kabul ve araç geçmişi", "Hasar şeması ve boya ölçümü", "Atölye panosu ve garanti belgesi"],
    features: [
      { title: "Plakayla kabul", text: "Plakayı yazın; müşteri, araç ve geçmiş işler gelir. Fiyatlar araç sınıfına göre hesaplanır." },
      { title: "Hasar ve boya kaydı", text: "Araç şemasında hasarı işaretleyin, fotoğraflayın, boya kalınlığını yazın. Müşteri kaydı bağlantıdan onaylar." },
      { title: "Detailing ayrıntıları", text: "PPF bölgeleri, seramik katı, cam filmi geçirgenliği, ürün ve garanti süresi işle birlikte saklanır." },
      { title: "Atölye panosu", text: "Hangi araç hangi aşamada, hangi usta ve istasyonda; tek ekranda görünür." },
      { title: "Müşteriye takip bağlantısı", text: "Müşteri üye olmadan aracının durumunu, önceki ve sonraki fotoğrafları görür." },
      { title: "Garanti belgesi", text: "Atölyenin girdiği garantiler teslimde belgeye dönüşür, müşteri bağlantıdan açar veya yazdırır." },
      { title: "Randevu takvimi", text: "İstasyonlara göre plan yapın; aynı saate iki araç yazılınca uyarı alın." },
      { title: "Kasa ve usta primi", text: "Gelir, gider ve net; günlük, aylık, yıllık. Primler teslim edilen işlerden hesaplanır." },
    ],
    shots: [
      { file: "bugun", title: "Bugün", text: "Günün özeti ve sıradaki işler" },
      { file: "atolye", title: "Atölye panosu", text: "Araçlar aşamalara göre" },
      { file: "hasar", title: "Hasar şeması", text: "Kabulde kayda geçenler" },
      { file: "belge", title: "Garanti belgesi", text: "Müşterinin açtığı belge" },
      { file: "hizmetler", title: "Hizmetler", text: "Fiyat, süre ve garanti" },
      { file: "kasa", title: "Kasa", text: "Gelir, gider ve net" },
    ],
    theme: { bg: "#0b0e14", panel: "#171c26", text: "#f8fafc", muted: "#a3aebd", line: "#2b3447", accent: "#ffb020", accentText: "#140d00" },
    links: {
      demo: "https://autopro.kodleon.com/",
      signUp: "https://autopro.kodleon.com/kayit",
      apk: "https://autopro.kodleon.com/AutoPro.apk",
    },
  },
  {
    slug: "laundrypro",
    name: "LaundryPro",
    sector: "Halı yıkama ve çamaşırhane",
    headline: "Halı evden alınır, rotası hazırdır, müşteri nerede olduğunu bilir.",
    summary:
      "Halı yıkama ve kuru temizleme için sipariş, QR etiket, şoför rotası, WhatsApp takip bağlantısı ve kasa; ofiste ve sahada aynı uygulama.",
    audience: ["Halı yıkamacılar", "Çamaşırhaneler", "Kuru temizlemeciler", "Koltuk ve perde yıkamacılar"],
    highlights: ["Alınacak ve dağıtılacak işler için rota", "QR kodlu fiş ve halı etiketi", "Müşteriye canlı takip bağlantısı"],
    features: [
      { title: "Sipariş akışı", text: "Alınacaktan teslime her sipariş nerede, ana ekranda sayılarıyla görünür." },
      { title: "Şoför rotası", text: "Alınacak ve dağıtılacak adresler en kısa sıraya konur, tek dokunuşla haritada açılır." },
      { title: "QR fiş ve etiket", text: "Termal fiş ve halı etiketi yazdırın; telefon kamerasıyla okutunca sipariş açılır." },
      { title: "WhatsApp takip bağlantısı", text: "Müşteri üye olmadan siparişinin hangi aşamada olduğunu görür." },
      { title: "Kasa ve giderler", text: "Tahsilat, yakıt ve malzeme giderleri; günlük özet ve aylık rapor." },
      { title: "Veresiye takibi", text: "Kimden ne kadar alınacağı ana ekranda ve müşteri kartında." },
    ],
    shots: [
      { file: "panel", title: "Ana ekran", text: "Bugün ne yapılacak" },
      { file: "rota", title: "Rota", text: "En kısa sırayla adresler" },
      { file: "siparisler", title: "Siparişler", text: "Duruma göre liste" },
      { file: "takip", title: "Müşteri takibi", text: "Üyeliksiz bağlantı" },
      { file: "kasa", title: "Kasa", text: "Gelir, gider ve net" },
      { file: "musteriler", title: "Müşteriler", text: "Geçmiş ve bakiye" },
    ],
    theme: { bg: "#0a5c99", panel: "#0d6cb3", text: "#ffffff", muted: "#d3e6f5", line: "#3f89c0", accent: "#ffffff", accentText: "#0a4a7a" },
    links: {
      demo: "https://laundry.kodleon.com/",
      signUp: "https://laundry.kodleon.com/",
      apk: "https://laundry.kodleon.com/LaundryPro.apk",
    },
  },
];

/** Sectors planned next. Not promises of a date: shown as "tell us if this is your trade" */
export const NEXT_SECTORS = [
  { name: "Teknik servis", text: "Kombi, beyaz eşya, telefon" },
  { name: "Lostra ve sneaker", text: "Ayakkabı ve çanta bakımı" },
  { name: "Su ve tüp dağıtımı", text: "Sipariş ve dağıtım rotası" },
  { name: "Evcil hayvan kuaförü", text: "Randevu ve müşteri kartı" },
];

export const findApp = (slug: string) => APPS.find((a) => a.slug === slug);
export const shotSrc = (app: AppEntry, file: string) => `/apps/${app.slug}/${file}.webp`;
