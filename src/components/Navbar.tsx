import React, { useState } from "react";
import { Laptop, Sparkles, GitCompare, Database, Menu, X, Home } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  compareCount: number;
}

export default function Navbar({ activeTab, setActiveTab, compareCount }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Beranda", icon: Home },
    { id: "database", label: "Database Laptop", icon: Database },
    { id: "compare", label: "Bandingkan", icon: GitCompare, badge: compareCount > 0 ? compareCount : undefined },
    { id: "ai", label: "Rekomendasi AI", icon: Sparkles, highlights: true },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 shadow-xl bg-slate-900/45 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2 cursor-pointer group"
            id="nav-logo"
          >
            <div className="p-2 rounded-lg bg-blue-600/20 border border-blue-500/30 group-hover:bg-blue-600/30 group-hover:border-blue-500/50 transition-all duration-300">
              <Laptop className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-display font-bold text-xl tracking-wider bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">
              LAPTOP<span className="text-blue-500 text-lg">SPEC</span>
            </span>
            <span className="font-mono text-[9px] bg-blue-950 text-blue-300 px-1.5 py-0.5 rounded border border-blue-900/30 hidden sm:inline">
              v2026.05
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1" id="desktop-nav-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative ${
                    isActive
                      ? "text-blue-400 bg-blue-500/10 border-b border-blue-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  } ${
                    item.highlights ? "hover:shadow-[0_0_15px_-3px_rgba(59,130,246,0.5)] border border-transparent hover:border-blue-500/20" : ""
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-slate-400"} ${item.highlights && !isActive ? "text-cyan-400 animate-pulse" : ""}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white ring-2 ring-slate-950 animate-bounce">
                      {item.badge}
                    </span>
                  )}
                  {item.highlights && !isActive && (
                    <span className="absolute top-1/2 -translate-y-1/2 right-2 flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
              aria-expanded="false"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-white/5 px-2 pt-2 pb-4 space-y-1 animate-fade-in" id="mobile-nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-base font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600/20 text-blue-400 border-l-4 border-blue-500"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-slate-400" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                    {item.badge}
                  </span>
                )}
                {item.highlights && !isActive && (
                  <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 px-1.5 py-0.5 rounded">
                    PRO
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
