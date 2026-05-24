import { Laptop } from "../types";

export const LAPTOP_DATABASE: Laptop[] = [
  {
    id: "asus-rog-zephyrus-g14",
    name: "ASUS ROG Zephyrus G14 (2026)",
    brand: "ASUS",
    processor: "AMD Ryzen 9 8945HS (8 Cores, up to 5.2 GHz)",
    gpu: "NVIDIA GeForce RTX 4070 Laptop GPU 8GB GDDR6",
    ram: "32GB LPDDR5X Dual Channel",
    storage: "1TB NVMe PCIe Gen 4 SSD",
    display: "14.0\" 3K (2880 x 1800) ROG Nebula OLED",
    refreshRate: "120Hz",
    battery: "73 Wh Li-Polymer (up to 9 hours)",
    weight: "1.50 kg",
    os: "Windows 11 Home",
    releaseYear: 2026,
    price: 32490000, // Rp 32.490.000
    category: "Flagship",
    pros: [
      "Layar OLED Nebula 3K luar biasa",
      "Sangat ringan dan mudah dibawa (1.5kg)",
      "Performa CPU dan GPU sangat bertenaga",
      "Kualitas audio premium dengan 6 speaker"
    ],
    cons: [
      "Suhu cukup panas saat beban penuh",
      "RAM disolder (tidak dapat di-upgrade)",
      "Harga relatif premium"
    ],
    bestFor: ["Gaming", "Editing", "Programming", "Content Creation"],
    benchmark: {
      cpu: 92,
      gpu: 88,
      battery: 78,
      display: 96
    },
    colorHex: "#3b82f6" // blue
  },
  {
    id: "lenovo-legion-pro-5i",
    name: "Lenovo Legion Pro 5i (2026)",
    brand: "Lenovo",
    processor: "Intel Core i7-14700HX (20 Cores, 28 Threads)",
    gpu: "NVIDIA GeForce RTX 4060 Laptop GPU 8GB GDDR6",
    ram: "16GB DDR5 5600MHz (Upgradeable)",
    storage: "1TB M.2 PCIe Gen 4 NVMe SSD",
    display: "16.0\" WQXGA (2560 x 1600) IPS Anti-glare",
    refreshRate: "240Hz",
    battery: "80 Wh Li-ion (up to 5 hours)",
    weight: "2.50 kg",
    os: "Windows 11 Home",
    releaseYear: 2026,
    price: 22990000, // Rp 22.990.000
    category: "Midrange",
    pros: [
      "Keyboard TrueStrike legendaris dan sangat nyaman",
      "Layar 240Hz dengan response time sangat cepat",
      "Sistem pendingin Coldfront 5.0 luar biasa",
      "RAM dan Storage mudah di-upgrade"
    ],
    cons: [
      "Adaptor charger cukup besar dan berat",
      "Masa pakai baterai relatif pendek",
      "Desain bodi cenderung tebal dan agak berat"
    ],
    bestFor: ["Gaming", "Programming", "Editing"],
    benchmark: {
      cpu: 89,
      gpu: 76,
      battery: 55,
      display: 82
    },
    colorHex: "#6366f1" // indigo
  },
  {
    id: "macbook-air-m3",
    name: "Apple MacBook Air 13\" M3",
    brand: "Apple",
    processor: "Apple M3 Chip (8-Core CPU)",
    gpu: "Apple 10-Core Integrated GPU",
    ram: "16GB Unified Memory",
    storage: "512GB Superfast SSD",
    display: "13.6\" Liquid Retina Display (2560 x 1664)",
    refreshRate: "60Hz",
    battery: "52.6 Wh Lithium-polymer (up to 18 hours)",
    weight: "1.24 kg",
    os: "macOS Sequoia",
    releaseYear: 2025,
    price: 19999000, // Rp 19.999.000
    category: "Midrange",
    pros: [
      "Daya tahan baterai legendaris (hingga 18 jam)",
      "Sangat tipis dan ringan (hanya 1.24kg)",
      "Kualitas bodi aluminium kokoh tanpa kipas (hening)",
      "Ekosistem Apple yang sangat matang"
    ],
    cons: [
      "Tidak mendukung refresh rate tinggi (hanya 60Hz)",
      "Sama sekali tidak bisa di-upgrade",
      "Hanya mendukung maksimal dua layar eksternal"
    ],
    bestFor: ["Kuliah", "Office", "Programming", "Editing"],
    benchmark: {
      cpu: 85,
      gpu: 62,
      battery: 98,
      display: 90
    },
    colorHex: "#14b8a6" // teal
  },
  {
    id: "lenovo-ideapad-slim-3",
    name: "Lenovo IdeaPad Slim 3 14",
    brand: "Lenovo",
    processor: "AMD Ryzen 5 7520U (4 Cores, 8 Threads)",
    gpu: "AMD Radeon 610M Graphics (Integrated)",
    ram: "8GB LPDDR5 5500MHz (Soldered)",
    storage: "512GB SSD M.2 PCIe Gen 4 NVMe",
    display: "14.0\" FHD (1920 x 1080) IPS",
    refreshRate: "60Hz",
    battery: "47 Wh Li-Polymer (up to 8 hours)",
    weight: "1.43 kg",
    os: "Windows 11 Home",
    releaseYear: 2025,
    price: 6499000, // Rp 6.499.000
    category: "Entry Level",
    pros: [
      "Harga sangat terjangkau",
      "Layar IPS FHD yang cukup nyaman untuk mata",
      "Keyboard nyaman khas Lenovo",
      "Baterai tahan lama dengan daya hemat"
    ],
    cons: [
      "RAM 8GB tidak dapat di-upgrade",
      "Performa grafis sangat standar (tidak cocok gaming berat)",
      "Material bodi utama plastik"
    ],
    bestFor: ["Kuliah", "Office", "Programming"],
    benchmark: {
      cpu: 48,
      gpu: 20,
      battery: 75,
      display: 55
    },
    colorHex: "#64748b" // slate
  },
  {
    id: "acer-aspire-lite",
    name: "Acer Aspire Lite 14",
    brand: "Acer",
    processor: "Intel Core i3-1215U (6 Cores, 8 Threads)",
    gpu: "Intel UHD Graphics",
    ram: "8GB DDR4 3200MHz (Upgradeable)",
    storage: "512GB M.2 PCIe NVMe SSD",
    display: "14.0\" WUXGA (1920 x 1200) IPS Aspect 16:10",
    refreshRate: "60Hz",
    battery: "58 Wh Li-Polymer (up to 7.5 hours)",
    weight: "1.40 kg",
    os: "Windows 11 Home",
    releaseYear: 2025,
    price: 5299000, // Rp 5.299.000
    category: "Entry Level",
    pros: [
      "Harga luar biasa ekonomis",
      "Rasio layar 16:10 yang modern untuk produktivitas",
      "RAM bisa di-upgrade jika dibutuhkan",
      "Ringan dan berukuran ringkas"
    ],
    cons: [
      "Kecerahan layar agak kurang di bawah terik matahari",
      "Keyboard tidak dilengkapi backlight",
      "Desain bodi minimalis standar"
    ],
    bestFor: ["Kuliah", "Office"],
    benchmark: {
      cpu: 45,
      gpu: 18,
      battery: 72,
      display: 52
    },
    colorHex: "#0ea5e9" // sky
  },
  {
    id: "msi-modern-14",
    name: "MSI Modern 14 C13M",
    brand: "MSI",
    processor: "Intel Core i5-1335U (10 Cores, 12 Threads)",
    gpu: "Intel Iris Xe Graphics",
    ram: "16GB DDR4 3200MHz (Dual Channel)",
    storage: "512GB NVMe PCIe Gen 3 SSD",
    display: "14.0\" FHD (1920 x 1080) IPS-Level",
    refreshRate: "60Hz",
    battery: "39.3 Wh (up to 6 hours)",
    weight: "1.40 kg",
    os: "Windows 11 Home",
    releaseYear: 2025,
    price: 8499000, // Rp 8.499.000
    category: "Entry Level",
    pros: [
      "RAM 16GB bawaan sudah Dual Channel",
      "Performa Core i5 Generasi ke-13 yang andal",
      "Desain sleek dengan warna premium",
      "Keyboard memiliki backlight"
    ],
    cons: [
      "Kapasitas baterai relatif kecil",
      "Speaker agak kurang bertenaga",
      "Akurasi warna layar standar (45% NTSC)"
    ],
    bestFor: ["Kuliah", "Office", "Programming"],
    benchmark: {
      cpu: 68,
      gpu: 38,
      battery: 62,
      display: 58
    },
    colorHex: "#ec4899" // pink
  },
  {
    id: "hp-victus-15",
    name: "HP Victus 15 (2026)",
    brand: "HP",
    processor: "AMD Ryzen 5 8645HS (6 Cores, up to 5.0 GHz)",
    gpu: "NVIDIA GeForce RTX 4050 Laptop GPU 6GB GDDR6",
    ram: "16GB DDR5 5600MHz (Dual Channel)",
    storage: "512GB PCIe Gen4 NVMe M.2 SSD",
    display: "15.6\" FHD (1920 x 1080) IPS 144Hz",
    refreshRate: "144Hz",
    battery: "70 Wh (up to 6.5 hours)",
    weight: "2.29 kg",
    os: "Windows 11 Home",
    releaseYear: 2026,
    price: 13999000, // Rp 13.999.000
    category: "Midrange",
    pros: [
      "Value for money yang luar biasa untuk laptop gaming RTX 40-Series",
      "Layar 144Hz sangat responsif",
      "Desain stylish minimalis cocok juga dibawa ngantor/kuliah",
      "Kualitas keyboard ergonomis dengan numpad"
    ],
    cons: [
      "Akurasi warna layar standar untuk desain grafis profesional",
      "Kualitas engsel layar sedikit goyang (screen wobble)",
      "Storage bawaan hanya 512GB (butuh upgrade untuk game AAA)"
    ],
    bestFor: ["Gaming", "Editing", "Programming", "Kuliah"],
    benchmark: {
      cpu: 75,
      gpu: 65,
      battery: 65,
      display: 68
    },
    colorHex: "#f59e0b" // amber
  },
  {
    id: "acer-predator-helios-neo-16",
    name: "Acer Predator Helios Neo 16 (2026)",
    brand: "Acer",
    processor: "Intel Core i7-14650HX (16 Cores, up to 5.2 GHz)",
    gpu: "NVIDIA GeForce RTX 4060 Laptop GPU 8GB GDDR6",
    ram: "16GB DDR5 5600MHz (Upgradeable)",
    storage: "1TB PCIe NVMe Gen 4 SSD",
    display: "16.0\" WQXGA (2560 x 1600) IPS 165Hz (100% sRGB)",
    refreshRate: "165Hz",
    battery: "90 Wh (up to 5.5 hours)",
    weight: "2.60 kg",
    os: "Windows 11 Home",
    releaseYear: 2026,
    price: 18999000, // Rp 18.999.000
    category: "Midrange",
    pros: [
      "Layar IPS 100% sRGB yang akurat untuk kreator konten",
      "TGP (Total Graphics Power) maksimal untuk performa RTX 4060 optimal",
      "Kapasitas baterai besar (90 Wh)",
      "Keyboard RGB 4-Zone yang memukau"
    ],
    cons: [
      "Cukup tebal dan berat saat dibawa bepergian",
      "Kipas pendingin sangat bising dalam mode Turbo",
      "Material sasis bagian bawah dari plastik"
    ],
    bestFor: ["Gaming", "Editing", "Content Creation", "Programming"],
    benchmark: {
      cpu: 86,
      gpu: 78,
      battery: 60,
      display: 86
    },
    colorHex: "#8b5cf6" // purple
  },
  {
    id: "msi-raider-ge78-hx",
    name: "MSI Raider GE78 HX (2026)",
    brand: "MSI",
    processor: "Intel Core i9-14900HX (24 Cores, 32 Threads)",
    gpu: "NVIDIA GeForce RTX 4080 Laptop GPU 12GB GDDR6",
    ram: "32GB (16GB*2) DDR5 5600MHz",
    storage: "2TB PCIe Gen4 NVMe M.2 SSD",
    display: "17.0\" QHD+ (2560 x 1600) IPS 240Hz (100% DCI-P3)",
    refreshRate: "240Hz",
    battery: "99.9 Wh (Maksimal untuk Pesawat) (up to 4.5 hours)",
    weight: "3.10 kg",
    os: "Windows 11 Home",
    releaseYear: 2026,
    price: 48999000, // Rp 48.999.000
    category: "Flagship",
    pros: [
      "Performa monster i9-HX dan RTX 4080",
      "Desain RGB bar depan legendaris MSI Mystic Light",
      "Kapasitas baterai maksimal 99.9 Wh",
      "Penyimpanan super lega 2TB SSD Gen 4"
    ],
    cons: [
      "Sangat berat (3.1 kg laptop + 1 kg charger)",
      "Konsumsi daya listrik sangat tinggi",
      "Suara kipas maksimal terdengar seperti jet"
    ],
    bestFor: ["Gaming", "Editing", "Content Creation", "Programming"],
    benchmark: {
      cpu: 98,
      gpu: 96,
      battery: 45,
      display: 92
    },
    colorHex: "#ef4444" // red
  },
  {
    id: "dell-xps-14",
    name: "Dell XPS 14 (9440)",
    brand: "Dell",
    processor: "Intel Core Ultra 7 155H (16 Cores, up to 4.8 GHz)",
    gpu: "NVIDIA GeForce RTX 4050 Laptop GPU 6GB GDDR6",
    ram: "32GB LPDDR5X Dual Channel",
    storage: "1TB M.2 PCIe NVMe SSD",
    display: "14.5\" 3.2K (3200 x 2000) InfinityEdge OLED Touch",
    refreshRate: "120Hz",
    battery: "69.5 Wh (up to 8.5 hours)",
    weight: "1.68 kg",
    os: "Windows 11 Home",
    releaseYear: 2026,
    price: 36999000, // Rp 36.999.000
    category: "Flagship",
    pros: [
      "Desain futuristik ultra-premium dengan Glass Touchpad tak kasatmata",
      "Layar sentuh OLED 3.2K dengan bezel super tipis InfinityEdge",
      "Sasis aluminium CNC yang sangat kokoh",
      "Keyboard Seamless Lattice yang elegan"
    ],
    cons: [
      "Port koneksi sangat terbatas (hanya USB-C/Thunderbolt)",
      "Tidak ada jack HDMI atau USB-A bawaan",
      "Harga sangat mahal dibanding performa murni"
    ],
    bestFor: ["Editing", "Programming", "Office", "Content Creation"],
    benchmark: {
      cpu: 82,
      gpu: 66,
      battery: 74,
      display: 98
    },
    colorHex: "#10b981" // emerald
  },
  {
    id: "hp-pavilion-14",
    name: "HP Pavilion 14 Plus (2025)",
    brand: "HP",
    processor: "AMD Ryzen 7 7840U (8 Cores, up to 5.1 GHz)",
    gpu: "AMD Radeon 780M Graphics (Integrated)",
    ram: "16GB LPDDR5X 6400MHz (Soldered)",
    storage: "1TB PCIe NVMe M.2 SSD",
    display: "14.0\" 2.8K (2880 x 1800) OLED 120Hz (100% DCI-P3)",
    refreshRate: "120Hz",
    battery: "68 Wh (up to 10 hours)",
    weight: "1.44 kg",
    os: "Windows 11 Home",
    releaseYear: 2025,
    price: 12499000, // Rp 12.499.000
    category: "Midrange",
    pros: [
      "Layar OLED 2.8K 120Hz yang sangat jernih dan responsif",
      "Grafis terintegrasi Radeon 780M setara GPU diskrit level awal",
      "Bodi full metal yang kokoh dan stylish",
      "Storage melimpah 1TB SSD"
    ],
    cons: [
      "RAM disolder tidak bisa di-upgrade",
      "Suhu menghangat pada bodi aluminium saat rendering video",
      "Webcam penutup manualnya terasa ringkih"
    ],
    bestFor: ["Kuliah", "Programming", "Office", "Editing"],
    benchmark: {
      cpu: 78,
      gpu: 45,
      battery: 82,
      display: 92
    },
    colorHex: "#84cc16" // lime
  },
  {
    id: "asus-tuf-gaming-f15",
    name: "ASUS TUF Gaming F15 (2026)",
    brand: "ASUS",
    processor: "Intel Core i7-13620H (10 Cores, 16 Threads)",
    gpu: "NVIDIA GeForce RTX 4060 Laptop GPU 8GB GDDR6",
    ram: "16GB DDR5 4800MHz (Upgradeable)",
    storage: "512GB PCIe NVMe Gen 4 SSD",
    display: "15.6\" FHD (1920 x 1080) Value IPS 144Hz",
    refreshRate: "144Hz",
    battery: "90 Wh (up to 7 hours)",
    weight: "2.20 kg",
    os: "Windows 11 Home",
    releaseYear: 2026,
    price: 16499000, // Rp 16.499.000
    category: "Midrange",
    pros: [
      "Ketahanan sasis berstandar militer MIL-STD-810H",
      "Baterai jumbo 90 Wh untuk kelas laptop gaming terjangkau",
      "Performa RTX 4060 sangat tangguh di resolusi Full HD",
      "Sirkulasi udara pendingin ganda yang optimal"
    ],
    cons: [
      "Saturasi warna layar agak pudar (62.5% sRGB)",
      "Desain bodi cenderung militaristik kaku",
      "Penyimpanan bawaan hanya 512GB"
    ],
    bestFor: ["Gaming", "Programming", "Kuliah"],
    benchmark: {
      cpu: 76,
      gpu: 74,
      battery: 70,
      display: 60
    },
    colorHex: "#eab308" // yellow
  }
];
