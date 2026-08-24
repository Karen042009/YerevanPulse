import React from 'react';
import { soundFX } from '../utils/audioFX';
import { translations } from '../data/translations';

export default function Header({ 
  activeTab, 
  onChangeTab, 
  onOpenScanner, 
  onOpenReport,
  onOpenRewards,
  onOpenTheme,
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
    <header className="sticky top-0 w-full z-50 bg-[var(--surface-1)]/95 border-b-2 border-[var(--primary-gold)]/40 px-2 sm:px-4 lg:px-8 xl:px-10 h-14 sm:h-16 backdrop-blur-md shadow-lg transition-colors">
      <div className="w-full max-w-[1920px] mx-auto h-full flex justify-between items-center gap-2">
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
            className="text-[var(--primary-gold)] hover:scale-105 active:scale-95 transition-all p-1 sm:p-1.5 bg-[var(--bg-main)] border border-[var(--primary-gold)] flex items-center justify-center shadow-[2px_2px_0px_0px_var(--primary-gold)] rounded-sm"
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
              className="h-7 sm:h-8 md:h-9 w-auto object-contain border border-[var(--primary-gold)] p-0.5 bg-black rounded-sm shadow-[1px_1px_0px_0px_var(--primary-gold)] sm:shadow-[2px_2px_0px_0px_var(--primary-gold)]"
            />
            <div className="flex flex-col max-w-[90px] sm:max-w-none overflow-hidden">
              <h1 className="font-['Outfit'] text-[12px] sm:text-base md:text-lg font-black tracking-tight text-[var(--primary-gold)] uppercase leading-none truncate">
                YEREVAN PULSE
              </h1>
              <span className="hidden xl:block font-['Space_Grotesk'] text-[9px] text-gray-400 uppercase tracking-wider">
                {currentLang === 'hy' ? 'ՔԱՂԱՔԱՅԻՆ ԻՆՏԵՐՎԵՆՑԻԱ' : 'CIVIC INTERVENTION'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
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
              className={`font-['Archivo_Narrow'] text-[11px] xl:text-xs font-bold uppercase tracking-wider flex items-center gap-1 xl:gap-1.5 py-1.5 px-2 xl:px-3 rounded border transition-all ${
                activeTab === tab.id 
                  ? 'bg-[var(--primary-gold)] text-[var(--bg-deep)] border-[var(--primary-gold)] shadow-[0_0_15px_var(--primary-gold-glow)]' 
                  : 'text-gray-300 border-transparent hover:border-[var(--primary-gold)] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Header Actions Toolbar */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={() => {
              soundFX.playClick();
              if (onToggleLang) onToggleLang();
            }}
            className="text-[var(--primary-gold)] font-['Space_Grotesk'] text-[10px] sm:text-xs font-bold uppercase px-1.5 sm:px-2 py-1.5 bg-[var(--bg-main)] border border-[var(--primary-gold)]/60 hover:border-[var(--primary-gold)] transition-all flex items-center gap-1 rounded"
            title="Փոխել լեզուն / Switch Language"
          >
            <span className="material-symbols-outlined text-sm sm:text-base">language</span>
            <span className="hidden sm:inline">{currentLang === 'hy' ? 'ARM 🇦🇲' : 'ENG 🇬🇧'}</span>
          </button>

          {/* Color Themes Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              if (onOpenTheme) onOpenTheme();
            }}
            className="bg-[var(--bg-main)] border border-gray-700 hover:border-[var(--primary-gold)] text-gray-300 hover:text-[var(--primary-gold)] px-1.5 sm:px-2 py-1.5 text-xs font-['Space_Grotesk'] font-bold uppercase transition-all flex items-center gap-1 rounded"
            title=" Գունային Թեմաներ / Color Themes"
          >
            <span className="material-symbols-outlined text-sm sm:text-base text-[var(--primary-gold)]">palette</span>
            <span className="hidden md:inline">{currentLang === 'hy' ? '🎨 ԹԵՄԱՆԵՐ' : '🎨 THEMES'}</span>
          </button>

          {/* Civic Rewards Store Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              if (onOpenRewards) onOpenRewards();
            }}
            className="bg-[var(--primary-gold)]/10 border border-[var(--primary-gold)] text-[var(--primary-gold)] hover:bg-[var(--primary-gold)] hover:text-[var(--bg-deep)] px-1.5 sm:px-2.5 py-1.5 text-xs font-['Archivo_Narrow'] font-black uppercase transition-all flex items-center gap-1 rounded shadow-[0_0_15px_var(--primary-gold-glow)] animate-pulse"
            title=" Civic Rewards Store"
          >
            <span className="material-symbols-outlined text-base">card_giftcard</span>
            <span className="hidden sm:inline">{currentLang === 'hy' ? '🎁 ԽԱՆՈՒԹ' : '🎁 REWARDS'}</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            className="text-gray-300 hover:text-[var(--primary-gold)] p-1.5 bg-[var(--bg-main)] border border-gray-700 flex items-center justify-center transition-all rounded"
            title={isMuted ? 'Muted' : 'Sound On'}
          >
            <span className="material-symbols-outlined text-base">
              {isMuted ? 'volume_off' : 'volume_up'}
            </span>
          </button>

          {/* Add Exhibit Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              if (onOpenReport) onOpenReport();
            }}
            className="hidden 2xl:flex border border-[var(--primary-gold)] text-[var(--primary-gold)] hover:bg-[var(--primary-gold)] hover:text-[var(--bg-deep)] px-2.5 py-1.5 text-xs font-['Archivo_Narrow'] font-bold uppercase transition-all items-center gap-1 rounded"
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
            className="bg-[var(--bg-main)] border border-[var(--primary-gold)] text-[var(--primary-gold)] hover:bg-[var(--primary-gold)] hover:text-[var(--bg-deep)] px-1.5 sm:px-2.5 py-1.5 text-xs font-['Archivo_Narrow'] font-bold uppercase transition-all flex items-center gap-1 rounded shadow-[0_0_10px_var(--primary-gold-glow)]"
          >
            <span className="material-symbols-outlined text-base">
              {isGuest ? 'account_circle' : 'person'}
            </span>
            <span className="hidden lg:inline truncate max-w-[100px]">
              {isGuest ? (currentLang === 'hy' ? 'ՄՈՒՏՔ' : 'LOGIN') : currentUser.name}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
