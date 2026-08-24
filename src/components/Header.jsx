import React from 'react';
import { soundFX } from '../utils/audioFX';
import { translations } from '../data/translations';

export default function Header({ 
  activeTab, 
  onChangeTab, 
  onOpenScanner, 
  onOpenReport,
  onOpenRewards,
  onOpenAuth, 
  currentUser,
  currentLang = 'hy',
  onToggleLang
}) {
  const [isMuted, setIsMuted] = React.useState(() => soundFX.isMuted);
  const t = translations[currentLang] || translations.hy;
  const isGuest = currentUser?.isGuest;

  const toggleSound = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
    if (!muted) soundFX.playClick();
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-[#0b0e14]/95 border-b-2 border-[#ffc700]/40 px-3 sm:px-6 lg:px-10 xl:px-12 h-14 sm:h-16 backdrop-blur-md shadow-lg">
      <div className="w-full max-w-[1920px] mx-auto h-full flex justify-between items-center">
      {/* Brand & Logo */}
      <div 
        onClick={() => {
          soundFX.playClick();
          onChangeTab('home');
        }}
        className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer hover:opacity-90 transition-opacity shrink-0"
      >
        <button 
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            soundFX.playScanChirp();
            onOpenScanner();
          }}
          className="text-[#ffc700] hover:scale-105 active:scale-95 transition-all p-1 sm:p-1.5 bg-[#121620] border border-[#ffc700] flex items-center justify-center shadow-[2px_2px_0px_0px_#ffc700] rounded-sm"
          title={t.modals.scanQR}
        >
          <span className="material-symbols-outlined text-lg sm:text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            qr_code_scanner
          </span>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <img 
            src="/logo.png" 
            alt="Yerevan Pulse Logo" 
            className="h-7 sm:h-8 md:h-9 w-auto object-contain border border-[#ffc700] p-0.5 bg-black rounded-sm shadow-[1px_1px_0px_0px_#ffc700] sm:shadow-[2px_2px_0px_0px_#ffc700]"
          />
          <div className="flex flex-col max-w-[100px] sm:max-w-none overflow-hidden">
            <h1 className="font-['Outfit'] text-[13px] sm:text-base md:text-lg font-black tracking-tight text-[#ffc700] uppercase leading-none truncate">
              YEREVAN PULSE
            </h1>
            <span className="hidden md:block font-['Space_Grotesk'] text-[9px] text-gray-400 uppercase tracking-wider">
              {currentLang === 'hy' ? 'ՔԱՂԱՔԱՅԻՆ ԻՆՏԵՐՎԵՆՑԻԱ' : 'CIVIC INTERVENTION'}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="hidden lg:flex items-center gap-2">
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
            className={`font-['Archivo_Narrow'] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 py-1.5 px-3 rounded border transition-all ${
              activeTab === tab.id 
                ? 'bg-[#ffc700] text-[#0b0e14] border-[#ffc700] shadow-[0_0_15px_rgba(255,199,0,0.3)]' 
                : 'text-gray-300 border-transparent hover:border-[#ffc700] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Header Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Language Switcher */}
        <button
          onClick={() => {
            soundFX.playClick();
            if (onToggleLang) onToggleLang();
          }}
          className="text-[#ffc700] font-['Space_Grotesk'] text-[10px] sm:text-xs font-bold uppercase px-1.5 sm:px-2.5 py-1.5 bg-[#121620] border border-[#ffc700]/60 hover:border-[#ffc700] transition-all flex items-center gap-1 sm:gap-1.5 rounded"
          title="Փոխել լեզուն / Switch Language"
        >
          <span className="material-symbols-outlined text-sm sm:text-base">language</span>
          <span className="hidden min-[400px]:inline">{currentLang === 'hy' ? 'ARM 🇦🇲' : 'ENG 🇬🇧'}</span>
        </button>

        {/* Civic Rewards Store Button */}
        <button
          onClick={() => {
            soundFX.playClick();
            if (onOpenRewards) onOpenRewards();
          }}
          className="bg-[#ffc700]/10 border border-[#ffc700] text-[#ffc700] hover:bg-[#ffc700] hover:text-[#0b0e14] px-2 sm:px-3 py-1.5 text-xs font-['Archivo_Narrow'] font-black uppercase transition-all flex items-center gap-1.5 rounded shadow-[0_0_15px_rgba(255,199,0,0.2)] animate-pulse"
          title=" Civic Rewards Store"
        >
          <span className="material-symbols-outlined text-base sm:text-lg">card_giftcard</span>
          <span className="hidden min-[480px]:inline">{currentLang === 'hy' ? '🎁 ԽԱՆՈՒԹ' : '🎁 REWARDS'}</span>
        </button>

        {/* Sound FX Toggle */}
        <button
          onClick={toggleSound}
          className="text-gray-300 hover:text-[#ffc700] p-1.5 bg-[#121620] border border-gray-700 flex items-center justify-center transition-all rounded"
          title={isMuted ? 'Muted' : 'Sound On'}
        >
          <span className="material-symbols-outlined text-base sm:text-lg">
            {isMuted ? 'volume_off' : 'volume_up'}
          </span>
        </button>

        {/* Add Exhibit Button */}
        <button
          onClick={() => {
            soundFX.playClick();
            if (onOpenReport) onOpenReport();
          }}
          className="hidden sm:flex border border-[#ffc700] text-[#ffc700] hover:bg-[#ffc700] hover:text-[#0b0e14] px-2.5 py-1.5 text-xs font-['Archivo_Narrow'] font-bold uppercase transition-all items-center gap-1 rounded"
        >
          <span className="material-symbols-outlined text-base">add_location_alt</span>
          <span>+ {t.hero.reportExhibit}</span>
        </button>

        {/* Auth / Account Register Button */}
        <button
          onClick={() => {
            soundFX.playClick();
            onOpenAuth();
          }}
          className="bg-[#121620] border border-[#ffc700] text-[#ffc700] hover:bg-[#ffc700] hover:text-[#0b0e14] px-1.5 sm:px-3 py-1.5 text-xs font-['Archivo_Narrow'] font-bold uppercase transition-all flex items-center gap-1.5 rounded shadow-[0_0_10px_rgba(255,199,0,0.15)]"
        >
          <span className="material-symbols-outlined text-base sm:text-lg">
            {isGuest ? 'account_circle' : 'person'}
          </span>
          <span className="hidden sm:inline">
            {isGuest ? (currentLang === 'hy' ? 'ԳՐԱՆՑՈՒՄ / ՄՈՒՏՔ' : 'REGISTER / LOGIN') : currentUser.name}
          </span>
        </button>
      </div>
    </div>
  </header>
  );
}
