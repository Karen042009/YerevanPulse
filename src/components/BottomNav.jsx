import React from 'react';
import { soundFX } from '../utils/audioFX';

export default function BottomNav({ activeTab, onChangeTab }) {
  const tabs = [
    { id: 'home', label: 'HOME', icon: 'home' },
    { id: 'exhibits', label: 'EXHIBITS', icon: 'museum' },
    { id: 'map', label: 'MAP', icon: 'map' },
    { id: 'ranks', label: 'RANKS', icon: 'leaderboard' },
    { id: 'profile', label: 'PROFILE', icon: 'person' },
  ];

  return (
    <nav className="app-bottom-nav fixed bottom-0 left-0 right-0 w-full flex justify-around items-center px-4 py-2 bg-[var(--surface-1)] z-50 border-t-2 border-[var(--primary-gold)] shadow-[0_-4px_20px_rgba(0,0,0,0.8)] transition-colors">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => {
              soundFX.playClick();
              onChangeTab(tab.id);
            }}
            className={`flex flex-col items-center justify-center transition-all ${
              isActive
                ? 'bg-[var(--primary-gold)] text-[var(--bg-deep)] rounded-lg px-4 py-1 translate-y-[-2px] shadow-[0_0_12px_var(--primary-gold-glow)] font-bold'
                : 'text-gray-300 hover:text-white px-3 py-1'
            }`}
          >
            <span 
              className="material-symbols-outlined text-xl mb-0.5" 
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {tab.icon}
            </span>
            <span className="font-['Archivo_Narrow'] text-[10px] tracking-wider uppercase font-bold">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
