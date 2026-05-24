import React, { useState } from "react";
import { Sparkles, DollarSign, ListFilter, HelpCircle, ArrowRight, RefreshCw, Star, Laptop, ArrowUpRight } from "lucide-react";
import { Laptop as LaptopType, AIRecommendationRequest } from "../types";
import { LAPTOP_DATABASE } from "../data/laptops";

interface AIRecommendationProps {
  onViewLaptopDetail: (laptop: LaptopType) => void;
}

interface AIResponse {
  summary: string;
  recommendations: Array<{
    laptopId: string;
    reason: string;
  }>;
  advice: string;
}

export default function AIRecommendation({ onViewLaptopDetail }: AIRecommendationProps) {
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [budget, setBudget] = useState<number>(25000000); // Rp 25.000.000 default
  const [notes, setNotes] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [result, setResult] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const availableNeeds = [
    { value: "Gaming", label: "Gaming Berat", desc: "Butuh GPU NVIDIA RTX & Refresh Rate tinggi" },
    { value: "Editing", label: "Media Editing", desc: "Butuh akurasi warna layar & RAM besar" },
    { value: "Programming", label: "Programming", desc: "Butuh CPU bertenaga, RAM lega, & keyboard nyaman" },
    { value: "Kuliah", label: "Tugas Kuliah", desc: "Mengutamakan bobot ringan & baterai awet" },
    { value: "Office", label: "Pekerjaan Office", desc: "Desain minimalis, daya tahan baterai, & ergonomis" },
    { value: "Content Creation", label: "Content Creation", desc: "Kombinasi layar OLED akurat & render cepat" }
  ];

  const handleToggleNeed = (need: string) => {
    if (selectedNeeds.includes(need)) {
      setSelectedNeeds(selectedNeeds.filter((n) => n !== need));
    } else {
      setSelectedNeeds([...selectedNeeds, need]);
    }
  };

  const handleRecommend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedNeeds.length === 0) {
      setError("Pilih minimal satu kebutuhan utama Anda terlebih dahulu.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    // Simulate comforting system checks for better UX
    const steps = [
      "Menganalisis kriteria kebutuhan Anda...",
      "Menyaring database spesifikasi laptop tahun 2026...",
      "Memanggil asisten kecerdasan buatan Gemini...",
      "Memformulasikan rekomendasi hardware terbaik..."
    ];

    let currentStep = 0;
    setLoadingStep(steps[currentStep]);
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setLoadingStep(steps[currentStep]);
      }
    }, 1800);

    try {
      const response = await fetch("/api/gemini/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          needs: selectedNeeds,
          budget: budget,
          additionalInfo: notes,
        }),
      });

      clearInterval(interval);

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Gagal mendapatkan saran dari AI.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      setError(err.message || "Terjadi masalah koneksi atau server saat berkonsultasi.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedNeeds([]);
    setBudget(25000000);
    setNotes("");
    setResult(null);
    setError(null);
  };

  // Helper currency formatter
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Helper text formatter to replace **bold** into inline tags safely
  const renderFormattedText = (text: string) => {
    if (!text) return "";
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="space-y-8" id="ai-recommendation-panel">
      {/* Visual Header */}
      <div className="space-y-2 text-left">
        <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
          <span>Konsultan Spesifikasi AI Laptop 2026</span>
        </h2>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Asisten cerdas kami akan menganalisis kebutuhan beban kerja Anda dan mencocokkannya dengan spesifikasi bodi, performa benchmark, dan budget rupiah Anda untuk merekomendasikan pilihan terbaik.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Form Controls */}
        <form onSubmit={handleRecommend} className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-3xl space-y-6 text-left shadow-xl">
          
          {/* Step 1: Kebutuhan Laptop (Needs) */}
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-wider font-mono font-bold text-slate-400">
              1. Pilih Kebutuhan Laptop Anda (Multiselect)
            </label>
            
            <div className="grid grid-cols-1 gap-2">
              {availableNeeds.map((need) => {
                const isSelected = selectedNeeds.includes(need.value);
                return (
                  <button
                    type="button"
                    key={need.value}
                    id={`need-chip-${need.value}`}
                    onClick={() => handleToggleNeed(need.value)}
                    className={`p-3.5 text-left rounded-2xl border text-xs transition-all duration-300 flex justify-between items-center ${
                      isSelected
                        ? "bg-blue-600/15 border-blue-500/40 text-blue-300 shadow-[0_4px_16px_0_rgba(31,38,135,0.15)]"
                        : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20 hover:text-slate-200"
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-200">{need.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{need.desc}</div>
                    </div>
                    {isSelected && (
                      <span className="h-5 w-5 rounded-full bg-blue-600 border border-blue-500 flex items-center justify-center text-[10px] text-white font-bold animate-fade-in">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Anggaran Rupiah (Budget) */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="block text-xs uppercase tracking-wider font-mono font-bold text-slate-400">
                2. Anggaran Maksimal Budget
              </label>
              <span className="font-mono text-sm font-bold text-blue-400 bg-blue-950/40 px-2 py-0.5 rounded border border-blue-900/30">
                {formatIDR(budget)}
              </span>
            </div>

            <input
              type="range"
              min="5000000"
              max="70000000"
              step="500000"
              value={budget}
              id="budget-range-slider"
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>Rp 5.0 Jt</span>
              <span>Rp 37.5 Jt</span>
              <span>Rp 70.0 Jt</span>
            </div>
          </div>

          {/* Step 3: Catatan Tambahan (Notes) */}
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-wider font-mono font-bold text-slate-400">
              3. Catatan atau Kriteria Tambahan (Opsional)
            </label>
            <textarea
              value={notes}
              id="additional-notes-input"
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: 'Saya ingin laptop yang ada penutup webcam manual dan bobot di bawah 1.5 kg.'"
              rows={3}
              className="w-full text-xs p-3 rounded-xl bg-slate-950/40 border border-white/10 focus:border-blue-500/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500/40 font-semibold"
            />
          </div>

          {/* Trigger & Reset */}
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={loading}
              id="submit-recommend-btn"
              className="flex-1 overflow-hidden relative group py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>{loading ? "Menganalisis..." : "Kalkulasi Rekomendasi"}</span>
            </button>

            {(result || error) && (
              <button
                type="button"
                onClick={handleReset}
                id="reset-form-btn"
                className="py-3 px-4 bg-slate-900 hover:bg-slate-800 border border-white/5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                title="Reset Kriteria"
              >
                Reset
              </button>
            )}
          </div>

        </form>

        {/* Right Side: Render Result Content, Errors, or Loading */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Lacking trigger fallback */}
          {!loading && !result && !error && (
            <div className="p-12 text-center rounded-3xl bg-white/5 border border-dashed border-white/10 backdrop-blur-sm space-y-3 shadow-md" id="ai-fallback">
              <Sparkles className="w-10 h-10 text-slate-600 mx-auto animate-pulse" />
              <div className="text-sm font-semibold text-slate-300">Siap Menerima Kriteria</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Silakan pilih kebutuhan utama di menu formulir kiri dan tetapkan budget belanja Anda untuk memulai konsultasi hardware cerdas.
              </p>
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="p-12 text-center rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-5 flex flex-col items-center justify-center h-full min-h-[300px]" id="ai-loading">
              <div className="relative">
                <div className="h-12 w-12 rounded-full border-2 border-slate-700 border-t-2 border-t-blue-500 animate-spin"></div>
                <Sparkles className="w-5 h-5 text-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-semibold text-white animate-pulse">Menghubungkan ke Gemini AI...</div>
                <p className="text-xs text-slate-400 font-mono italic">{loadingStep}</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-6 rounded-3xl bg-rose-500/5 backdrop-blur-sm border border-rose-500/20 text-rose-300 text-left space-y-3 animate-fade-in" id="ai-error">
              <div className="font-bold flex items-center gap-2 text-sm text-rose-400">
                <span>Oops! Konsultasi Gagal</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                {error}
              </p>
              <div className="text-[10px] text-slate-500 bg-slate-950/40 p-2.5 rounded border border-white/5 font-mono">
                Catatan: Pastikan server backend Anda berjalan lancar dan API Key Gemini sudah dimasukkan ke Secrets Panel di Google AI Studio.
              </div>
            </div>
          )}

          {/* AI Result Report Panel */}
          {result && (
            <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-3xl space-y-6 text-left animate-fade-in shadow-xl" id="ai-results-report">
              
              {/* Header Title with custom styling */}
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-blue-600/10 border border-blue-500/20">
                    <Laptop className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase text-slate-300 tracking-wider">Hasil Diagnosis AI</span>
                </div>
                
                <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full font-mono">
                  Selesai
                </span>
              </div>

              {/* Summary of analysis */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400 font-bold">Ringkasan Analisis Kebutuhan</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-xl border border-white/5">
                  {renderFormattedText(result.summary)}
                </p>
              </div>

              {/* Recommended Laptops directly bound to database items */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400 font-bold">
                  Daftar Rekomendasi Laptop Terbaik
                </h4>
                
                <div className="space-y-3">
                  {result.recommendations.map((rec, idx) => {
                    const matchedLaptop = LAPTOP_DATABASE.find((item) => item.id === rec.laptopId);
                    
                    return (
                      <div 
                        key={idx}
                        className="rounded-2xl border border-white/10 bg-[#090d22]/40 backdrop-blur-sm p-4 relative overflow-hidden flex flex-col justify-between whitespace-normal"
                        id={`ai-rec-laptop-${rec.laptopId}`}
                      >
                        {/* Numerical custom tag */}
                        <div className="absolute top-0 left-0 w-8 h-8 bg-blue-600/10 border-r border-b border-blue-500/20 text-xs font-mono font-bold text-blue-300 flex items-center justify-center rounded-tl-xl rounded-br-lg">
                          #{idx + 1}
                        </div>

                        {/* Top Metadata & Matching Badge */}
                        <div className="ml-8 text-left space-y-1.5">
                          {matchedLaptop ? (
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                              <div>
                                <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">{matchedLaptop.brand}</span>
                                <h5 className="font-display font-semibold text-sm text-white">{matchedLaptop.name}</h5>
                              </div>
                              <div className="text-left sm:text-right shrink-0">
                                <span className="font-mono text-xs font-bold text-blue-400 bg-blue-950/40 border border-blue-900/30 px-2 py-0.5 rounded block">
                                  {formatIDR(matchedLaptop.price)}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h5 className="font-display font-semibold text-sm text-slate-400 uppercase">Brand / Laptop Tidak Dikenali ({rec.laptopId})</h5>
                            </div>
                          )}

                          {/* Live specs if matched */}
                          {matchedLaptop && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2 border-t border-b border-white/5 mt-2 font-mono text-[10px] text-slate-400">
                              <div>CPU: <strong className="text-slate-300 truncate block">{matchedLaptop.processor.split(" ")[0]}</strong></div>
                              <div>GPU: <strong className="text-slate-300 truncate block">{matchedLaptop.gpu.split(" ")[0]}</strong></div>
                              <div>RAM: <strong className="text-slate-300 truncate block">{matchedLaptop.ram}</strong></div>
                              <div>Display: <strong className="text-slate-300 truncate block">{matchedLaptop.display}</strong></div>
                            </div>
                          )}

                          {/* Custom Reason generated by Gemini in colored box */}
                          <div className="mt-2 text-xs bg-slate-950/80 p-3 rounded-lg border-l-2 border-blue-500 text-slate-300 leading-relaxed italic">
                            {renderFormattedText(rec.reason)}
                          </div>

                          {/* Quick details toggle button if matched */}
                          {matchedLaptop && (
                            <div className="flex justify-end pt-2">
                              <button
                                type="button"
                                onClick={() => onViewLaptopDetail(matchedLaptop)}
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 hover:text-blue-300 transition-colors"
                              >
                                <span>Lihat Spesifikasi & Benchmark Lengkap</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Buying Tips Advice */}
              <div className="space-y-2 border-t border-white/5 pt-4">
                <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Tips Belanja Cerdas</span>
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/10 p-4 rounded-xl border border-white/5 italic">
                  {renderFormattedText(result.advice)}
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
