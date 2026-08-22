import React from 'react';
import { soundFX } from '../utils/audioFX';
import { translations } from '../data/translations';

export default function HomeView({ onOpenScanner, onChangeTab, currentLang = 'hy' }) {
  const t = translations[currentLang] || translations.hy;

  return (
    <div className="space-y-8 px-2 md:px-0 py-4 animate-fadeIn">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-7 space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-['Archivo_Narrow'] font-black text-white leading-none uppercase tracking-tight sticker-effect p-3">
            {t.hero.title1} <br />
            <span className="text-[#ffd700] bg-[#1a1a1a] px-3 py-1 border-2 border-[#ffd700] inline-block mt-2">
              {t.hero.title2}
            </span>
          </h1>

          <p className="text-base md:text-lg font-['Montserrat'] text-[#d0c6ab] leading-relaxed max-w-xl border-l-4 border-[#ffd700] pl-4 italic">
            {t.subtitle}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => {
                soundFX.playScanChirp();
                onOpenScanner();
              }}
              className="bg-[#ffd700] text-[#1a1a1a] px-8 py-5 flex items-center justify-center gap-4 hover:bg-[#e9c400] active:scale-[0.98] transition-all border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] group w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-[32px] group-hover:rotate-12 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                qr_code_2
              </span>
              <span className="font-['Archivo_Narrow'] text-xl font-extrabold uppercase tracking-wide">
                {t.hero.findExhibit}
              </span>
            </button>

            <button 
              onClick={() => {
                soundFX.playClick();
                onChangeTab('exhibits');
              }}
              className="border-2 border-[#ffd700] text-[#ffd700] px-6 py-5 flex items-center justify-center gap-3 hover:bg-[#ffd700] hover:text-[#1a1a1a] transition-all font-['Archivo_Narrow'] text-lg font-extrabold uppercase tracking-wide"
            >
              <span className="material-symbols-outlined text-2xl">museum</span>
              <span>{t.nav.exhibits}</span>
            </button>
          </div>
        </div>

        {/* Visual Graphic of City with Heartbeat Pulse */}
        <div className="md:col-span-5 relative h-64 md:h-84 w-full bg-[#1A1A1A] border-2 border-[#ffd700] flex items-center justify-center overflow-hidden group shadow-2xl">
          <div className="absolute top-2 left-2 z-10 text-xs font-['Montserrat'] text-[#e2e2e2] bg-[#121414] px-2.5 py-1 border border-[#ffd700]/50 font-mono">
            YR-2026-PULSE
          </div>

          <div className="text-center p-6 space-y-3 z-10">
            <div className="relative inline-block cursor-pointer" onClick={() => soundFX.playScanChirp()}>
              <span className="material-symbols-outlined text-7xl text-[#ffd700] animate-pulse">
                ecg
              </span>
              <div className="absolute inset-0 bg-[#ffd700]/25 rounded-full blur-xl animate-ping"></div>
            </div>
            <h3 className="font-['Archivo_Narrow'] text-xl font-black uppercase text-[#e2e2e2] tracking-wider">
              YEREVAN URBAN PULSE
            </h3>
            <p className="font-['Montserrat'] text-xs text-[#d0c6ab] max-w-xs mx-auto">
              {currentLang === 'hy' 
                ? 'ՔԱՂԱՔԱՅԻՆ ԻՐԱՎԻՃԱԿԻ ՌԵԱԼ-ԺԱՄԱՆԱԿՅԱ ՄՈՆԻՏՈՐԻՆԳ'
                : 'REAL-TIME URBAN ECOLOGICAL MONITORING'}
            </p>
          </div>
          
          <div className="absolute inset-0 bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:16px_16px] opacity-15"></div>
        </div>
      </section>

      {/* Impact Stats (Bento Grid Style) */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#2A2A2A] museum-border p-6 relative flex flex-col justify-between h-48 group hover:bg-[#333535] transition-all">
          <div className="absolute top-4 right-4">
            <span className="material-symbols-outlined text-[#ffd700] text-4xl">delete</span>
          </div>
          <div className="text-xs font-['Montserrat'] text-[#d0c6ab] uppercase tracking-widest font-mono">
            STAT-01
          </div>
          <div>
            <h3 className="font-['Archivo_Narrow'] text-4xl font-black text-[#ffd700]">12,450 ԿԳ</h3>
            <p className="font-['Archivo_Narrow'] text-sm font-bold text-[#e2e2e2] mt-1 tracking-wider uppercase">
              {t.stats.cleanedTrash}
            </p>
          </div>
        </div>

        <div className="bg-[#2A2A2A] museum-border-white p-6 relative flex flex-col justify-between h-48 group hover:bg-[#333535] transition-all">
          <div className="absolute top-4 right-4">
            <span className="material-symbols-outlined text-[#e2e2e2] text-4xl">groups</span>
          </div>
          <div className="text-xs font-['Montserrat'] text-[#d0c6ab] uppercase tracking-widest font-mono">
            STAT-02
          </div>
          <div>
            <h3 className="font-['Archivo_Narrow'] text-4xl font-black text-[#e2e2e2]">3,200</h3>
            <p className="font-['Archivo_Narrow'] text-sm font-bold text-[#ffd700] mt-1 tracking-wider uppercase">
              {t.stats.activeCitizens}
            </p>
          </div>
        </div>

        <div className="bg-[#2A2A2A] museum-border p-6 relative flex flex-col justify-between h-48 group hover:bg-[#333535] transition-all">
          <div className="absolute top-4 right-4">
            <span className="material-symbols-outlined text-[#78dc77] text-4xl">location_on</span>
          </div>
          <div className="text-xs font-['Montserrat'] text-[#d0c6ab] uppercase tracking-widest font-mono">
            STAT-03
          </div>
          <div>
            <h3 className="font-['Archivo_Narrow'] text-4xl font-black text-[#78dc77]">12 SECTORS</h3>
            <p className="font-['Archivo_Narrow'] text-sm font-bold text-[#e2e2e2] mt-1 tracking-wider uppercase">
              {currentLang === 'hy' ? '12 ԹԱՂԱՄԱՍԵՐՈՒՄ' : 'COVERED DISTRICTS'}
            </p>
          </div>
        </div>
      </section>

      {/* What is this Section */}
      <section className="space-y-6 pt-4">
        <h2 className="font-['Archivo_Narrow'] text-2xl md:text-3xl font-black text-[#e2e2e2] uppercase border-b-2 border-[#ffd700] pb-2 inline-block tracking-wider">
          {currentLang === 'hy' ? 'Ի՞ՆՉ Է ՍԱ (CONCEPT)' : 'HOW IT WORKS'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            onClick={() => {
              soundFX.playClick();
              onOpenScanner();
            }}
            className="bg-[#121414] p-6 border-l-4 border-[#ffd700] hover:bg-[#1A1A1A] transition-all border border-[#4d4732] cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[#ffd700] text-4xl mb-4 group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
              my_location
            </span>
            <h4 className="font-['Archivo_Narrow'] text-xl font-bold text-[#e2e2e2] mb-2 uppercase">1. Document</h4>
            <p className="font-['Montserrat'] text-sm text-[#d0c6ab] leading-relaxed">
              Find an urban friction point. A trash pile or plastic bottle. Scan the area and log it into the public record as an "exhibit".
            </p>
          </div>

          <div 
            onClick={() => {
              soundFX.playClick();
              onChangeTab('exhibits');
            }}
            className="bg-[#121414] p-6 border-l-4 border-[#e2e2e2] hover:bg-[#1A1A1A] transition-all border border-[#4d4732] cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[#e2e2e2] text-4xl mb-4 group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
              campaign
            </span>
            <h4 className="font-['Archivo_Narrow'] text-xl font-bold text-[#e2e2e2] mb-2 uppercase">2. Expose</h4>
            <p className="font-['Montserrat'] text-sm text-[#d0c6ab] leading-relaxed">
              The object is framed in a museum label with its decomposition lifespan plaque. Neglect is put on display for all citizens to see.
            </p>
          </div>

          <div 
            onClick={() => {
              soundFX.playClick();
              onChangeTab('ranks');
            }}
            className="bg-[#121414] p-6 border-l-4 border-[#ffd700] hover:bg-[#1A1A1A] transition-all border border-[#4d4732] cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[#ffd700] text-4xl mb-4 group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
              build
            </span>
            <h4 className="font-['Archivo_Narrow'] text-xl font-bold text-[#e2e2e2] mb-2 uppercase">3. Resolve</h4>
            <p className="font-['Montserrat'] text-sm text-[#d0c6ab] leading-relaxed">
              Mobilize civic action. Clean exhibits, earn Eco-Pulse points, elevate your district leaderboard position, and unlock stencil badges.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
