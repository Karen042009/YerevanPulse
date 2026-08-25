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
    <header className="app-header sticky top-0 w-full z-50 bg-[var(--surface-1)]/95 border-b-2 border-[var(--primary-gold)]/50 px-2 sm:px-4 lg:px-6 h-14 sm:h-16 backdrop-blur-md shadow-lg transition-colors">
      <div className="w-full max-w-[1680px] mx-auto h-full flex justify-between items-center gap-2">
        {/* Brand & Logo */}
        <div 
          onClick={() => {
            soundFX.playClick();
            onChangeTab('home');
          }}
          className="app-brand flex items-center gap-2 sm:gap-2.5 cursor-pointer hover:opacity-90 transition-opacity shrink-0 min-w-0"
        >
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playScanChirp();
              onOpenScanner();
            }}
            className="text-[var(--primary-gold)] hover:scale-105 active:scale-95 transition-all w-9 h-9 sm:w-10 sm:h-10 bg-[var(--bg-main)] border border-[var(--primary-gold)] flex items-center justify-center shadow-[2px_2px_0px_0px_var(--primary-gold)] rounded-sm shrink-0"
            title={t.modals.scanQR}
          >
            <span className="material-symbols-outlined text-xl sm:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              qr_code_scanner
            </span>
          </button>

          <div className="flex items-center gap-2 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 border border-[var(--primary-gold)] p-1 bg-black rounded-sm shadow-[2px_2px_0px_0px_var(--primary-gold)] shrink-0 flex items-center justify-center hover:scale-105 transition-transform">
              <img 
                src="/logo.png" 
                alt="Yerevan Pulse Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden md:flex flex-col min-w-0">
              <h1 className="font-['Outfit'] text-xs sm:text-sm md:text-base font-black tracking-wider text-[var(--primary-gold)] uppercase leading-none truncate">
                YEREVAN PULSE
              </h1>
            </div>
          </div>
        </div>

        {/* Navigation Links - Shown only on XL+ screens (1280px+) without overlapping */}
        <nav className="app-primary-nav hidden xl:flex items-center gap-1.5 2xl:gap-2 shrink-0">
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
              className={`font-['Archivo_Narrow'] text-xs sm:text-sm font-extrabold uppercase tracking-tight flex items-center gap-1.5 h-9 sm:h-10 px-2.5 2xl:px-3.5 rounded-sm border transition-all shrink-0 ${
                activeTab === tab.id 
                  ? 'bg-[var(--primary-gold)] text-[var(--bg-deep)] border-[var(--primary-gold)] shadow-[2px_2px_0px_0px_var(--primary-gold-glow)]' 
                  : 'text-gray-300 border-transparent hover:border-[var(--primary-gold)] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-base sm:text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Header Actions Toolbar */}
        <div className="app-actions flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={() => {
              soundFX.playClick();
              if (onToggleLang) onToggleLang();
            }}
            className="header-language text-[var(--primary-gold)] font-['Space_Grotesk'] text-xs sm:text-sm font-bold uppercase h-9 sm:h-10 px-2 sm:px-2.5 bg-[var(--bg-main)] border border-[var(--primary-gold)]/60 hover:border-[var(--primary-gold)] transition-all flex items-center justify-center gap-1 rounded-sm shadow-[1px_1px_0px_0px_var(--primary-gold)] shrink-0 min-w-[36px]"
            title="Փոխել լեզուն / Switch Language"
          >
            <span className="material-symbols-outlined text-base sm:text-lg">language</span>
            <span className="hidden xl:inline">{currentLang === 'hy' ? 'ARM 🇦🇲' : 'ENG 🇬🇧'}</span>
          </button>

          {/* Color Themes Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              if (onOpenTheme) onOpenTheme();
            }}
            className="bg-[var(--bg-main)] border border-gray-700 hover:border-[var(--primary-gold)] text-gray-300 hover:text-[var(--primary-gold)] h-9 sm:h-10 px-2 sm:px-2.5 text-xs sm:text-sm font-['Space_Grotesk'] font-bold uppercase transition-all flex items-center justify-center gap-1 rounded-sm shadow-[1px_1px_0px_0px_rgba(255,255,255,0.1)] shrink-0 min-w-[36px]"
            title="Գունային Թեմաներ / Color Themes"
          >
            <span className="material-symbols-outlined text-base sm:text-lg text-[var(--primary-gold)]">palette</span>
            <span className="hidden xl:inline">{currentLang === 'hy' ? '🎨 ԹԵՄԱՆԵՐ' : '🎨 THEMES'}</span>
          </button>

          {/* Civic Rewards Store Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              if (onOpenRewards) onOpenRewards();
            }}
            className="bg-[var(--primary-gold)]/10 border border-[var(--primary-gold)] text-[var(--primary-gold)] hover:bg-[var(--primary-gold)] hover:text-[var(--bg-deep)] h-9 sm:h-10 px-2 sm:px-3 text-xs sm:text-sm font-['Archivo_Narrow'] font-black uppercase transition-all flex items-center justify-center gap-1 rounded-sm shadow-[2px_2px_0px_0px_var(--primary-gold)] animate-pulse shrink-0 min-w-[36px]"
            title="Civic Rewards Store"
          >
            <span className="material-symbols-outlined text-base sm:text-lg">card_giftcard</span>
            <span className="hidden xl:inline">{currentLang === 'hy' ? '🎁 ԽԱՆՈՒԹ' : '🎁 REWARDS'}</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            className="text-gray-300 hover:text-[var(--primary-gold)] w-9 h-9 sm:w-10 sm:h-10 bg-[var(--bg-main)] border border-gray-700 hover:border-[var(--primary-gold)] flex items-center justify-center transition-all rounded-sm shadow-[1px_1px_0px_0px_rgba(255,255,255,0.1)] shrink-0"
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
            title={t.hero.reportExhibit}
            aria-label={t.hero.reportExhibit}
            className="header-add-exhibit hidden 2xl:flex border border-[var(--primary-gold)] text-[var(--primary-gold)] hover:bg-[var(--primary-gold)] hover:text-[var(--bg-deep)] h-9 sm:h-10 px-3 text-xs sm:text-sm font-['Archivo_Narrow'] font-bold uppercase transition-all items-center justify-center gap-1 rounded-sm shadow-[2px_2px_0px_0px_var(--primary-gold)] shrink-0"
          >
            <span className="material-symbols-outlined text-base sm:text-lg">add_location</span>
            <span>{currentLang === "hy" ? "+ ԱՎԵԼԱՑՆԵԼ" : "+ ADD"}</span>
          </button>

          {/* Auth / Account Register Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              onOpenAuth();
            }}
            title={isGuest ? (currentLang === "hy" ? "Մուտք" : "Login") : currentUser.name}
            aria-label={isGuest ? (currentLang === "hy" ? "Մուտք" : "Login") : currentUser.name}
            className="bg-[var(--bg-main)] border border-[var(--primary-gold)] text-[var(--primary-gold)] hover:bg-[var(--primary-gold)] hover:text-[var(--bg-deep)] h-9 sm:h-10 px-2 sm:px-3 text-xs sm:text-sm font-['Archivo_Narrow'] font-bold uppercase transition-all flex items-center justify-center gap-1 rounded-sm shadow-[2px_2px_0px_0px_var(--primary-gold)] shrink-0 min-w-[36px]"
          >
            <span className="material-symbols-outlined text-base sm:text-lg">
              {isGuest ? 'account_circle' : 'person'}
            </span>
            <span className="hidden xl:inline truncate max-w-[100px]">
              {isGuest ? (currentLang === 'hy' ? 'ՄՈՒՏՔ' : 'LOGIN') : currentUser.name}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
