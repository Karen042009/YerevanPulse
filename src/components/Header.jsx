import React from 'react';
import { soundFX } from '../utils/audioFX';
import { translations } from '../data/translations';

export default function Header({ 
  activeTab, 
  onChangeTab, 
  onOpenScanner, 
  onOpenReport,
  onOpenAuth, 
  currentUser,
  currentLang = 'hy',
  onToggleLang
}) {
  const [isMuted, setIsMuted] = React.useState(() => soundFX.isMuted);
  const t = translations[currentLang] || translations.hy;

  const toggleSound = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
    if (!muted) soundFX.playClick();
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-[#121414]/90 border-b-2 border-[#ffd700]/30 px-3 md:px-8 h-16 flex justify-between items-center backdrop-blur-md">
      {/* Brand & Logo */}
      <div 
        onClick={() => {
          soundFX.playClick();
          onChangeTab('home');
        }}
        className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
      >
        <button 
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            soundFX.playScanChirp();
            onOpenScanner();
          }}
          className="text-[#ffd700] hover:scale-105 active:scale-95 transition-all p-1.5 bg-[#1a1c1c] border border-[#ffd700] flex items-center justify-center shadow-[2px_2px_0px_0px_#ffd700]"
          title={t.modals.scanQR}
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            qr_code_scanner
          </span>
        </button>

        <div className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="Yerevan Pulse Logo" 
            className="h-8 md:h-9 w-auto object-contain border border-[#ffd700] p-0.5 bg-black rounded-sm shadow-[2px_2px_0px_0px_#ffd700]"
          />
          <div>
            <h1 className="font-['Archivo_Narrow'] text-base md:text-xl font-extrabold tracking-tighter text-[#ffd700] uppercase leading-none">
              {t.appName}
            </h1>
            <span className="hidden sm:block font-['Montserrat'] text-[8px] md:text-[9px] text-[#d0c6ab] uppercase tracking-widest font-mono">
              {t.tagline}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-3">
        {[
          { id: 'home', label: t.nav.home, icon: 'home' },
          { id: 'exhibits', label: t.nav.exhibits, icon: 'museum' },
          { id: 'map', label: t.nav.map, icon: 'map' },
          { id: 'ranks', label: t.nav.ranks, icon: 'leaderboard' },
          { id: 'profile', label: t.nav.profile, icon: 'person' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => { soundFX.playClick(); onChangeTab(tab.id); }}
            className={`font-['Archivo_Narrow'] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 py-1.5 px-3 border transition-all ${
              activeTab === tab.id 
                ? 'bg-[#ffd700] text-[#1a1a1a] border-[#ffd700] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]' 
                : 'text-[#d0c6ab] border-transparent hover:border-[#ffd700] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Header Actions (Language, Sound, Civic Report & User Profile) */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Language Switcher */}
        <button
          onClick={() => {
            soundFX.playClick();
            if (onToggleLang) onToggleLang();
          }}
          className="text-[#ffd700] font-['Archivo_Narrow'] text-xs font-bold uppercase px-2 py-1 bg-[#1a1c1c] border border-[#ffd700]/60 hover:border-[#ffd700] transition-all flex items-center gap-1"
          title="Փոխել լեզուն / Switch Language"
        >
          <span className="material-symbols-outlined text-sm">language</span>
          <span>{currentLang === 'hy' ? 'ARM 🇦🇲' : 'ENG 🇬🇧'}</span>
        </button>

        {/* Sound FX Toggle Button */}
        <button
          onClick={toggleSound}
          className="text-[#d0c6ab] hover:text-[#ffd700] p-1.5 bg-[#1a1c1c] border border-[#4d4732] flex items-center justify-center transition-all"
          title={isMuted ? 'Muted' : 'Sound On'}
        >
          <span className="material-symbols-outlined text-lg">
            {isMuted ? 'volume_off' : 'volume_up'}
          </span>
        </button>

        {/* Add Exhibit Civic Button */}
        <button
          onClick={() => {
            soundFX.playClick();
            if (onOpenReport) onOpenReport();
          }}
          className="hidden lg:flex border border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700] hover:text-[#1a1a1a] px-2.5 py-1.5 text-xs font-['Archivo_Narrow'] font-bold uppercase transition-all items-center gap-1"
          title={t.hero.reportExhibit}
        >
          <span className="material-symbols-outlined text-base">add_location_alt</span>
          <span>{t.hero.reportExhibit}</span>
        </button>

        {/* QR Scanner Button */}
        <button
          onClick={() => {
            soundFX.playScanChirp();
            onOpenScanner();
          }}
          className="hidden sm:flex bg-[#ffd700] text-[#1a1a1a] px-3 py-1.5 text-xs font-['Archivo_Narrow'] font-black uppercase tracking-wider items-center gap-1.5 hover:bg-[#e9c400] transition-all border border-white shadow-[2px_2px_0px_0px_#ffffff]"
        >
          <span className="material-symbols-outlined text-base">qr_code_2</span>
          <span>{t.modals.scanQR}</span>
        </button>

        {currentUser ? (
          <button
            onClick={() => {
              soundFX.playClick();
              onChangeTab('profile');
            }}
            className="hover:scale-105 transition-all cursor-pointer rounded-full overflow-hidden w-9 h-9 border-2 border-[#ffd700] shadow-[0_0_10px_rgba(255,215,0,0.4)] flex-shrink-0"
            title={currentUser.name}
          >
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-full h-full object-cover grayscale contrast-125" 
            />
          </button>
        ) : (
          <button
            onClick={() => {
              soundFX.playClick();
              onOpenAuth();
            }}
            className="border border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700] hover:text-[#1a1a1a] px-3 py-1.5 text-xs font-['Archivo_Narrow'] font-bold uppercase transition-all"
          >
            {t.modals.login}
          </button>
        )}
      </div>
    </header>
  );
}
