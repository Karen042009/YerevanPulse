import React from 'react';
import { soundFX } from '../utils/audioFX';
import { translations } from '../data/translations';

export default function BottomNav({ activeTab, onChangeTab, currentLang = 'hy' }) {
  const t = translations[currentLang] || translations.hy;

  const tabs = [
    { id: 'home', label: t.nav.home || (currentLang === 'hy' ? 'ԳԼԽԱՎՈՐ' : 'HOME'), icon: 'home' },
    { id: 'exhibits', label: t.nav.exhibits || (currentLang === 'hy' ? 'ՑՈՒՑԱՆՄՈՒՇՆԵՐ' : 'EXHIBITS'), icon: 'museum' },
    { id: 'map', label: t.nav.map || (currentLang === 'hy' ? 'ՔԱՐՏԵԶ' : 'MAP'), icon: 'map' },
    { id: 'ranks', label: t.nav.ranks || (currentLang === 'hy' ? 'ՎԱՐԿԱՆԻՇՆԵՐ' : 'RANKS'), icon: 'leaderboard' },
    { id: 'profile', label: t.nav.profile || (currentLang === 'hy' ? 'ՊՐՈՖԻԼ' : 'PROFILE'), icon: 'person' },
  ];

  return (
    <nav className="app-bottom-nav fixed bottom-0 left-0 right-0 w-full flex justify-around items-center px-1.5 sm:px-4 py-2 bg-[var(--surface-1)]/95 backdrop-blur-lg z-50 border-t-2 border-[var(--primary-gold)] shadow-[0_-4px_25px_rgba(0,0,0,0.85)] transition-colors">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => {
              soundFX.playClick();
              onChangeTab(tab.id);
            }}
            className={`flex flex-col items-center justify-center min-h-[48px] px-2 py-1 transition-all rounded-lg relative ${
              isActive
                ? 'bg-[var(--primary-gold)] text-[var(--bg-deep)] shadow-[0_0_15px_var(--primary-gold-glow)] font-black translate-y-[-2px] flex-1 max-w-[100px]'
                : 'text-gray-400 hover:text-white flex-1 max-w-[90px]'
            }`}
          >
            <span 
              className={`material-symbols-outlined text-xl sm:text-2xl transition-transform ${
                isActive ? 'scale-110' : ''
              }`} 
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {tab.icon}
            </span>
            <span className="font-['Archivo_Narrow'] text-[9px] sm:text-[10px] tracking-tight uppercase font-bold truncate max-w-full leading-tight mt-0.5">
              {tab.label}
            </span>
            {isActive && (
              <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[#ffffff] shadow-[0_0_8px_#ffffff]" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
