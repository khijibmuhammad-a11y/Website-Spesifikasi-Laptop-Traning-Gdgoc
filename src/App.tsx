import React, { useState, useEffect } from "react";
import { LAPTOP_DATABASE } from "./data/laptops";
import { Laptop, FilterState, SortingState } from "./types";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LaptopCard from "./components/LaptopCard";
import LaptopDetailModal from "./components/LaptopDetailModal";
import ComparePanel from "./components/ComparePanel";
import AIRecommendation from "./components/AIRecommendation";
import { Search, SlidersHorizontal, Cpu, Sparkles, GitCompare, Landmark, Trash2, ArrowRight, Star, RefreshCw, X } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [comparedLaptopIds, setComparedLaptopIds] = useState<string[]>([]);
  const [selectedLaptopForDetail, setSelectedLaptopForDetail] = useState<Laptop | null>(null);

  // Filter and Sorting State
  const [filters, setFilters] = useState<FilterState>({
    brand: "",
    maxPrice: 70000000,
    ram: "",
    gpuType: "",
    processorType: "",
    category: "",
    searchQuery: "",
  });

  const [sorting, setSorting] = useState<SortingState>({
    sortBy: "performance",
  });

  // Extract unique brands from database
  const brands = Array.from(new Set(LAPTOP_DATABASE.map((item) => item.brand)));

  // Currency utility formatter
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Compare handlers
  const handleToggleCompare = (id: string) => {
    if (comparedLaptopIds.includes(id)) {
      setComparedLaptopIds(comparedLaptopIds.filter((item) => item !== id));
    } else {
      if (comparedLaptopIds.length >= 4) {
        alert("Batas perbandingan maksimal adalah 4 laptop simultaneously.");
        return;
      }
      setComparedLaptopIds([...comparedLaptopIds, id]);
    }
  };

  const handleRemoveCompare = (id: string) => {
    setComparedLaptopIds(comparedLaptopIds.filter((item) => item !== id));
  };

  const handleClearCompare = () => {
    setComparedLaptopIds([]);
  };

  // Quick navigation helpers
  const handleBrandClick = (brandName: string) => {
    setFilters({
      ...filters,
      brand: brandName,
    });
    setActiveTab("database");
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  const handleExploreDatabase = () => {
    setActiveTab("database");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConsultAiNav = () => {
    setActiveTab("ai");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      brand: "",
      maxPrice: 70000000,
      ram: "",
      gpuType: "",
      processorType: "",
      category: "",
      searchQuery: "",
    });
    setSorting({ sortBy: "performance" });
  };

  // Filter & Logic
  const filteredLaptops = LAPTOP_DATABASE.filter((laptop) => {
    // 1. Search Query
    const searchMatch =
      filters.searchQuery === "" ||
      laptop.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      laptop.brand.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      laptop.processor.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      laptop.gpu.toLowerCase().includes(filters.searchQuery.toLowerCase());

    // 2. Brand
    const brandMatch = filters.brand === "" || laptop.brand === filters.brand;

    // 3. Max Price
    const priceMatch = laptop.price <= filters.maxPrice;

    // 4. RAM
    const ramMatch = filters.ram === "" || laptop.ram.includes(filters.ram);

    // 5. Category
    const categoryMatch = filters.category === "" || laptop.category === filters.category;

    // 6. GPU Classification
    let gpuMatch = true;
    if (filters.gpuType !== "") {
      const gpuLower = laptop.gpu.toLowerCase();
      if (filters.gpuType === "NVIDIA RTX") {
        gpuMatch = gpuLower.includes("nvidia") && gpuLower.includes("rtx");
      } else if (filters.gpuType === "AMD Radeon") {
        gpuMatch = gpuLower.includes("radeon") && !gpuLower.includes("integrated");
      } else if (filters.gpuType === "Integrated") {
        gpuMatch =
          gpuLower.includes("integrated") ||
          gpuLower.includes("intel uhd") ||
          gpuLower.includes("intel iris") ||
          gpuLower.includes("xe") ||
          gpuLower.includes("apple");
      }
    }

    // 7. CPU Classification
    let cpuMatch = true;
    if (filters.processorType !== "") {
      const cpuLower = laptop.processor.toLowerCase();
      if (filters.processorType === "Intel Core i5/Ryzen 5") {
        cpuMatch = cpuLower.includes("i5") || cpuLower.includes("7520u") || cpuLower.includes("8645hs") || cpuLower.includes("7840u");
      } else if (filters.processorType === "Intel Core i7/Ryzen 7") {
        cpuMatch = cpuLower.includes("i7") || cpuLower.includes("ultra 7");
      } else if (filters.processorType === "Intel Core i9/Ryzen 9") {
        cpuMatch = cpuLower.includes("i9") || cpuLower.includes("ryzen 9") || cpuLower.includes("8945hs") || cpuLower.includes("14900hx");
      } else if (filters.processorType === "Apple M-Series") {
        cpuMatch = cpuLower.includes("apple") || cpuLower.includes("m3");
      }
    }

    return searchMatch && brandMatch && priceMatch && ramMatch && categoryMatch && gpuMatch && cpuMatch;
  });

  // Sorting logic
  const sortedLaptops = [...filteredLaptops].sort((a, b) => {
    if (sorting.sortBy === "price_asc") {
      return a.price - b.price;
    }
    if (sorting.sortBy === "price_desc") {
      return b.price - a.price;
    }
    if (sorting.sortBy === "performance") {
      return (b.benchmark.cpu + b.benchmark.gpu) - (a.benchmark.cpu + a.benchmark.gpu);
    }
    if (sorting.sortBy === "newest") {
      return b.releaseYear - a.releaseYear;
    }
    return 0;
  });

  // Compared laptops structures
  const comparedLaptops = LAPTOP_DATABASE.filter((laptop) =>
    comparedLaptopIds.includes(laptop.id)
  );

  return (
    <div id="root-app-container" className="min-h-screen bg-[#020617] text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white relative overflow-hidden z-10">
      
      {/* Animated/Glowing Backdrop Elements for Frosted Glass Theme */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: "8s" }}></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: "12s" }}></div>
      <div className="absolute top-[40%] right-[15%] w-[30%] h-[30%] bg-pink-600/5 rounded-full blur-[110px] pointer-events-none -z-10"></div>
      
      {/* 1. Header Navigation bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        compareCount={comparedLaptopIds.length} 
      />

      {/* 2. Main Tab Body */}
      <main className="flex-grow">
        
        {/* TAB: HOME / BERANDA */}
        {activeTab === "home" && (
          <div className="space-y-12 pb-16 animate-fade-in" id="home-view-container">
            {/* Hero Banner Area */}
            <Hero 
              onExplore={handleExploreDatabase} 
              onConsultAi={handleConsultAiNav} 
              laptopCount={LAPTOP_DATABASE.length} 
            />

            {/* Popular Brands Row */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-left" id="brands-section">
              <div className="space-y-1">
                <h2 className="font-display font-semibold text-lg text-slate-200 uppercase tracking-widest text-left">Pilih Berdasarkan Brand</h2>
                <p className="text-xs text-slate-400">Tekan brand favorit Anda untuk menyaring laptop sesuai pabrikan pembuatan.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
                {["ASUS", "Lenovo", "Apple", "MSI", "HP", "Acer", "Dell"].map((b) => (
                  <button
                    key={b}
                    onClick={() => handleBrandClick(b)}
                    className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-500/30 text-center font-display font-bold text-slate-300 hover:text-white hover:bg-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="text-xs text-slate-500 font-mono group-hover:text-blue-400 font-semibold mb-1">BRAND</div>
                    <div className="text-sm tracking-wide">{b}</div>
                  </button>
                ))}
              </div>
            </section>

            {/* Custom Dynamic Categorization Guide Overview */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6" id="categories-info-section">
              <div className="space-y-1">
                <h2 className="font-display font-semibold text-lg text-slate-200 uppercase tracking-widest">Sistem Kategori Kinerja</h2>
                <p className="text-xs text-slate-400">Kami mengidentifikasi hardware laptop secara otomatis dalam 3 kategori performa.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Entry Level */}
                <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-500/20 transition-all duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/10">ENTRY LEVEL</span>
                    <span className="text-[10px] text-slate-500 font-mono">Dibawah Rp 9 Jt</span>
                  </div>
                  <h4 className="font-display font-semibold text-sm text-white">Optimal Untuk Produktivitas Dasar</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2 text-left">
                    Dikonfigurasi khusus untuk mengetik dokumen, tugas kuliah dasar, menjelajah web, dan memutar media streaming online. Menggunakan grafis terintegrasi (Integrated GPU) hemat daya.
                  </p>
                </div>

                {/* Midrange */}
                <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-500/20 transition-all duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-mono font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/10">MIDRANGE LEVEL</span>
                    <span className="text-[10px] text-slate-500 font-mono">Rp 9 Jt - Rp 23 Jt</span>
                  </div>
                  <h4 className="font-display font-semibold text-sm text-white">Multitasking, Selancar Gaming & Desain</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2 text-left">
                    Dibekali GPU diskrit seperti RTX 4050/RTX 4060 atau CPU tangguh multi-core. Layar dengan refresh rate tinggi (144Hz+) atau panel IPS presisi tinggi. Sangat cocok untuk coders dan content creator pemula.
                  </p>
                </div>

                {/* Flagship */}
                <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-500/20 transition-all duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-mono font-bold bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/10">FLAGSHIP CLASS</span>
                    <span className="text-[10px] text-slate-500 font-mono">Diatas Rp 23 Jt</span>
                  </div>
                  <h4 className="font-display font-semibold text-sm text-white">Performa Monster Tanpa Kompromi</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2 text-left">
                    Hardware tier tertinggi seperti processor Intel Core i9 HX / Ryzen 9, GPU RTX 4070/4080 premium, panel 3K/OLED Nebula, sasis sirkulasi pendingin logam canggih, dan chassis CNC metal berseragam tinggi.
                  </p>
                </div>
              </div>
            </section>

            {/* Popular/Featured Laptops Grid Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6" id="popular-section">
              <div className="flex justify-between items-baseline">
                <div className="space-y-1">
                  <h2 className="font-display font-semibold text-lg text-slate-200 uppercase tracking-widest text-left">Laptop Pilihan Utama</h2>
                  <p className="text-xs text-slate-400">Tiga perwakilan laptop rilisan terbaik masing-masing kelas performa.</p>
                </div>
                <button
                  onClick={handleExploreDatabase}
                  className="font-mono text-xs text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider flex items-center gap-1 font-bold"
                >
                  <span>Lihat Semua</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Renders 3 select featured items */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {LAPTOP_DATABASE.filter((l) => 
                  ["asus-rog-zephyrus-g14", "lenovo-legion-pro-5i", "lenovo-ideapad-slim-3"].includes(l.id)
                ).map((laptop) => (
                  <LaptopCard
                    key={laptop.id}
                    laptop={laptop}
                    onViewDetail={setSelectedLaptopForDetail}
                    onToggleCompare={handleToggleCompare}
                    isCompared={comparedLaptopIds.includes(laptop.id)}
                    canCompare={comparedLaptopIds.includes(laptop.id) || comparedLaptopIds.length < 4}
                  />
                ))}
              </div>
            </section>

          </div>
        )}

        {/* TAB: DATABASE LAPTOP */}
        {activeTab === "database" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in" id="database-view-container">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* BRAND, PRICE, GPU, CPU FILTER MODULE COLUMN (SPAN 3.5) */}
              <aside className="lg:col-span-3 bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-3xl space-y-5 text-left sticky top-20 shadow-xl shadow-slate-950/20 z-10">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2 text-slate-200 font-bold text-sm">
                    <SlidersHorizontal className="w-4 h-4 text-blue-400" />
                    <span>Filter Pencarian</span>
                  </div>
                  <button
                    onClick={handleResetFilters}
                    className="text-[10px] font-mono hover:text-rose-400 text-slate-400 font-bold tracking-wide uppercase transition-colors"
                  >
                    Reset
                  </button>
                </div>

                {/* 1. Quick Search Box */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide font-mono">Cari Nama / CPU</label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      id="search-input-field"
                      placeholder="Cari Asus, RTX, i7, dll..."
                      value={filters.searchQuery}
                      onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                      className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-950/40 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 font-semibold"
                    />
                  </div>
                </div>

                {/* 2. Choose Brand */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide font-mono">Brand Laptop</label>
                  <select
                    value={filters.brand}
                    id="brand-select-dropdown"
                    onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-950/40 border border-white/10 rounded-xl text-slate-200 font-semibold focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="" className="bg-[#0b1329]">Semua Brand</option>
                    {brands.map((b) => (
                      <option key={b} value={b} className="bg-[#0b1329]">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Class Level */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide font-mono">Kelas Kategori</label>
                  <select
                    value={filters.category}
                    id="category-select-dropdown"
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-950/40 border border-white/10 rounded-xl text-slate-200 font-semibold focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="" className="bg-[#0b1329]">Semua Kelas</option>
                    <option value="Entry Level" className="bg-[#0b1329]">Entry Level (Dasar)</option>
                    <option value="Midrange" className="bg-[#0b1329]">Midrange (Gaming/Coding)</option>
                    <option value="Flagship" className="bg-[#0b1329]">Flagship (Ultra/Pro)</option>
                  </select>
                </div>

                {/* 4. Processor Type classification */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide font-mono">Processor (CPU)</label>
                  <select
                    value={filters.processorType}
                    id="processor-select-dropdown"
                    onChange={(e) => setFilters({ ...filters, processorType: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-950/40 border border-white/10 rounded-xl text-slate-200 font-semibold focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="" className="bg-[#0b1329]">Semua Processor</option>
                    <option value="Intel Core i5/Ryzen 5" className="bg-[#0b1329]">Intel Core i5 / AMD Ryzen 5</option>
                    <option value="Intel Core i7/Ryzen 7" className="bg-[#0b1329]">Intel Core i7 / AMD Ryzen 7 / Ultra 7</option>
                    <option value="Intel Core i9/Ryzen 9" className="bg-[#0b1329]">Intel Core i9 / AMD Ryzen 9 / HX</option>
                    <option value="Apple M-Series" className="bg-[#0b1329]">Apple M-Series (M1/M2/M3)</option>
                  </select>
                </div>

                {/* 5. GPU card classification */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide font-mono">Grafis (GPU)</label>
                  <select
                    value={filters.gpuType}
                    id="gpu-select-dropdown"
                    onChange={(e) => setFilters({ ...filters, gpuType: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-950/40 border border-white/10 rounded-xl text-slate-200 font-semibold focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="" className="bg-[#0b1329]">Semua Grafis</option>
                    <option value="NVIDIA RTX" className="bg-[#0b1329]">Dedicated NVIDIA RTX</option>
                    <option value="AMD Radeon" className="bg-[#0b1329]">Dedicated AMD Radeon</option>
                    <option value="Integrated" className="bg-[#0b1329]">Integrated GPU Intel/AMD/Apple</option>
                  </select>
                </div>

                {/* 6. RAM specs */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide font-mono">Kapasitas RAM</label>
                  <select
                    value={filters.ram}
                    id="ram-select-dropdown"
                    onChange={(e) => setFilters({ ...filters, ram: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-950/40 border border-white/10 rounded-xl text-slate-200 font-semibold focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="" className="bg-[#0b1329]">Semua Kapasitas</option>
                    <option value="8GB" className="bg-[#0b1329]">8 GB</option>
                    <option value="16GB" className="bg-[#0b1329]">16 GB</option>
                    <option value="32GB" className="bg-[#0b1329]">32 GB</option>
                  </select>
                </div>

                {/* 7. Price limits slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] text-slate-300 font-mono font-bold uppercase">
                    <span>Harga Maksimal</span>
                    <span className="text-blue-400 font-bold">{formatIDR(filters.maxPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="5000000"
                    max="70000000"
                    step="500000"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              </aside>

              {/* GRID RESULTS AND SORTINGS (SPAN 8.5) */}
              <div className="lg:col-span-9 space-y-6">
                
                {/* Total Results and Sorting tools row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-950/40 p-4 rounded-xl border border-white/5">
                  <div className="text-left">
                    <span className="font-mono text-xs text-slate-400 font-semibold">DATABASE SPECS</span>
                    <h3 className="font-display font-semibold text-white text-base">
                      Daftar Laptop Tersedia ({sortedLaptops.length} Model ditemukan)
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs text-left" id="sorting-selection-area">
                    <span className="text-slate-400 text-xs text-slate-500 hidden sm:inline shrink-0">Urutkan:</span>
                    <select
                      value={sorting.sortBy}
                      id="sorting-select-dropdown"
                      onChange={(e) => setSorting({ sortBy: e.target.value as any })}
                      className="text-xs p-2 bg-slate-900 border border-white/5 rounded-xl text-slate-300 font-semibold focus:outline-none"
                    >
                      <option value="performance">Performa Skor Tertinggi</option>
                      <option value="price_asc">Harga Termurah</option>
                      <option value="price_desc">Harga Termahal</option>
                      <option value="newest">Tahun Rilis Terbaru</option>
                    </select>
                  </div>
                </div>

                {/* Bento Grid Results list */}
                {sortedLaptops.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" id="database-laptops-grid">
                    {sortedLaptops.map((laptop) => (
                      <LaptopCard
                        key={laptop.id}
                        laptop={laptop}
                        onViewDetail={setSelectedLaptopForDetail}
                        onToggleCompare={handleToggleCompare}
                        isCompared={comparedLaptopIds.includes(laptop.id)}
                        canCompare={comparedLaptopIds.includes(laptop.id) || comparedLaptopIds.length < 4}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center space-y-4 max-w-md mx-auto" id="database-empty-state">
                    <div className="text-4xl text-slate-600">⚠</div>
                    <h3 className="font-display font-semibold text-lg text-white">Laptop Tidak Ditemukan</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Tidak ada spesifikasi laptop dalam database yang cocok dengan kriteria filter Anda saat ini. Silakan atur ulang filter pencarian Anda.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-white/5 text-xs font-semibold rounded-lg text-blue-400 hover:text-white transition-colors"
                    >
                      Reset Semua Filter
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* TAB: COMPARE LAPTOP */}
        {activeTab === "compare" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in" id="compare-view-container">
            <ComparePanel
              comparedLaptops={comparedLaptops}
              onRemoveCompare={handleRemoveCompare}
              onClearAll={handleClearCompare}
              onViewDetail={setSelectedLaptopForDetail}
              onNavigateToDatabase={handleExploreDatabase}
            />
          </div>
        )}

        {/* TAB: ASISTEN REKOMENDASI AI */}
        {activeTab === "ai" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in" id="ai-view-container">
            <AIRecommendation onViewLaptopDetail={setSelectedLaptopForDetail} />
          </div>
        )}

      </main>

      {/* 3. Global Floating Sticky Compare Trigger Bar (Only displays when we have selected laptops to compare in backgrounds) */}
      {comparedLaptopIds.length > 0 && activeTab !== "compare" && (
        <div 
          className="fixed bottom-6 right-6 z-40 bg-slate-950/90 backdrop-blur-md rounded-2xl border border-blue-500/30 p-4 shadow-2xl flex items-center justify-between gap-4 animate-slide-up hover:border-blue-500/50 transition-all cursor-pointer select-none glow-blue max-w-[90vw] md:max-w-md"
          onClick={() => setActiveTab("compare")}
          id="global-floating-compare-trigger"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 font-bold border border-blue-500/20 flex items-center justify-center relative shrink-0">
              <GitCompare className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-blue-500 text-[9px] font-bold text-white ring-2 ring-slate-950 bg-blue-600">
                {comparedLaptopIds.length}
              </span>
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider font-display">Bandingkan Spek</div>
              <p className="text-[10px] text-slate-400 line-clamp-1">
                {comparedLaptops.map((l) => l.brand).join(", ")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrinks-0 pt-0.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClearCompare();
              }}
              className="p-1.5 rounded bg-slate-900 text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              title="Bersihkan Pilihan"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-bold text-blue-400 flex items-center gap-0.5 hover:text-blue-300">
              <span>Buka</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      )}

      {/* 4. Single Laptop deep specs drawer/modal Overlay */}
      <LaptopDetailModal
        laptop={selectedLaptopForDetail}
        onClose={() => setSelectedLaptopForDetail(null)}
        onToggleCompare={handleToggleCompare}
        isCompared={comparedLaptopIds.includes(selectedLaptopForDetail?.id || "")}
        canCompare={comparedLaptopIds.includes(selectedLaptopForDetail?.id || "") || comparedLaptopIds.length < 4}
        onSelectLaptop={setSelectedLaptopForDetail}
      />

      {/* 5. Minimal Modern Tech Footer */}
      <footer className="border-t border-white/5 bg-slate-950/80 py-8 text-slate-500 text-sm font-mono" id="app-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-slate-400 text-base tracking-wider bg-clip-text">LAPTOP<span className="text-blue-500">SPEC</span></span>
            <span className="text-slate-700">|</span>
            <span className="text-xs">Ulasan Spesifikasi & Analisis Mandiri 2026</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-400">
            <span className="text-slate-600">Update Terakhir: Mei 2026</span>
            <span>Made with Gemini Assistant</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
