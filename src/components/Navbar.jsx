import React from 'react';
import { Info, Sparkles, QrCode } from 'lucide-react';

export default function Navbar({ ecoPoints, cleanedCount, onOpenPitch, onOpenScanner }) {
  return (
    <header className="sticky top-0 z-40 bg-[#0A0D14]/90 backdrop-blur-md border-b border-white/10 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-500/20 text-xl font-bold">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-base tracking-tight text-white font-['Outfit']">
                Yerevan<span className="text-rose-500">Pulse</span>
              </h1>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 font-mono border border-rose-500/30">
                LIVE
              </span>
            </div>
            <p className="text-[11px] text-gray-400 leading-none">
              Երևանը ցուցասրահ չէ
            </p>
          </div>
        </div>

        {/* User Stats & Actions */}
        <div className="flex items-center gap-2">
          {/* Scan Shortcut */}
          <button 
            onClick={onOpenScanner}
            className="flex items-center gap-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
            title="Սկանավորել QR"
          >
            <QrCode className="w-4 h-4" />
            <span className="hidden sm:inline">QR</span>
          </button>

          {/* Points Counter */}
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <div className="flex flex-col text-right">
              <span className="text-xs font-bold text-amber-300 font-mono leading-none">
                {ecoPoints} pt
              </span>
              <span className="text-[9px] text-gray-400 leading-none">
                {cleanedCount} մաքրված
              </span>
            </div>
          </div>

          {/* Pitch Guide / Help */}
          <button 
            onClick={onOpenPitch}
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-gray-300 transition-all"
            title="Նախագծի Մասին (Pitch Info)"
          >
            <Info className="w-4 h-4 text-rose-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
