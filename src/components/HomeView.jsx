import React from 'react';
import { soundFX } from '../utils/audioFX';
import { translations } from '../data/translations';

export default function HomeView({ onOpenScanner, onChangeTab, currentLang = 'hy' }) {
  const t = translations[currentLang] || translations.hy;

  return (
    <div className="space-y-10 px-2 md:px-0 py-4 animate-fadeIn">
      {/* Ultra-Vibrant Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a202c] border border-[#ffc700]/50 rounded-full shadow-[0_0_15px_rgba(255,199,0,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#ffc700] animate-ping" />
            <span className="font-['Space_Grotesk'] text-xs font-bold tracking-widest text-[#ffc700] uppercase">
              LIVE CIVIC MONITORING V2.0
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-['Outfit'] font-black text-white leading-none uppercase tracking-tight break-words">
            {t.hero.title1} <br />
            <span className="text-gradient-gold bg-[#121620] px-3 sm:px-4 py-1 sm:py-1.5 border-2 border-[#ffc700] inline-block mt-2 sm:mt-3 shadow-[0_0_30px_rgba(255,199,0,0.25)] rounded-sm max-w-full overflow-hidden text-ellipsis">
              {t.hero.title2}
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg font-['Montserrat'] text-gray-300 leading-relaxed max-w-xl border-l-4 border-[#ffc700] pl-3 sm:pl-4 italic">
            {t.subtitle}
          </p>

          <div className="pt-3 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => {
                soundFX.playScanChirp();
                onOpenScanner();
              }}
              className="btn-primary-glow px-8 py-5 flex items-center justify-center gap-4 group w-full sm:w-auto"
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
              className="border-2 border-[#ffc700] text-[#ffc700] hover:bg-[#ffc700] hover:text-[#0b0e14] px-6 py-5 flex items-center justify-center gap-3 transition-all font-['Archivo_Narrow'] text-lg font-extrabold uppercase tracking-wide shadow-[0_0_20px_rgba(255,199,0,0.15)]"
            >
              <span className="material-symbols-outlined text-2xl">museum</span>
              <span>{t.nav.exhibits}</span>
            </button>
          </div>
        </div>

        {/* Visual Animated Cyber Pulse Graphic Box */}
        <div className="lg:col-span-5 relative h-72 lg:h-96 w-full bg-gradient-to-br from-[#121620] to-[#0b0e14] border-2 border-[#ffc700] flex items-center justify-center overflow-hidden group shadow-[0_0_40px_rgba(255,199,0,0.2)] rounded-lg">
          <div className="absolute top-3 left-3 z-10 text-xs font-mono text-[#ffc700] bg-[#06080c]/90 px-3 py-1 border border-[#ffc700]/60 rounded">
            SYS-ID: YR-2026-PULSE
          </div>

          <div className="text-center p-6 space-y-4 z-10">
            <div 
              className="relative inline-block cursor-pointer group-hover:scale-110 transition-transform"
              onClick={() => soundFX.playScanChirp()}
            >
              <div className="w-24 h-24 rounded-full border-2 border-[#ffc700] flex items-center justify-center pulse-radar bg-[#ffc700]/10">
                <span className="material-symbols-outlined text-6xl text-[#ffc700] animate-pulse">
                  ecg
                </span>
              </div>
            </div>
            <h3 className="font-['Outfit'] text-2xl font-black uppercase text-gradient-gold tracking-wider">
              YEREVAN ECOLOGICAL PULSE
            </h3>
            <p className="font-['Montserrat'] text-xs text-gray-300 max-w-xs mx-auto">
              {currentLang === 'hy' 
                ? 'ՔԱՂԱՔԱՅԻՆ ԻՐԱՎԻՃԱԿԻ ՌԵԱԼ-ԺԱՄԱՆԱԿՅԱ ՄՈՆԻՏՈՐԻՆԳ'
                : 'REAL-TIME URBAN ECOLOGICAL MONITORING'}
            </p>
          </div>
          
          {/* Cyber Grid Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffc700_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
        </div>
      </section>

      {/* Impact Stats Bento Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="museum-label p-6 relative flex flex-col justify-between h-52 group cursor-pointer border-l-4 border-l-[#ffc700]">
          <div className="absolute top-4 right-4 w-12 h-12 bg-[#ffc700]/10 border border-[#ffc700]/40 rounded-xl flex items-center justify-center text-[#ffc700] group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">delete</span>
          </div>
          <div className="text-xs font-mono text-[#ffc700] uppercase tracking-widest">
            METRIC-01
          </div>
          <div>
            <h3 className="font-['Outfit'] text-4xl font-black text-gradient-gold">12,450 ԿԳ</h3>
            <p className="font-['Archivo_Narrow'] text-sm font-bold text-gray-200 mt-1 tracking-wider uppercase">
              {t.stats.cleanedTrash}
            </p>
          </div>
        </div>

        <div className="museum-label p-6 relative flex flex-col justify-between h-52 group cursor-pointer border-l-4 border-l-[#00f5d4]">
          <div className="absolute top-4 right-4 w-12 h-12 bg-[#00f5d4]/10 border border-[#00f5d4]/40 rounded-xl flex items-center justify-center text-[#00f5d4] group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">groups</span>
          </div>
          <div className="text-xs font-mono text-[#00f5d4] uppercase tracking-widest">
            METRIC-02
          </div>
          <div>
            <h3 className="font-['Outfit'] text-4xl font-black text-gradient-cyan">3,200</h3>
            <p className="font-['Archivo_Narrow'] text-sm font-bold text-gray-200 mt-1 tracking-wider uppercase">
              {t.stats.activeCitizens}
            </p>
          </div>
        </div>

        <div className="museum-label p-6 relative flex flex-col justify-between h-52 group cursor-pointer border-l-4 border-l-[#ff007a]">
          <div className="absolute top-4 right-4 w-12 h-12 bg-[#ff007a]/10 border border-[#ff007a]/40 rounded-xl flex items-center justify-center text-[#ff007a] group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">location_on</span>
          </div>
          <div className="text-xs font-mono text-[#ff007a] uppercase tracking-widest">
            METRIC-03
          </div>
          <div>
            <h3 className="font-['Outfit'] text-4xl font-black text-gradient-magenta">12 SECTORS</h3>
            <p className="font-['Archivo_Narrow'] text-sm font-bold text-gray-200 mt-1 tracking-wider uppercase">
              {currentLang === 'hy' ? '12 ԹԱՂԱՄԱՍԵՐՈՒՄ' : 'COVERED DISTRICTS'}
            </p>
          </div>
        </div>
      </section>

      {/* 3-Step Interactive Process */}
      <section className="space-y-6 pt-6">
        <div className="flex items-center gap-3 border-b-2 border-[#ffc700] pb-3 shadow-[0_4px_15px_-5px_rgba(255,199,0,0.1)]">
          <div className="w-10 h-10 bg-[#ffc700]/10 rounded flex items-center justify-center border border-[#ffc700]/40">
            <span className="material-symbols-outlined text-[#ffc700] text-2xl">model_training</span>
          </div>
          <h2 className="font-['Outfit'] text-2xl md:text-3xl font-black text-white uppercase tracking-wider text-gradient-gold">
            {currentLang === 'hy' ? 'Ի՞ՆՉ Է ՍԱ (CONCEPT)' : 'HOW IT WORKS'}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            onClick={() => {
              soundFX.playClick();
              onOpenScanner();
            }}
            className="museum-label p-6 border-l-4 border-l-[#ffc700] cursor-pointer group hover:bg-[#ffc700]/5 transition-all h-full flex flex-col"
          >
            <div className="w-14 h-14 bg-[#ffc700]/10 border border-[#ffc700] rounded-xl flex items-center justify-center text-[#ffc700] mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,199,0,0.2)]">
              <span className="material-symbols-outlined text-3xl">my_location</span>
            </div>
            <h4 className="font-['Outfit'] text-xl font-bold text-white mb-2 uppercase group-hover:text-[#ffc700] transition-colors">
              {currentLang === 'hy' ? '1. ՖԻՔՍԵԼ' : '1. DOCUMENT'}
            </h4>
            <p className="font-['Montserrat'] text-sm text-gray-300 leading-relaxed flex-1">
              {currentLang === 'hy' 
                ? 'Գտեք քաղաքային աղբ (օր.՝ պլաստիկ շիշ): Սկանավորեք և գրանցեք այն որպես թանգարանային ցուցանմուշ՝ ավելացնելով բազայում:'
                : 'Find an urban friction point. A plastic bottle or cigarette butts. Scan and log it into the public record as a museum exhibit.'}
            </p>
          </div>

          <div 
            onClick={() => {
              soundFX.playClick();
              onChangeTab('exhibits');
            }}
            className="museum-label p-6 border-l-4 border-l-[#00f5d4] cursor-pointer group hover:bg-[#00f5d4]/5 transition-all h-full flex flex-col"
          >
            <div className="w-14 h-14 bg-[#00f5d4]/10 border border-[#00f5d4] rounded-xl flex items-center justify-center text-[#00f5d4] mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,245,212,0.2)]">
              <span className="material-symbols-outlined text-3xl">campaign</span>
            </div>
            <h4 className="font-['Outfit'] text-xl font-bold text-white mb-2 uppercase group-hover:text-[#00f5d4] transition-colors">
              {currentLang === 'hy' ? '2. ՑՈՒՑԱԴՐԵԼ' : '2. EXPOSE'}
            </h4>
            <p className="font-['Montserrat'] text-sm text-gray-300 leading-relaxed flex-1">
              {currentLang === 'hy'
                ? 'Առարկան ստանում է թանգարանային ցուցանակ՝ իր քայքայման տևողությամբ: Անփութությունը դրվում է ցուցադրության բոլորի համար:'
                : 'The object is framed in a museum label with its decomposition lifespan plaque. Neglect is put on display for all citizens to see.'}
            </p>
          </div>

          <div 
            onClick={() => {
              soundFX.playClick();
              onChangeTab('ranks');
            }}
            className="museum-label p-6 border-l-4 border-l-[#ff007a] cursor-pointer group hover:bg-[#ff007a]/5 transition-all h-full flex flex-col"
          >
            <div className="w-14 h-14 bg-[#ff007a]/10 border border-[#ff007a] rounded-xl flex items-center justify-center text-[#ff007a] mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,0,122,0.2)]">
              <span className="material-symbols-outlined text-3xl">build</span>
            </div>
            <h4 className="font-['Outfit'] text-xl font-bold text-white mb-2 uppercase group-hover:text-[#ff007a] transition-colors">
              {currentLang === 'hy' ? '3. ՄԱՔՐԵԼ' : '3. RESOLVE'}
            </h4>
            <p className="font-['Montserrat'] text-sm text-gray-300 leading-relaxed flex-1">
              {currentLang === 'hy'
                ? 'Ակտիվացրեք քաղաքացիական ուժը: Մաքրեք ցուցանմուշները, վաստակեք միավորներ և բարձրացրեք ձեր թաղամասի վարկանիշը:'
                : 'Mobilize civic action. Clean exhibits, earn Eco-Pulse points, elevate your district leaderboard position, and unlock badges.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
