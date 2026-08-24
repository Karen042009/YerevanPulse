import React, { useState } from 'react';
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
  const [filterCategory, setFilterCategory] = useState('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', labelHy: 'ԲՈԼՈՐ ԹԵՄԱՆԵՐԸ', labelEn: 'ALL THEMES' },
    { id: 'cyber', labelHy: '⚡ ԿԻԲԵՌ & ՆԵՈՆ', labelEn: '⚡ CYBER & NEON' },
    { id: 'heritage', labelHy: '🏛️ ՀԱՅԿԱԿԱՆ ՈՃ', labelEn: '🏛️ ARMENIAN HERITAGE' },
  ];

  const filteredThemes = themes.filter((t) => {
    if (filterCategory === 'cyber') return ['cyber-gold', 'matrix-green', 'synth-purple'].includes(t.id);
    if (filterCategory === 'heritage') return ['tufa-red', 'sevan-blue', 'cascade-amber'].includes(t.id);
    return true;
  });

  const getThemeTag = (id) => {
    switch (id) {
      case 'cyber-gold': return isArmenian ? 'Դասական Կիբեռ' : 'Classic Neon';
      case 'tufa-red': return isArmenian ? 'Երևանի Տուֆ' : 'Yerevan Terracotta';
      case 'matrix-green': return isArmenian ? 'Արարատ Մատրիցա' : 'Bio Green';
      case 'synth-purple': return isArmenian ? 'Արևային Մանուշակ' : 'Synthwave';
      case 'sevan-blue': return isArmenian ? 'Սևանա Կապույտ' : 'Sevan Deep Blue';
      case 'cascade-amber': return isArmenian ? 'Կասկադ Ամբեր' : 'Cascade Sunset';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-2.5 sm:p-5 bg-black/85 backdrop-blur-lg animate-fadeIn">
      <div className="bg-[#0b0e14] border-2 border-[var(--primary-gold)] p-3.5 sm:p-6 max-w-2xl w-full relative shadow-[0_0_60px_var(--primary-gold-glow)] rounded-2xl space-y-3.5 max-h-[92dvh] overflow-y-auto custom-scrollbar">
        {/* Close Button */}
        <button
          onClick={() => {
            soundFX.playClick();
            onClose();
          }}
          className="absolute top-3.5 right-3.5 text-gray-400 hover:text-[var(--primary-gold)] p-1 text-xl font-bold transition-all rounded-full hover:bg-white/10"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="space-y-1 pr-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[var(--primary-gold)]/10 border border-[var(--primary-gold)]/50 rounded-full text-[9px] sm:text-xs font-mono text-[var(--primary-gold)] uppercase tracking-wider">
            <span className="material-symbols-outlined text-xs sm:text-sm">palette</span>
            <span>CUSTOMIZABLE THEME SYSTEM</span>
          </div>
          <h2 className="font-['Outfit'] text-xl sm:text-3xl font-black text-white uppercase tracking-tight">
            🎨 {isArmenian ? 'ԸՆՏՐԵԼ ԳՈՒՆԱՅԻՆ ԹԵՄԱՆ' : 'SELECT COLOR THEME'}
          </h2>
          <p className="font-['Montserrat'] text-[11px] sm:text-xs text-gray-300">
            {isArmenian
              ? 'Փոխեք Yerevan Pulse-ի ողջ ինտերֆեյսի գույները, կոճակները և լուսարձակման ոճերը:'
              : 'Customize Yerevan Pulse interface colors, buttons, glows and card aesthetics.'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-white/10 pt-1 flex-nowrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundFX.playClick();
                setFilterCategory(cat.id);
              }}
              className={`px-3 py-1.5 text-[10px] sm:text-[11px] font-['Space_Grotesk'] font-bold uppercase rounded-lg border transition-all whitespace-nowrap shrink-0 ${
                filterCategory === cat.id
                  ? 'bg-[var(--primary-gold)] text-black border-[var(--primary-gold)] shadow-[0_0_12px_var(--primary-gold-glow)]'
                  : 'bg-[#121620] text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {isArmenian ? cat.labelHy : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {filteredThemes.map((theme) => {
            const isSelected = currentTheme === theme.id;
            const name = isArmenian ? theme.nameHy : theme.nameEn;
            const tag = getThemeTag(theme.id);

            return (
              <div
                key={theme.id}
                onClick={() => {
                  soundFX.playScanChirp();
                  onSelectTheme(theme.id);
                }}
                style={{
                  backgroundColor: theme.previewBg,
                  borderColor: isSelected ? theme.primaryColor : 'rgba(255, 255, 255, 0.12)',
                  boxShadow: isSelected ? `0 0 25px ${theme.primaryColor}65` : 'none'
                }}
                className={`p-3 border-2 rounded-xl cursor-pointer transition-all space-y-2.5 relative group hover:scale-[1.02] flex flex-col justify-between ${
                  isSelected ? 'ring-2 ring-white/20' : 'hover:border-white/40'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <h4 className="font-['Outfit'] text-xs sm:text-sm font-black text-white uppercase tracking-tight leading-snug">
                      {name}
                    </h4>
                    {isSelected && (
                      <span 
                        className="text-[9px] font-mono font-black text-black px-1.5 py-0.5 rounded uppercase shrink-0 shadow-sm"
                        style={{ backgroundColor: theme.primaryColor }}
                      >
                        ✓ ACTIVE
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-gray-300 block">
                    {tag}
                  </span>
                </div>

                {/* Live Mini Component Preview Card */}
                <div className="bg-black/60 p-2 rounded-lg border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-[8px] sm:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase border"
                      style={{ 
                        color: theme.primaryColor, 
                        borderColor: `${theme.primaryColor}80`,
                        backgroundColor: `${theme.primaryColor}15`
                      }}
                    >
                      MINI PREVIEW
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: theme.primaryColor }} />
                      <div className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: theme.secondaryColor }} />
                      <div className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: theme.accentColor }} />
                    </div>
                  </div>

                  {/* Sample Live Button */}
                  <div 
                    className="py-1.5 px-2 rounded text-[10px] font-['Archivo_Narrow'] font-black uppercase text-center text-black font-bold shadow-md transition-transform group-hover:scale-[1.02]"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
                      boxShadow: `0 0 10px ${theme.primaryColor}40`
                    }}
                  >
                    ⚡ {isArmenian ? 'ԿՈՃԱԿԻ ՈՃ' : 'BUTTON STYLE'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Apply & Close Action */}
        <button
          onClick={() => {
            soundFX.playClick();
            onClose();
          }}
          className="btn-primary-glow w-full py-3 text-xs sm:text-sm font-black uppercase rounded-xl mt-2 tracking-wider flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>{isArmenian ? 'ՊԱՀՊԱՆԵԼ ԵՎ ԿԻՐԱՌԵԼ ԹԵՄԱՆ' : 'APPLY SELECTED THEME'}</span>
        </button>
      </div>
    </div>
  );
}
