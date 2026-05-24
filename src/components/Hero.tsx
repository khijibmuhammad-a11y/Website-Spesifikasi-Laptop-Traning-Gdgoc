import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Laptop, Layers } from "lucide-react";

interface HeroProps {
  onExplore: () => void;
  onConsultAi: () => void;
  laptopCount: number;
}

export default function Hero({ onExplore, onConsultAi, laptopCount }: HeroProps) {
  return (
    <div className="relative py-12 lg:py-20 overflow-hidden border-b border-white/5" id="hero-section">
      {/* Decorative vector grid backing */}
      <div className="absolute inset-0 tech-grid opacity-50 z-0 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-950/40 text-blue-300 text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: "3s" }} />
              <span>Update Data Terbaru: Mei 2026</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1] text-left">
              Eksplorasi Spesifikasi <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Laptop Terkini & Pintar
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg text-left leading-relaxed max-w-2xl">
              Platform independen terlengkap untuk membedah hardware, memisahkan kelebihan & kekurangan secara objektif, serta membandingkan performa murni laptop rilisan tahun 2025 - 2026. Didukung oleh asisten AI cerdas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <button
                onClick={onExplore}
                id="hero-explore-btn"
                className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl shadow-lg shadow-blue-900/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>Buka Database Laptop</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onConsultAi}
                id="hero-ai-consult-btn"
                className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-blue-500/30 text-white font-medium rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Konsultasi Cerdas AI</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/5 max-w-lg">
              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-white">{laptopCount}+</div>
                <div className="text-xs text-slate-400">Database Laptop</div>
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-slate-400">Objektif & Akurat</div>
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-white">3 Level</div>
                <div className="text-xs text-slate-400">Kategori Performa</div>
              </div>
            </div>
          </div>

          {/* Hero Right Interactive Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[400px] h-[340px] flex items-center justify-center">
              {/* Animated glowing orbit */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-600/10 via-indigo-600/5 to-transparent border border-white/5 flex items-center justify-center glow-blue">
                <div className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-blue-500/10 animate-spin" style={{ animationDuration: "20s" }}></div>
                <div className="absolute w-[60%] h-[60%] rounded-full border border-double border-indigo-500/10 animate-spin" style={{ animationDuration: "12s", animationDirection: "reverse" }}></div>
              </div>

              {/* Minimalistic Interactive Vector Laptop mockup */}
              <div className="z-10 bg-white/5 border border-white/15 backdrop-blur-md rounded-3xl p-6 w-[85%] shadow-2xl relative overflow-hidden group hover:bg-white/10 transition-all duration-400">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
                
                {/* Simulated Screen */}
                <div className="rounded-2xl bg-slate-950/40 backdrop-blur-sm border border-white/15 aspect-[16/10] p-3 flex flex-col justify-between overflow-hidden relative">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span>SYS_CORE_V2026</span>
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>

                  <div className="space-y-1.5 my-auto text-left">
                    <div className="font-display font-bold text-xs text-blue-400 uppercase tracking-widest">PRO SPEC ANALYSIS</div>
                    <div className="h-1.5 w-[85%] bg-slate-800 rounded overflow-hidden">
                      <div className="h-full bg-blue-500 w-[70%]" />
                    </div>
                    <div className="h-1.5 w-[65%] bg-slate-800 rounded overflow-hidden">
                      <div className="h-full bg-indigo-500 w-[90%]" />
                    </div>
                    <div className="h-1.5 w-[50%] bg-slate-800 rounded overflow-hidden">
                      <div className="h-full bg-cyan-500 w-[45%]" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <span className="font-mono text-[9px] text-slate-400">MEI 2026 COST</span>
                    <span className="font-mono text-[10px] text-white font-semibold">Rp 32.490.000</span>
                  </div>
                </div>

                {/* Keyboard deck hinge */}
                <div className="h-2 w-1/2 bg-slate-800 mx-auto rounded-b border-x border-b border-white/20 mt-1"></div>

                {/* Laptop Specs badge summary overlay */}
                <div className="mt-4 flex gap-2 justify-center">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-blue-950 text-blue-300 font-semibold px-2 py-1 rounded border border-blue-900/40">
                    <ShieldCheck className="w-3 h-3 text-blue-400" />
                    <span>RTX 40-Series</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-indigo-950 text-indigo-300 font-semibold px-2 py-1 rounded border border-indigo-900/40">
                    <Zap className="w-3 h-3 text-indigo-400" />
                    <span>Flagship CPU</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
