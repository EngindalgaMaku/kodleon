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
  /** Announced but not open yet: no demo, sign-up or APK links, its buttons ask to be told */
  soon?: boolean;
  sector: string;
  /** What people type into Google; used in the page title and heading */
  searchName: string;
  headline: string;
  summary: string;
  audience: string[];
  highlights: string[];
  features: Array<{ title: string; text: string }>;
  shots: AppShot[];
  /** The home page walks through these screens */
  tour: AppShot[];
  /** Longer text for people searching for this kind of program */
  guide: Array<{ title: string; text: string[] }>;
  /** The opening of the home page: the notebook lines (made-up examples) and what each becomes in the app */
  story: {
    choice: string;
    pain: string;
    screen: string;
    lines: Array<{ note: string; card: string; detail: string }>;
  };
  /** Colours of the app itself, so its card and page look like it */
  theme: { bg: string; panel: string; text: string; muted: string; line: string; accent: string; accentText: string };
  links: { demo: string; signUp: string; apk: string };
}

export const APPS: AppEntry[] = [
  {
    slug: "autopro",
    name: "AutoPro",
    sector: "Oto detailing ve oto kuaför",
    searchName: "Oto yıkama ve detailing programı",
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
    tour: [
      {
        "file": "bugun",
        "title": "Güne bakın",
        "text": "Atölyede kaç araç var, hangisi teslime hazır, bugün kim gelecek; açar açmaz görünür."
      },
      {
        "file": "hasar",
        "title": "Aracı kayda alın",
        "text": "Plakayı yazın. Hasarı şemada işaretleyip fotoğraflayın, boya kalınlığını girin. Müşteri bağlantıdan onaylar."
      },
      {
        "file": "atolye",
        "title": "İşi takip edin",
        "text": "Araç yıkamadan detailinge, son kontrolden teslime panoda ilerler. Usta ve istasyon üzerinde yazar."
      },
      {
        "file": "belge",
        "title": "Garantiyle teslim edin",
        "text": "Girdiğiniz ürün ve garanti süresi belgeye dönüşür. Müşteri bağlantıdan açar, isterse yazdırır."
      }
    ],
    guide: [
      {
        "title": "Oto yıkama ve detailing programı ne işe yarar?",
        "text": [
          "Detailing atölyesinde iş yalnızca aracı temizlemek değildir. Araç geldiğinde üzerindeki çizik kayda geçmezse teslimde tartışma çıkar. Seramik veya PPF yapıldığında hangi ürünün, kaç kat, ne kadar garantiyle uygulandığı aylar sonra sorulur. Müşteri de gün içinde aracının ne durumda olduğunu öğrenmek için arar.",
          "AutoPro bu işleri tek yerde toplar. Araç plakayla açılır; önceki işleri, müşterisi ve borcu karşınıza gelir. Fiyatlar sedan, SUV gibi araç sınıfına göre hesaplanır, fiyat listesini atölye kendisi belirler."
        ]
      },
      {
        "title": "Hasar kaydı neden önemli?",
        "text": [
          "Teslimde çıkan \"bu çizik yoktu\" tartışması, kabulde birkaç dakikalık kayıtla önlenebilir. AutoPro'da hasarı araç şemasında işaretler, fotoğrafını çeker, boya kalınlığı ölçümünü parça parça yazarsınız. Müşteri aynı kaydı kendi telefonundan görür ve onaylar; onaydan sonra kayıt değiştirilemez."
        ]
      },
      {
        "title": "Müşteri sizi aramadan aracının durumunu görür",
        "text": [
          "Her iş için üyelik gerektirmeyen bir takip bağlantısı oluşur ve WhatsApp'tan tek dokunuşla gönderilir. Müşteri aracının hangi aşamada olduğunu, yapılan işleri, kalan ödemeyi ve varsa önceki ve sonraki fotoğrafları görür. Teslimden sonra garanti belgesi de aynı bağlantıdadır."
        ]
      }
    ],
    story: {
      choice: "Oto yıkama, detailing",
      pain: "\"Bu çizik yoktu\" tartışması, unutulan garanti süresi, gün boyu çalan telefon.",
      screen: "bugun",
      lines: [
        { note: "34 ABC 789 sol kapı çizik?", card: "Hasar kaydı", detail: "Şemada işaretli, müşteri onayladı" },
        { note: "seramik garantisi kaç yıldı??", card: "Garanti belgesi", detail: "Ürün ve süre işle birlikte saklanır" },
        { note: "Mehmet bey yine aradı: hazır mı?", card: "Takip bağlantısı", detail: "Müşteri durumu kendisi görür" },
      ],
    },
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
    searchName: "Halı yıkama ve çamaşırhane programı",
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
    tour: [
      {
        "file": "panel",
        "title": "Güne bakın",
        "text": "Kaç halı alınacak, kaçı yıkamada, kaçı dağıtılacak, kimden ne kadar alacağınız var; ana ekranda sayılarıyla."
      },
      {
        "file": "siparisler",
        "title": "Siparişi yazın",
        "text": "Müşteriyi seçin, işi girin. Sipariş alınacaktan teslime kadar duruma göre listelenir."
      },
      {
        "file": "rota",
        "title": "Rotayı çizin",
        "text": "Alınacak ve dağıtılacak adresler en kısa sıraya konur. Şoför tek dokunuşla haritada açar, teslimi oradan işaretler."
      },
      {
        "file": "takip",
        "title": "Müşteri takip etsin",
        "text": "Müşteri bağlantıyı açar, halısının hangi aşamada olduğunu üye olmadan görür."
      }
    ],
    guide: [
      {
        "title": "Halı yıkama programı ne işe yarar?",
        "text": [
          "Halı yıkamada işin büyük kısmı yolda döner: adresten alınır, yıkamaya girer, kurur, yeniden adrese gider. Defterle çalışınca hangi halının nerede olduğu, şoförün bugün nereye gideceği ve kimden ne kadar alınacağı kafada kalır. Müşteri de \"halım ne zaman gelir?\" diye arar.",
          "LaundryPro siparişi, müşteriyi, rotayı ve kasayı aynı yerde tutar. Ofiste yazılan sipariş şoförün telefonunda görünür; şoför teslimi işaretlediğinde ofis de görür."
        ]
      },
      {
        "title": "Şoför rotası nasıl çalışır?",
        "text": [
          "Rota ekranı alınacak ve dağıtılacak adresleri toplar, işletmeden başlayarak en kısa sıraya koyar ve yaklaşık mesafeyi gösterir. Sırayı elle değiştirebilir, tüm rotayı tek dokunuşla haritada açabilirsiniz. Her durakta aramak, yol tarifi almak ve alındı ya da teslim edildi demek tek dokunuştur."
        ]
      },
      {
        "title": "QR etiket karışıklığı azaltır",
        "text": [
          "Termal fiş ve halı etiketi QR kodlu yazdırılır. Telefon kamerasıyla okutunca sipariş açılır, böylece yıkamada ya da depoda hangi halının kime ait olduğunu aramak gerekmez. Müşteriye de fişteki kodla ya da WhatsApp'tan gönderilen bağlantıyla kendi siparişini izleme imkânı verir."
        ]
      }
    ],
    story: {
      choice: "Halı yıkama, çamaşırhane",
      pain: "Yanlış yazılan adres, sabah çıkarılan rota, defterin arkasında kalan veresiye.",
      screen: "panel",
      lines: [
        { note: "Ayşe H. 2 halı, adres neydi?", card: "Sipariş", detail: "Adres ve halılar kayıtlı" },
        { note: "önce Kadıköy mü? şoföre sor", card: "Rota", detail: "Adresler en kısa sırada" },
        { note: "borç 500 mü 600 mü?", card: "Veresiye", detail: "Kimden ne alınacağı ana ekranda" },
      ],
    },
    theme: { bg: "#0a5c99", panel: "#0d6cb3", text: "#ffffff", muted: "#d3e6f5", line: "#3f89c0", accent: "#ffffff", accentText: "#0a4a7a" },
    links: {
      demo: "https://laundry.kodleon.com/",
      signUp: "https://laundry.kodleon.com/?kayit=1",
      apk: "https://laundry.kodleon.com/LaundryPro.apk",
    },
  },
  {
    slug: "petpro",
    name: "PetPro",
    soon: true,
    sector: "Pet kuaförü",
    searchName: "Pet kuaför programı",
    headline: "Kesim notu, alerji ve randevu tek kartta; sahibi de bakımı takip eder.",
    summary:
      "Pet kuaförleri için online randevu, hayvan kartı, kabul muayenesi, salon panosu, sahibine takip bağlantısı, bakım karnesi ve kasa.",
    audience: ["Pet kuaförleri", "Köpek ve kedi bakım salonları", "Petshop içindeki kuaförler"],
    highlights: ["Müşteri boş saati görür, siz onaylarsınız", "Hayvan kartı ve geçen seferki kesim", "Kabul muayenesi ve bakım karnesi"],
    features: [
      { title: "Online randevu", text: "Instagram'a koyacağınız bağlantıdan müşteri boş saatleri görür, talep bırakır. Siz onaylarsınız, ödeme alınmaz." },
      { title: "Hayvan kartı", text: "Irk, boy, mizaç, alerji, aşı bitiş tarihi ve kilo; aşısı geçmiş hayvanda uyarı çıkar." },
      { title: "Geçen seferki kesim", text: "Sahibinin telefonunu yazınca hayvanı gelir. Kesim, uzunluk ve şampuan önceki ziyaretten görünür." },
      { title: "Kabul muayenesi", text: "Keçe, kızarıklık, pire gibi gördüklerinizi vücut şemasında işaretleyin. Sahibi bağlantıdan onaylar. Kayıt teşhis değildir." },
      { title: "Salon panosu", text: "Kim yıkamada, kim masada, kim hazır; kuaför ve istasyonuyla tek ekranda." },
      { title: "Sahibine takip bağlantısı", text: "Hayvanın sahibi üye olmadan bakımın hangi aşamada olduğunu ve kalan tutarı görür." },
      { title: "Bakım karnesi", text: "Teslimden sonra ziyaretler, yapılan işler ve sıradaki bakım tarihi aynı bağlantıda." },
      { title: "Kasa ve kuaför primi", text: "Gelir, gider ve net; primler teslim edilen işlerden hesaplanır." },
    ],
    shots: [
      { file: "bugun", title: "Bugün", text: "Günün özeti ve sıradaki işler" },
      { file: "salon", title: "Salon panosu", text: "Hayvanlar aşamalara göre" },
      { file: "randevu", title: "Online randevu", text: "Müşterinin gördüğü sayfa" },
      { file: "muayene", title: "Kabul muayenesi", text: "Vücut şemasında işaretler" },
      { file: "karne", title: "Bakım karnesi", text: "Sahibinin açtığı sayfa" },
      { file: "kasa", title: "Kasa", text: "Gelir, gider ve net" },
    ],
    tour: [
      { file: "randevu", title: "Randevu gelsin", text: "Müşteri bağlantıdan hizmeti ve boş saati seçer. Talep onayınıza düşer." },
      { file: "bugun", title: "Güne bakın", text: "Salonda kim var, kim hazır, bugün kim gelecek; açar açmaz görünür." },
      { file: "muayene", title: "Hayvanı kayda alın", text: "Gördüklerinizi vücut şemasında işaretleyin. Sahibi bağlantıdan onaylar." },
      { file: "karne", title: "Karneyle teslim edin", text: "Yapılan işler ve sıradaki bakım tarihi sahibinin bağlantısında durur." },
    ],
    guide: [
      {
        title: "Pet kuaför programı ne işe yarar?",
        text: [
          "Pet kuaförlüğünde iş tıraşla bitmez. Geçen sefer kaç milimetre kesildiği, hangi şampuanın dokunduğu, hayvanın ısırıp ısırmadığı kuaförün aklında kalır. Randevular Instagram mesajlarına dağılır, müşteri de gün içinde bakımın ne durumda olduğunu sormak için arar.",
          "PetPro bu işleri tek yerde toplar. Sahibinin telefonunu yazınca hayvanları ve son bakımı gelir. Fiyatlar kediden dev köpeğe boy sınıfına göre hesaplanır, fiyat listesini salon kendisi belirler.",
        ],
      },
      {
        title: "Online randevu nasıl çalışır?",
        text: [
          "Her salonun bir bağlantısı olur. Müşteri üye olmadan hayvanının boyunu ve hizmeti seçer, işin süresine göre hesaplanan boş saatleri görür ve talep bırakır. Talep o saati tutar, salon onaylayınca randevu kesinleşir. Çalışma saatlerini ve kapalı günleri salon belirler.",
        ],
      },
      {
        title: "Kabul muayenesi neden önemli?",
        text: [
          "Hayvan geldiğinde görülen keçe, kızarıklık ya da pire kayda geçmezse teslimde tartışma çıkabilir. PetPro'da bunları vücut şemasında işaretler, fotoğrafını çekersiniz; sahibi kendi telefonundan görür ve onaylar. Bu kayıt teşhis değildir, kuaförün gördüğünü not eder.",
        ],
      },
    ],
    story: {
      choice: "Pet kuaförü",
      pain: "Kağıtta kalan kesim notu, unutulan alerji, mesajlarda kaybolan randevu.",
      screen: "bugun",
      lines: [
        { note: "Pamuk geçen sefer kaç mm'ydi?", card: "Kesim geçmişi", detail: "Kabulde kendiliğinden gelir" },
        { note: "Zeytin'in alerjisi vardı sanki", card: "Hayvan kartı", detail: "Irk, mizaç, alerji, aşı tarihi" },
        { note: "Instagram'dan yazdılar: yarın?", card: "Online randevu", detail: "Boş saati görür, siz onaylarsınız" },
      ],
    },
    theme: { bg: "#0f3d3e", panel: "#14504f", text: "#ffffff", muted: "#b9dcd8", line: "#2f7472", accent: "#2dd4bf", accentText: "#04201c" },
    links: { demo: "", signUp: "", apk: "" },
  },
];

/** Sectors planned next. Not promises of a date: requests for them decide the order */
export const NEXT_SECTORS = [
  { slug: "oto-tamir", name: "Oto tamir" },
  { slug: "teknik-servis", name: "Teknik servis" },
  { slug: "temizlik", name: "Ev ve ofis temizliği" },
  { slug: "lostra", name: "Lostra ve sneaker" },
  { slug: "su-tup", name: "Su ve tüp dağıtımı" },
];

export const findApp = (slug: string) => APPS.find((a) => a.slug === slug);
export const shotSrc = (app: AppEntry, file: string) => `/apps/${app.slug}/${file}.webp`;
