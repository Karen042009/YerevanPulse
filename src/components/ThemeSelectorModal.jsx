import React from 'react';
import { soundFX } from '../utils/audioFX';
import { themes } from '../utils/themes';

export default function ThemeSelectorModal({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
  currentLang = 'hy'
}) {
  const isArmenian = currentLang === 'hy';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0b0e14] border-2 border-[var(--primary-gold)] p-5 sm:p-6 max-w-lg w-full relative shadow-[0_0_50px_var(--primary-gold-glow)] rounded-xl space-y-4">
        {/* Close Button */}
        <button
          onClick={() => {
            soundFX.playClick();
            onClose();
          }}
          className="absolute top-3 right-3 text-gray-400 hover:text-[var(--primary-gold)] p-1 text-xl font-bold transition-colors"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[var(--primary-gold)]/10 border border-[var(--primary-gold)]/40 rounded text-[10px] font-mono text-[var(--primary-gold)] uppercase">
            <span className="material-symbols-outlined text-xs">palette</span>
            <span>CUSTOMIZABLE THEME PALETTES</span>
          </div>
          <h2 className="font-['Outfit'] text-2xl font-black text-white uppercase tracking-tight">
            🎨 {isArmenian ? 'ԸՆՏՐԵԼ ԳՈՒՆԱՅԻՆ ԹԵՄԱՆ' : 'SELECT COLOR THEME'}
          </h2>
          <p className="font-['Montserrat'] text-xs text-gray-300">
            {isArmenian
              ? 'Ընտրեք Yerevan Pulse-ի ինտերֆեյսի ցանկալի գունային ոճը:'
              : 'Choose your preferred cyberpunk aesthetic color palette.'}
          </p>
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          {themes.map((theme) => {
            const isSelected = currentTheme === theme.id;
            const name = isArmenian ? theme.nameHy : theme.nameEn;

            return (
              <div
                key={theme.id}
                onClick={() => {
                  soundFX.playScanChirp();
                  onSelectTheme(theme.id);
                }}
                style={{ backgroundColor: theme.previewBg }}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all space-y-3 relative group ${
                  isSelected
                    ? 'border-[var(--primary-gold)] shadow-[0_0_20px_rgba(255,199,0,0.3)] scale-[1.02]'
                    : 'border-white/10 hover:border-white/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-['Outfit'] text-sm font-bold text-white uppercase truncate">
                    {name}
                  </h4>
                  {isSelected && (
                    <span className="text-[10px] font-mono font-bold text-black bg-[#ffc700] px-2 py-0.5 rounded uppercase">
                      ✓ ACTIVE
                    </span>
                  )}
                </div>

                {/* Color Swatch Circles */}
                <div className="flex items-center gap-2 pt-1">
                  <div
                    className="w-6 h-6 rounded-full border border-white/20 shadow-md"
                    style={{ backgroundColor: theme.primaryColor }}
                    title="Primary"
                  />
                  <div
                    className="w-6 h-6 rounded-full border border-white/20 shadow-md"
                    style={{ backgroundColor: theme.secondaryColor }}
                    title="Secondary"
                  />
                  <div
                    className="w-6 h-6 rounded-full border border-white/20 shadow-md"
                    style={{ backgroundColor: theme.accentColor }}
                    title="Accent"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Apply & Close */}
        <button
          onClick={() => {
            soundFX.playClick();
            onClose();
          }}
          className="btn-primary-glow w-full py-3 text-xs font-black uppercase rounded mt-2"
        >
          ✓ {isArmenian ? 'ՊԱՀՊԱՆԵԼ ԹԵՄԱՆ' : 'APPLY THEME'}
        </button>
      </div>
    </div>
  );
}
