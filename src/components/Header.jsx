import React from 'react';
import { soundFX } from '../utils/audioFX';

export default function Header({ 
  activeTab, 
  onChangeTab, 
  onOpenScanner, 
  onOpenReport,
  onOpenAuth, 
  currentUser 
}) {
  const [isMuted, setIsMuted] = React.useState(() => soundFX.isMuted);

  const toggleSound = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
    if (!muted) soundFX.playClick();
  };
  return (
    <header className="sticky top-0 w-full z-50 bg-[#121414] border-b-2 border-[#4d4732] px-4 md:px-8 h-16 flex justify-between items-center">
      {/* Brand & Logo matching Stitch design */}
      <div 
        onClick={() => {
          soundFX.playClick();
          onChangeTab('home');
        }}
        className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <button 
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            soundFX.playScanChirp();
            onOpenScanner();
          }}
          className="text-[#ffd700] hover:opacity-80 transition-opacity flex items-center justify-center p-1.5 bg-[#1a1c1c] border border-[#ffd700]"
          title="Scan QR Code"
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
            <h1 className="font-['Archivo_Narrow'] text-lg md:text-xl font-extrabold tracking-tighter text-[#ffd700] uppercase leading-none">
              YEREVAN PULSE
            </h1>
            <span className="hidden sm:block font-['Montserrat'] text-[8px] md:text-[9px] text-[#d0c6ab] uppercase tracking-widest font-mono">
              ԵՐԵՎԱՆԸ ՑՈՒՑԱՍՐԱՀ ՉԷ
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-4">
        <button
          onClick={() => { soundFX.playClick(); onChangeTab('home'); }}
          className={`font-['Archivo_Narrow'] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 py-1.5 px-3 border transition-all ${
            activeTab === 'home' 
              ? 'bg-[#ffd700] text-[#1a1a1a] border-[#ffd700]' 
              : 'text-[#d0c6ab] border-transparent hover:border-[#ffd700]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">home</span>
          <span>HOME</span>
        </button>

        <button
          onClick={() => { soundFX.playClick(); onChangeTab('exhibits'); }}
          className={`font-['Archivo_Narrow'] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 py-1.5 px-3 border transition-all ${
            activeTab === 'exhibits' 
              ? 'bg-[#ffd700] text-[#1a1a1a] border-[#ffd700]' 
              : 'text-[#d0c6ab] border-transparent hover:border-[#ffd700]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">museum</span>
          <span>EXHIBITS</span>
        </button>

        <button
          onClick={() => { soundFX.playClick(); onChangeTab('map'); }}
          className={`font-['Archivo_Narrow'] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 py-1.5 px-3 border transition-all ${
            activeTab === 'map' 
              ? 'bg-[#ffd700] text-[#1a1a1a] border-[#ffd700]' 
              : 'text-[#d0c6ab] border-transparent hover:border-[#ffd700]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">map</span>
          <span>MAP</span>
        </button>

        <button
          onClick={() => { soundFX.playClick(); onChangeTab('ranks'); }}
          className={`font-['Archivo_Narrow'] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 py-1.5 px-3 border transition-all ${
            activeTab === 'ranks' 
              ? 'bg-[#ffd700] text-[#1a1a1a] border-[#ffd700]' 
              : 'text-[#d0c6ab] border-transparent hover:border-[#ffd700]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">leaderboard</span>
          <span>RANKS</span>
        </button>

        <button
          onClick={() => { soundFX.playClick(); onChangeTab('profile'); }}
          className={`font-['Archivo_Narrow'] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 py-1.5 px-3 border transition-all ${
            activeTab === 'profile' 
              ? 'bg-[#ffd700] text-[#1a1a1a] border-[#ffd700]' 
              : 'text-[#d0c6ab] border-transparent hover:border-[#ffd700]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">person</span>
          <span>PROFILE</span>
        </button>
      </nav>

      {/* Header Actions (Scanner, Sound Toggle, Add Exhibit & User Avatar) */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Sound FX Toggle Button */}
        <button
          onClick={toggleSound}
          className="text-[#d0c6ab] hover:text-[#ffd700] p-1.5 bg-[#1a1c1c] border border-[#4d4732] flex items-center justify-center transition-all"
          title={isMuted ? 'Միացնել Ձայնային Էֆեկտները' : 'Անջատել Ձայնային Էֆեկտները'}
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
          title="Ավելացնել նոր ցուցանմուշ"
        >
          <span className="material-symbols-outlined text-base">add_location_alt</span>
          <span>+ ՑՈՒՑԱՆՄՈՒՇ</span>
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
          <span>ՍԿԱՆԱՎՈՐԵԼ QR</span>
        </button>

        {currentUser ? (
          <button
            onClick={() => {
              soundFX.playClick();
              onChangeTab('profile');
            }}
            className="hover:opacity-80 transition-opacity cursor-pointer rounded-full overflow-hidden w-9 h-9 border-2 border-[#ffd700] shadow-[0_0_8px_rgba(255,215,0,0.4)] flex-shrink-0"
            title={currentUser.name}
          >
            <img 
              src={currentUser.avatar} 
              alt="User profile avatar" 
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
            ՄՈՒՏՔ
          </button>
        )}
      </div>
    </header>
  );
}
