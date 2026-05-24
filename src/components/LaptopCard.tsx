import React from "react";
import { Laptop, Cpu, HardDrive, Monitor, Scale, GitCompare, ChevronRight, Plus, Check } from "lucide-react";
import { Laptop as LaptopType } from "../types";

interface LaptopCardProps {
  laptop: LaptopType;
  onViewDetail: (laptop: LaptopType) => void;
  onToggleCompare: (id: string) => void;
  isCompared: boolean;
  canCompare: boolean;
  key?: string | number;
}

export default function LaptopCard({
  laptop,
  onViewDetail,
  onToggleCompare,
  isCompared,
  canCompare,
}: LaptopCardProps) {
  
  // Format price helper
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Determine Badge colors based on Category classification
  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case "Entry Level":
        return {
          bg: "bg-emerald-950/40 border-emerald-500/20 text-emerald-400",
          text: "Entry Level"
        };
      case "Midrange":
        return {
          bg: "bg-amber-950/40 border-amber-500/20 text-amber-400",
          text: "Midrange"
        };
      case "Flagship":
      default:
        return {
          bg: "bg-blue-950/40 border-blue-500/20 text-blue-400",
          text: "Flagship"
        };
    }
  };

  const catTheme = getCategoryTheme(laptop.category);

  return (
    <div 
      className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-400 flex flex-col justify-between overflow-hidden relative h-full group hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.15)]"
      style={{
        boxShadow: isCompared ? `0 0 25px -5px ${laptop.colorHex}50` : "",
        borderColor: isCompared ? `${laptop.colorHex}60` : ""
      }}
      id={`laptop-card-${laptop.id}`}
    >
      {/* Decorative vertical colored stripe based on laptop theme */}
      <div 
        className="h-1.5 w-full transition-all duration-300 group-hover:h-2"
        style={{ backgroundColor: laptop.colorHex }}
      ></div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        {/* Top meta row */}
        <div className="flex justify-between items-start gap-2 mb-3">
          <div className="space-y-1 text-left">
            <span className="font-mono text-xs text-blue-400 font-bold tracking-wider">
              {laptop.brand}
            </span>
            <h3 className="font-display font-semibold text-lg text-white leading-snug group-hover:text-blue-400 transition-colors duration-200">
              {laptop.name}
            </h3>
          </div>
          
          <span className={`text-[11px] font-medium font-mono px-2 py-1 rounded-md border ${catTheme.bg} shrink-0`}>
            {catTheme.text}
          </span>
        </div>

        {/* Minimal laptop mockup SVG/Vector preview inside card */}
        <div 
          className="my-3.5 h-32 w-full rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center relative overflow-hidden group-hover:bg-white/10 transition-colors"
        >
          {/* Subtle color flare reflecting themes */}
          <div 
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-2xl opacity-20 group-hover:opacity-35 transition-opacity"
            style={{ backgroundColor: laptop.colorHex }}
          ></div>

          {/* Styled Laptop Graphic Wireframe */}
          <div className="relative z-10 flex flex-col items-center select-none scale-90 sm:scale-100 group-hover:scale-105 transition-transform duration-300">
            {/* Screen part */}
            <div className="w-28 h-18 rounded border border-white/25 bg-slate-950 p-1 flex items-center justify-center relative shadow-md">
              <span className="font-mono text-[9px] text-slate-500 tracking-tight flex items-center gap-1">
                <Cpu className="w-2.5 h-2.5" />
                <span>{laptop.refreshRate}</span>
              </span>
              {/* Camera dot */}
              <div className="w-1 h-1 bg-white/20 rounded-full absolute top-0.5 left-1/2 -translate-x-1/2" />
            </div>
            {/* Keyboard Deck part */}
            <div className="w-32 h-2.5 bg-slate-800 rounded-b-md relative border-t border-white/25">
              {/* Notch */}
              <div className="w-6 h-1 bg-slate-900 mx-auto rounded-b relative -top-0.5" />
              {/* Underlight shine */}
              <div 
                className="absolute inset-x-2 -bottom-[1px] h-[1px] opacity-60"
                style={{ backgroundColor: laptop.colorHex }}
              ></div>
            </div>
          </div>
          
          {/* Fast tech specs bubble anchors */}
          <div className="absolute top-2 left-2 flex gap-1">
            <span className="font-mono text-[9px] bg-white/5 text-slate-300 border border-white/10 px-1.5 py-0.5 rounded">
              {laptop.ram.split(" ")[0]}
            </span>
            <span className="font-mono text-[9px] bg-white/5 text-slate-300 border border-white/10 px-1.5 py-0.5 rounded">
              {laptop.weight}
            </span>
          </div>
        </div>

        {/* Specifications short review layout */}
        <div className="space-y-2 mt-2 mb-4 text-left" id={`laptop-specs-overview-${laptop.id}`}>
          <div className="flex items-center gap-2.5 text-slate-400 hover:text-slate-300 transition-colors">
            <Cpu className="w-4 h-4 text-blue-500 shrink-0" />
            <span className="text-xs truncate font-medium">{laptop.processor}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-400 hover:text-slate-300 transition-colors">
            <Monitor className="w-4 h-4 text-indigo-500 shrink-0" />
            <span className="text-xs truncate font-medium">{laptop.display}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-400 hover:text-slate-300 transition-colors">
            <HardDrive className="w-4 h-4 text-pink-500 shrink-0" />
            <span className="text-xs truncate font-medium">{laptop.storage} <span className="text-slate-600 font-mono">({laptop.ram})</span></span>
          </div>
        </div>
      </div>

      {/* Pricing row & CTA buttons section */}
      <div className="p-5 pt-0 border-t border-white/10 bg-white/[0.02]">
        <div className="flex justify-between items-center mb-4 pt-3">
          <div className="text-left">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold">
              Harga Terbaru
            </span>
            <div className="font-mono text-base md:text-lg font-bold text-slate-100 mt-0.5">
              {formatIDR(laptop.price)} <span className="text-[10px] text-slate-500 text-normal font-sans font-normal ml-0.5">Mei '26</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Bandingkan / Compare button */}
          <button
            onClick={() => onToggleCompare(laptop.id)}
            disabled={!isCompared && !canCompare}
            id={`compare-btn-${laptop.id}`}
            className={`flex items-center justify-center gap-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all duration-300 ${
              isCompared
                ? "bg-blue-600 border border-blue-500 text-white shadow-md shadow-blue-900/30 font-bold"
                : !canCompare
                ? "bg-white/5 border border-white/5 text-slate-600 cursor-not-allowed opacity-50"
                : "bg-white/5 border border-white/10 text-slate-300 hover:bg-blue-600 hover:border-blue-500 hover:text-white"
            }`}
          >
            {isCompared ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Bandingkan</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400" />
                <span>Bandingkan</span>
              </>
            )}
          </button>

          {/* Lihat detail button */}
          <button
            onClick={() => onViewDetail(laptop)}
            id={`detail-btn-${laptop.id}`}
            className="flex items-center justify-center gap-1 py-2 px-3 text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white rounded-xl border border-white/15 hover:border-white/25 transition-all duration-300"
          >
            <span>Detail</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
