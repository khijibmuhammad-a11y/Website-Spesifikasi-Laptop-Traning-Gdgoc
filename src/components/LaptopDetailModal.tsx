import React from "react";
import { X, Cpu, Monitor, HardDrive, Battery, ShieldAlert, BadgeInfo, Scale, GitCompare, Check, ThumbsUp, ThumbsDown, Laptop, Star } from "lucide-react";
import { Laptop as LaptopType } from "../types";
import { LAPTOP_DATABASE } from "../data/laptops";

interface LaptopDetailModalProps {
  laptop: LaptopType | null;
  onClose: () => void;
  onToggleCompare: (id: string) => void;
  isCompared: boolean;
  canCompare: boolean;
  onSelectLaptop: (laptop: LaptopType) => void; // to switch to another laptop if clicked in recommendations
}

export default function LaptopDetailModal({
  laptop,
  onClose,
  onToggleCompare,
  isCompared,
  canCompare,
  onSelectLaptop,
}: LaptopDetailModalProps) {
  if (!laptop) return null;

  // Format IDR currency
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Get related laptops (same category, max 2 items, excluding current laptop)
  const relatedLaptops = LAPTOP_DATABASE.filter(
    (item) => item.category === laptop.category && item.id !== laptop.id
  ).slice(0, 2);

  // Return badge styling for benchmarks
  const getBenchmarkColor = (score: number) => {
    if (score >= 90) return "bg-blue-500";
    if (score >= 75) return "bg-indigo-500";
    if (score >= 50) return "bg-cyan-500";
    return "bg-slate-500";
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" id="laptop-detail-modal">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" 
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6 lg:p-8">
        <div className="relative w-full max-w-5xl rounded-3xl bg-[#090d22]/80 backdrop-blur-xl border border-white/15 p-6 sm:p-8 text-left shadow-2xl overflow-hidden animate-fade-in custom-scrollbar max-h-[90vh] overflow-y-auto">
          
          {/* Decorative Background Flare */}
          <div 
            className="absolute -top-24 -left-20 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
            style={{ backgroundColor: laptop.colorHex }}
          ></div>
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              id="close-modal-btn"
              className="rounded-full bg-slate-950/60 p-2 text-slate-400 hover:text-white hover:bg-slate-800 border border-white/5 focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
            
            {/* Left Block: Render Info & Premium Visual Mockup */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs uppercase font-bold tracking-widest text-blue-400">
                    {laptop.brand} Official
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span className="text-xs text-slate-400 font-mono">Tahun Rilis: {laptop.releaseYear}</span>
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
                  {laptop.name}
                </h2>
              </div>

              {/* Large Premium Visual Laptop representation */}
              <div 
                className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md p-6 h-60 flex flex-col items-center justify-center relative overflow-hidden group hover:bg-white/10 transition-all duration-300"
              >
                <div 
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, ${laptop.colorHex}50, transparent 70%)`
                  }}
                />
                
                {/* Visual computer model */}
                <div className="relative flex flex-col items-center select-none scale-110">
                  <div className="w-40 h-25 rounded-md border border-white/20 bg-slate-900 p-1.5 flex items-center justify-center relative shadow-xl">
                    <Laptop className="w-12 h-12 text-slate-700 animate-pulse" />
                    <div className="absolute bottom-1 right-2 text-[8px] font-mono text-blue-400">OLED {laptop.refreshRate}</div>
                  </div>
                  <div className="w-48 h-3.5 bg-slate-800 rounded-b-md relative border-t border-white/20">
                    <div className="w-10 h-1 bg-slate-950 mx-auto rounded-b relative -top-0.5" />
                    <div 
                      className="absolute inset-x-4 -bottom-[1px] h-[1px] opacity-80"
                      style={{ backgroundColor: laptop.colorHex }}
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-between w-full items-center px-2 z-10">
                  <span className="text-xs font-mono text-slate-400">MEI 2026 PRICE</span>
                  <span className="font-mono text-base font-bold text-white bg-blue-950/40 px-2.5 py-1 rounded border border-blue-900/30">
                    {formatIDR(laptop.price)}
                  </span>
                </div>
              </div>

              {/* Benchmark ratings section */}
              <div className="space-y-3.5 bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10 shadow-lg">
                <h4 className="text-sm font-semibold text-white tracking-wide uppercase font-display flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Benchmark & Kinerja</span>
                </h4>
                
                <div className="space-y-3 font-mono">
                  {/* Cpu */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Processor Performance</span>
                      <span className="text-white font-bold">{laptop.benchmark.cpu}/100</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${getBenchmarkColor(laptop.benchmark.cpu)} rounded-full`} style={{ width: `${laptop.benchmark.cpu}%` }} />
                    </div>
                  </div>

                  {/* Gpu */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Graphics Rendering</span>
                      <span className="text-white font-bold">{laptop.benchmark.gpu}/100</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${getBenchmarkColor(laptop.benchmark.gpu)} rounded-full`} style={{ width: `${laptop.benchmark.gpu}%` }} />
                    </div>
                  </div>

                  {/* Display */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Display & Accuracy</span>
                      <span className="text-white font-bold">{laptop.benchmark.display}/100</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${getBenchmarkColor(laptop.benchmark.display)} rounded-full`} style={{ width: `${laptop.benchmark.display}%` }} />
                    </div>
                  </div>

                  {/* Battery */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Battery Efficiency</span>
                      <span className="text-white font-bold">{laptop.benchmark.battery}/100</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${getBenchmarkColor(laptop.benchmark.battery)} rounded-full`} style={{ width: `${laptop.benchmark.battery}%` }} />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Block: Specs Database Table & Pros/Cons */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Suitabilities "Cocok untuk" */}
              <div className="space-y-2">
                <span className="text-xs uppercase font-mono tracking-widest text-slate-400 font-bold">Kategori Kecocokan Kebutuhan</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {laptop.bestFor.map((item, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 text-xs font-semibold rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/15"
                    >
                      {item}
                    </span>
                  ))}
                  <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-800 text-slate-300 border border-white/5">
                    {laptop.category}
                  </span>
                </div>
              </div>

              {/* Complete specs block */}
              <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-sm">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-950/80 border-b border-white/10 text-left font-mono">
                      <th className="px-4 py-2.5 text-xs text-slate-400 uppercase tracking-widest">Komponen</th>
                      <th className="px-4 py-2.5 text-xs text-slate-400 uppercase tracking-widest">Detail Spesifikasi resmi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    <tr>
                      <td className="px-4 py-2.5 font-semibold text-slate-400 bg-slate-950/20 w-32">Processor</td>
                      <td className="px-4 py-2.5">{laptop.processor}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-semibold text-slate-400 bg-slate-950/20">Grafis (GPU)</td>
                      <td className="px-4 py-2.5">{laptop.gpu}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-semibold text-slate-400 bg-slate-950/20">Kapasitas RAM</td>
                      <td className="px-4 py-2.5">{laptop.ram}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-semibold text-slate-400 bg-slate-950/20">Penyimpanan</td>
                      <td className="px-4 py-2.5">{laptop.storage}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-semibold text-slate-400 bg-slate-950/20">Layar & Panel</td>
                      <td className="px-4 py-2.5">{laptop.display} <span className="font-mono text-blue-400">({laptop.refreshRate})</span></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-semibold text-slate-400 bg-slate-950/20">Baterai</td>
                      <td className="px-4 py-2.5">{laptop.battery}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-semibold text-slate-400 bg-slate-950/20">Bobot Berat</td>
                      <td className="px-4 py-2.5">{laptop.weight}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-semibold text-slate-400 bg-slate-950/20">Sistem Operasi</td>
                      <td className="px-4 py-2.5">{laptop.os}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Pros & Cons list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pros Kelebihan */}
                <div className="bg-emerald-500/5 backdrop-blur-sm border border-emerald-500/20 p-5 rounded-2xl space-y-2.5 text-left">
                  <h5 className="font-semibold text-emerald-400 text-sm flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Kelebihan</span>
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-300 pl-1.5">
                    {laptop.pros.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons Kekurangan */}
                <div className="bg-rose-500/5 backdrop-blur-sm border border-rose-500/20 p-5 rounded-2xl space-y-2.5 text-left">
                  <h5 className="font-semibold text-rose-400 text-sm flex items-center gap-2">
                    <ThumbsDown className="w-4 h-4" />
                    <span>Kekurangan</span>
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-300 pl-1.5">
                    {laptop.cons.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold shrink-0">✗</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action buttons list */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => onToggleCompare(laptop.id)}
                  disabled={!isCompared && !canCompare}
                  id="modal-toggle-compare-btn"
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isCompared
                      ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30"
                      : "bg-slate-950 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-white/20"
                  }`}
                >
                  <GitCompare className="w-4 h-4" />
                  <span>{isCompared ? "Hapus dari Perbandingan" : "Tambahkan ke Bandingkan"}</span>
                  {isCompared && <span className="ml-1 bg-white/20 text-[10px] px-1.5 py-0.5 rounded">Aktif</span>}
                </button>

                <button
                  onClick={onClose}
                  id="modal-back-btn"
                  className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-800 border border-white/5 rounded-xl text-sm font-medium text-slate-300 transition-colors"
                >
                  Kembali ke Daftar
                </button>
              </div>

              {/* Related Laptops Section */}
              {relatedLaptops.length > 0 && (
                <div className="border-t border-white/10 pt-5 space-y-3 text-left">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 flex items-center gap-1.5">
                    <BadgeInfo className="w-3.5 h-3.5" />
                    <span>Rekomendasi Laptop Sejenis</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {relatedLaptops.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => onSelectLaptop(item)}
                        className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm h-20 flex flex-col justify-between cursor-pointer hover:bg-white/10 hover:border-blue-500/25 transition-all duration-300 text-left"
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider truncate mr-1">{item.brand}</span>
                          <span className="text-[10px] bg-slate-900 border border-white/5 px-1.5 py-0.2 rounded font-mono text-slate-300 shrink-0">{item.category}</span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="font-display font-medium text-xs text-white truncate max-w-[55%]">{item.name}</span>
                          <span className="font-mono text-xs text-blue-400 font-bold shrink-0">{formatIDR(item.price)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
