import React from "react";
import { GitCompare, Trash2, ShieldCheck, ChevronRight, Scale, Sparkles, AlertCircle } from "lucide-react";
import { Laptop } from "../types";

interface ComparePanelProps {
  comparedLaptops: Laptop[];
  onRemoveCompare: (id: string) => void;
  onClearAll: () => void;
  onViewDetail: (laptop: Laptop) => void;
  onNavigateToDatabase: () => void;
}

export default function ComparePanel({
  comparedLaptops,
  onRemoveCompare,
  onClearAll,
  onViewDetail,
  onNavigateToDatabase,
}: ComparePanelProps) {
  
  if (comparedLaptops.length === 0) {
    return (
      <div className="py-16 text-center space-y-4 max-w-lg mx-auto px-4" id="compare-empty-state">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center animate-pulse">
          <GitCompare className="w-8 h-8 text-blue-400" />
        </div>
        <h3 className="font-display font-semibold text-xl text-white">Bandingkan Spesifikasi Laptop</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Pilih 2 hingga 4 laptop dari Database Laptop untuk dibandingkan spesifikasi teknis dan kinerjanya secara berdampingan.
        </p>
        <button
          onClick={onNavigateToDatabase}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-xl shadow-md transition-all duration-300"
        >
          Cari di Database Laptop
        </button>
      </div>
    );
  }

  // Format money
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Safe parse weight helper
  const parseWeightValue = (weightStr: string) => {
    const parsed = parseFloat(weightStr.replace(/[^\d.]/g, ""));
    return isNaN(parsed) ? 10 : parsed; // return high weight if unparseable
  };

  // Calculations to highlight the best parameters among compared laptops
  const showHighlights = comparedLaptops.length >= 2;

  let cheapestId = "";
  let lightestId = "";
  let bestCpuId = "";
  let bestGpuId = "";
  let bestBatteryId = "";
  let bestDisplayId = "";

  if (showHighlights) {
    // 1. Cheapest
    cheapestId = comparedLaptops.reduce((prev, curr) => (prev.price < curr.price ? prev : curr)).id;
    // 2. Lightest
    lightestId = comparedLaptops.reduce((prev, curr) => 
      (parseWeightValue(prev.weight) < parseWeightValue(curr.weight) ? prev : curr)
    ).id;
    // 3. Best CPU
    bestCpuId = comparedLaptops.reduce((prev, curr) => (prev.benchmark.cpu > curr.benchmark.cpu ? prev : curr)).id;
    // 4. Best GPU
    bestGpuId = comparedLaptops.reduce((prev, curr) => (prev.benchmark.gpu > curr.benchmark.gpu ? prev : curr)).id;
    // 5. Best Battery
    bestBatteryId = comparedLaptops.reduce((prev, curr) => (prev.benchmark.battery > curr.benchmark.battery ? prev : curr)).id;
    // 6. Best Display
    bestDisplayId = comparedLaptops.reduce((prev, curr) => (prev.benchmark.display > curr.benchmark.display ? prev : curr)).id;
  }

  return (
    <div className="space-y-6" id="compare-panel-dashboard">
      
      {/* Compare Panel Info Headers */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10 shadow-lg">
        <div>
          <h2 className="font-display font-bold text-xl text-white flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-blue-400" />
            <span>Pusat Bandingkan Laptop</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {comparedLaptops.length} laptop dipilih {showHighlights ? "(Spesifikasi terbaik disorot warna hijau)" : "(Tambahkan minimal 2 laptop untuk membandingkan)"}
          </p>
        </div>

        <div className="flex gap-2">
          {comparedLaptops.length < 4 && (
            <button
              onClick={onNavigateToDatabase}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/15 rounded-xl text-xs font-bold tracking-wide transition-all"
            >
              + Tambah Laptop
            </button>
          )}
          <button
            onClick={onClearAll}
            className="px-3.5 py-2 bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 hover:text-rose-200 border border-rose-500/25 rounded-xl text-xs font-bold tracking-wide transition-all"
          >
            Bersihkan Semua ({comparedLaptops.length})
          </button>
        </div>
      </div>

      {comparedLaptops.length < 2 && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-950/20 backdrop-blur-sm border border-blue-500/20 text-blue-300 text-xs text-left">
          <AlertCircle className="w-4 h-4 shrink-0 text-blue-400" />
          <span>Silakan tambahkan minimal 1 laptop lagi untuk dapat menikmati sistem ringkasan sorotan spesifikasi terbaik!</span>
        </div>
      )}

      {/* Main Responsive Compare Matrix Table */}
      <div className="overflow-x-auto custom-scrollbar border border-white/10 rounded-3xl bg-white/5 backdrop-blur-md shadow-2xl">
        <table className="w-full min-w-[700px] border-collapse text-sm">
          <thead>
            {/* Row 1: Header/Name with Brand strip and action button to delete */}
            <tr className="bg-slate-950/70 border-b border-white/10 divide-x divide-white/5">
              <th className="p-4 text-xs font-mono font-bold text-slate-400 uppercase tracking-widest text-left w-48">Spesifikasi</th>
              {comparedLaptops.map((laptop) => (
                <th key={laptop.id} className="p-4 text-left relative group">
                  <div className="flex flex-col h-full justify-between gap-3 text-left">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-1">
                        <span className="font-mono text-[10px] text-blue-400 font-bold uppercase">{laptop.brand}</span>
                        <button
                          onClick={() => onRemoveCompare(laptop.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 rounded-md hover:bg-slate-900 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="font-display font-semibold text-sm text-white group-hover:text-blue-300 transition-colors line-clamp-1">{laptop.name}</h4>
                    </div>

                    <div className="flex gap-2">
                      <span className="text-[9px] font-mono font-semibold bg-slate-900 text-slate-400 border border-white/5 px-1.5 py-0.5 rounded">
                        {laptop.category}
                      </span>
                      <button
                        onClick={() => onViewDetail(laptop)}
                        className="text-[9.5px] text-blue-400 hover:text-blue-300 font-medium tracking-wide flex items-center"
                      >
                        <span>Lihat Detail</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  {/* Bottom indicator band */}
                  <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: laptop.colorHex }}></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {/* Price */}
            <tr className="divide-x divide-white/5 hover:bg-white/[0.01] transition-colors">
              <td className="p-4 font-mono font-medium text-slate-400 bg-slate-950/10">Harga Terbaru</td>
              {comparedLaptops.map((laptop) => {
                const isBest = showHighlights && cheapestId === laptop.id;
                return (
                  <td key={laptop.id} className={`p-4 font-mono font-bold text-base ${isBest ? "bg-emerald-950/20 text-emerald-400" : ""}`}>
                    <div className="flex justify-between items-center">
                      <span>{formatIDR(laptop.price)}</span>
                      {isBest && (
                        <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                          Termurah
                        </span>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* Processor */}
            <tr className="divide-x divide-white/5 hover:bg-white/[0.01] transition-colors">
              <td className="p-4 font-mono font-medium text-slate-400 bg-slate-950/10">Processor</td>
              {comparedLaptops.map((laptop) => {
                const isBest = showHighlights && bestCpuId === laptop.id;
                return (
                  <td key={laptop.id} className={`p-4 ${isBest ? "bg-emerald-950/10" : ""}`}>
                    <div className="space-y-1.5 text-left">
                      <div className="font-medium text-slate-200 text-xs">{laptop.processor}</div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-slate-400">Benchmark CPU:</span>
                        <span className={`text-[10.5px] font-mono font-bold px-1.5 py-0.2 rounded ${isBest ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-900 text-slate-300"}`}>
                          {laptop.benchmark.cpu}/100
                        </span>
                        {isBest && <span className="text-[9px] font-bold text-emerald-400 tracking-wider">TERBAIK</span>}
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* GPU */}
            <tr className="divide-x divide-white/5 hover:bg-white/[0.01] transition-colors">
              <td className="p-4 font-mono font-medium text-slate-400 bg-slate-950/10">Graphics (GPU)</td>
              {comparedLaptops.map((laptop) => {
                const isBest = showHighlights && bestGpuId === laptop.id;
                return (
                  <td key={laptop.id} className={`p-4 ${isBest ? "bg-emerald-950/10" : ""}`}>
                    <div className="space-y-1.5 text-left">
                      <div className="font-medium text-slate-200 text-xs">{laptop.gpu}</div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-slate-400">Benchmark GPU:</span>
                        <span className={`text-[10.5px] font-mono font-bold px-1.5 py-0.2 rounded ${isBest ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-900 text-slate-300"}`}>
                          {laptop.benchmark.gpu}/100
                        </span>
                        {isBest && <span className="text-[9px] font-bold text-emerald-400 tracking-wider">TERBAIK</span>}
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* RAM */}
            <tr className="divide-x divide-white/5 hover:bg-white/[0.01] transition-colors">
              <td className="p-4 font-mono font-medium text-slate-400 bg-slate-950/10">Kapasitas RAM</td>
              {comparedLaptops.map((laptop) => (
                <td key={laptop.id} className="p-4 text-xs font-semibold font-mono text-slate-200 text-left">
                  {laptop.ram}
                </td>
              ))}
            </tr>

            {/* Storage */}
            <tr className="divide-x divide-white/5 hover:bg-white/[0.01] transition-colors">
              <td className="p-4 font-mono font-medium text-slate-400 bg-slate-950/10">Penyimpanan</td>
              {comparedLaptops.map((laptop) => (
                <td key={laptop.id} className="p-4 text-xs text-slate-200 text-left">
                  {laptop.storage}
                </td>
              ))}
            </tr>

            {/* Display */}
            <tr className="divide-x divide-white/5 hover:bg-white/[0.01] transition-colors">
              <td className="p-4 font-mono font-medium text-slate-400 bg-slate-950/10">Layar & Screen</td>
              {comparedLaptops.map((laptop) => {
                const isBest = showHighlights && bestDisplayId === laptop.id;
                return (
                  <td key={laptop.id} className={`p-4 ${isBest ? "bg-emerald-950/10" : ""}`}>
                    <div className="space-y-1.5 text-left">
                      <div className="font-medium text-slate-200 text-xs">{laptop.display} ({laptop.refreshRate})</div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-slate-400">Kejernihan:</span>
                        <span className={`text-[10.5px] font-mono font-bold px-1.5 py-0.2 rounded ${isBest ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-900 text-slate-300"}`}>
                          {laptop.benchmark.display}/100
                        </span>
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* Battery */}
            <tr className="divide-x divide-white/5 hover:bg-white/[0.01] transition-colors">
              <td className="p-4 font-mono font-medium text-slate-400 bg-slate-950/10">Baterai & Daya</td>
              {comparedLaptops.map((laptop) => {
                const isBest = showHighlights && bestBatteryId === laptop.id;
                return (
                  <td key={laptop.id} className={`p-4 ${isBest ? "bg-emerald-950/10" : ""}`}>
                    <div className="space-y-1.5 text-left">
                      <div className="font-medium text-slate-200 text-xs">{laptop.battery}</div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-slate-400">Daya Tahan:</span>
                        <span className={`text-[10.5px] font-mono font-bold px-1.5 py-0.2 rounded ${isBest ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-900 text-slate-300"}`}>
                          {laptop.benchmark.battery}/100
                        </span>
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* Weight */}
            <tr className="divide-x divide-white/5 hover:bg-white/[0.01] transition-colors">
              <td className="p-4 font-mono font-medium text-slate-400 bg-slate-950/10">Bobot Berat</td>
              {comparedLaptops.map((laptop) => {
                const isBest = showHighlights && lightestId === laptop.id;
                return (
                  <td key={laptop.id} className={`p-4 font-mono inline-cells ${isBest ? "bg-emerald-950/20 text-emerald-400" : ""}`}>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-xs">{laptop.weight}</span>
                      {isBest && (
                        <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                          Terringan
                        </span>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* OS */}
            <tr className="divide-x divide-white/5 hover:bg-white/[0.01] transition-colors">
              <td className="p-4 font-mono font-medium text-slate-400 bg-slate-950/10">OS</td>
              {comparedLaptops.map((laptop) => (
                <td key={laptop.id} className="p-4 text-xs font-mono text-slate-300 text-left">
                  {laptop.os}
                </td>
              ))}
            </tr>

            {/* Cocok untuk apa */}
            <tr className="divide-x divide-white/5 hover:bg-white/[0.01] transition-colors">
              <td className="p-4 font-mono font-medium text-slate-400 bg-slate-950/10">Kecocokan Penggunaan</td>
              {comparedLaptops.map((laptop) => (
                <td key={laptop.id} className="p-4 text-left">
                  <div className="flex flex-wrap gap-1">
                    {laptop.bestFor.map((useCase, uiIdx) => (
                      <span key={uiIdx} className="text-[9px] font-semibold bg-blue-500/10 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/10">
                        {useCase}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Kelebihan */}
            <tr className="divide-x divide-white/5 hover:bg-white/[0.01] transition-colors">
              <td className="p-4 font-mono font-medium text-slate-400 bg-slate-950/10">Rangkuman Kelebihan</td>
              {comparedLaptops.map((laptop) => (
                <td key={laptop.id} className="p-4 text-left vertical-align-top">
                  <ul className="space-y-1 text-[11px] text-emerald-300/90 list-disc list-inside">
                    {laptop.pros.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="truncate" title={item}>{item}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
