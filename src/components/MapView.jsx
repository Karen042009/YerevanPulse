import React, { useState } from 'react';
import { soundFX } from '../utils/audioFX';
import { translations } from '../data/translations';

export default function MapView({ exhibits, districts, onSelectExhibit, onCleanExhibit, currentLang = 'hy' }) {
  const [activeDistrict, setActiveDistrict] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL | ACTIVE | CLEANED
  const [selectedPin, setSelectedPin] = useState(null);

  const t = translations[currentLang] || translations.hy;

  const filteredExhibits = exhibits.filter(ex => {
    if (activeDistrict !== 'ALL' && ex.district !== activeDistrict) return false;
    if (statusFilter === 'ACTIVE' && ex.cleaned) return false;
    if (statusFilter === 'CLEANED' && !ex.cleaned) return false;
    return true;
  });

  const selectedDistrictData = districts.find(d => d.name === activeDistrict);

  return (
    <div className="space-y-6 px-2 md:px-0 py-4">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffd700] text-3xl">map</span>
            <h2 className="font-['Archivo_Narrow'] text-2xl md:text-3xl font-black uppercase text-[#e2e2e2] tracking-tight">
              {t.map.title}
            </h2>
          </div>
          <span className="bg-rose-500/20 text-rose-400 text-[10px] font-mono px-2.5 py-1 border border-rose-500/40 uppercase font-bold animate-pulse">
            {t.map.liveMonitoring}
          </span>
        </div>
        <p className="text-xs font-['Montserrat'] text-[#d0c6ab] italic border-l-2 border-[#ffd700] pl-3">
          {currentLang === 'hy' 
            ? 'Ռեալ-ժամանակում ֆիքսված «ցուցանմուշների» տեղակայումը Երևանի 12 թաղամասերում։'
            : 'Real-time mapping of documented exhibits across all 12 districts of Yerevan.'}
        </p>
      </div>

      {/* Control Filters Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 bg-[#1e2020] p-3 border border-[#4d4732]">
        {/* District Selector Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar flex-1">
          <button
            onClick={() => { soundFX.playClick(); setActiveDistrict('ALL'); }}
            className={`px-3 py-1.5 font-['Archivo_Narrow'] text-xs font-bold uppercase transition-all border whitespace-nowrap ${
              activeDistrict === 'ALL' ? 'bg-[#ffd700] text-[#1a1a1a] border-[#ffd700]' : 'bg-[#121414] text-[#e2e2e2] border-[#4d4732]'
            }`}
          >
            {t.map.allYerevan}
          </button>
          {districts.map(d => (
            <button
              key={d.id}
              onClick={() => { soundFX.playClick(); setActiveDistrict(d.name); }}
              className={`px-3 py-1.5 font-['Archivo_Narrow'] text-xs font-bold uppercase transition-all border whitespace-nowrap ${
                activeDistrict === d.name ? 'bg-[#ffd700] text-[#1a1a1a] border-[#ffd700]' : 'bg-[#121414] text-[#e2e2e2] border-[#4d4732]'
              }`}
            >
              {currentLang === 'en' ? d.nameEn : d.name} ({d.hotspots})
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 border-t sm:border-t-0 sm:border-l border-[#4d4732] pt-2 sm:pt-0 sm:pl-3">
          {[
            { id: 'ALL', label: t.exhibits.filterAll },
            { id: 'ACTIVE', label: '⚡ HOTSPOTS' },
            { id: 'CLEANED', label: '✓ CLEANED' }
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => { soundFX.playClick(); setStatusFilter(st.id); }}
              className={`px-2.5 py-1.5 font-['Archivo_Narrow'] text-[11px] font-bold uppercase transition-all border whitespace-nowrap ${
                statusFilter === st.id ? 'bg-[#ffd700] text-[#1a1a1a] border-[#ffd700]' : 'bg-[#121414] text-[#d0c6ab] border-[#4d4732]'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Vector Map Container */}
      <div className="relative w-full h-80 sm:h-96 bg-[#0e1111] border-2 border-[#ffd700] overflow-hidden p-4 shadow-2xl">
        {/* Vector Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ 
            backgroundImage: 'radial-gradient(#ffd700 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
          }}
        />

        {/* Yerevan City Map SVG Canvas */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Hrazdan River Flow Line */}
          <path d="M 25,0 Q 35,40 28,60 T 22,100" fill="none" stroke="#00b4d8" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.6" />
          <text x="14" y="32" fontSize="3" fill="#00b4d8" className="font-mono" opacity="0.8">
            {currentLang === 'en' ? 'Hrazdan River' : 'Հրազդան Գետ'}
          </text>

          {/* Yerevan City Outer Boundary */}
          <path d="M 30,10 L 70,12 L 88,38 L 78,82 L 40,88 L 14,60 Z" fill="#181c1b" stroke="#4d4732" strokeWidth="0.8" />

          {/* District Zones */}
          <polygon points="45,28 65,30 68,52 48,56" fill="#ffd700" fillOpacity="0.12" stroke="#ffd700" strokeWidth="0.5" strokeDasharray="1,1" />
          <text x="56" y="44" fontSize="3.5" textAnchor="middle" fill="#ffd700" fontWeight="bold" opacity="0.7" className="font-mono">
            KENTRON
          </text>

          <polygon points="38,14 65,15 62,28 45,28" fill="#ffffff" fillOpacity="0.05" stroke="#605b4c" strokeWidth="0.4" />
          <text x="52" y="22" fontSize="3" textAnchor="middle" fill="#e2e2e2" opacity="0.5" className="font-mono">
            ARABKIR
          </text>

          <polygon points="20,25 38,22 45,35 28,48" fill="#ffffff" fillOpacity="0.05" stroke="#605b4c" strokeWidth="0.4" />
          <text x="32" y="36" fontSize="3" textAnchor="middle" fill="#e2e2e2" opacity="0.5" className="font-mono">
            AJAPNYAK
          </text>

          <polygon points="36,58 68,54 62,82 36,80" fill="#ffffff" fillOpacity="0.05" stroke="#605b4c" strokeWidth="0.4" />
          <text x="50" y="70" fontSize="3" textAnchor="middle" fill="#e2e2e2" opacity="0.5" className="font-mono">
            SHENGAVIT
          </text>

          {/* Interactive Exhibit Markers */}
          {filteredExhibits.map(ex => {
            const isSelected = selectedPin?.id === ex.id;

            return (
              <g 
                key={ex.id} 
                transform={`translate(${ex.coordinates?.x || 50}, ${ex.coordinates?.y || 50})`}
                className="cursor-pointer group"
                onClick={() => {
                  soundFX.playClick();
                  setSelectedPin(ex);
                }}
              >
                {/* Pulse Ring */}
                {!ex.cleaned && (
                  <circle r="4.5" fill="#ffd700" fillOpacity="0.35" className="animate-ping" />
                )}

                {/* Marker Pin Outer Circle */}
                <circle 
                  r={isSelected ? "3.8" : "2.8"} 
                  fill={ex.cleaned ? "#78dc77" : ex.severity === 'critical' ? "#ec4899" : "#ffd700"} 
                  stroke="#121414" 
                  strokeWidth="0.8" 
                />

                <text y="-4" fontSize="3.5" textAnchor="middle" fill="#ffffff" fontWeight="bold" className="font-mono select-none drop-shadow-md">
                  #{ex.code}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Map Legend Overlay */}
        <div className="absolute bottom-3 left-3 bg-[#121414]/90 p-2.5 border border-[#4d4732] text-[10px] space-y-1 backdrop-blur-sm shadow-md">
          <div className="flex items-center gap-1.5 text-[#ffd700]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffd700] inline-block animate-pulse"></span>
            <span className="font-bold">{t.map.legendActive}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#78dc77]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#78dc77] inline-block"></span>
            <span className="font-bold">{t.map.legendCleaned}</span>
          </div>
          <div className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
            <span className="font-bold">Critical Hotspot</span>
          </div>
        </div>
      </div>

      {/* District Info Banner (if district selected) */}
      {selectedDistrictData && (
        <div className="bg-[#1e2020] p-4 border border-[#ffd700] flex flex-col sm:flex-row justify-between items-center gap-3">
          <div>
            <h3 className="font-['Archivo_Narrow'] text-lg font-black text-[#ffd700] uppercase">
              {currentLang === 'en' ? selectedDistrictData.nameEn : selectedDistrictData.name} {selectedDistrictData.badge}
            </h3>
            <p className="text-xs text-[#d0c6ab] font-mono">
              ՄԱՔՐՎԱԾ ՑՈՒՑԱՆՄՈՒՇՆԵՐ․ {selectedDistrictData.cleanedExhibits} | HOTSPOTS: {selectedDistrictData.hotspots}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="text-right flex-1 sm:flex-initial">
              <span className="text-xs text-[#999077] block font-mono">CLEANLINESS RATE</span>
              <span className="font-['Archivo_Narrow'] text-xl font-bold text-[#78dc77]">{selectedDistrictData.cleanliness || 75}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Selected Marker Detail Card */}
      {selectedPin && (
        <div className="museum-label-active p-5 border-2 border-[#ffd700] animate-fadeIn flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#ffd700] bg-black px-2 py-0.5 border border-[#ffd700]">
                #{selectedPin.code}
              </span>
              <span className="text-xs font-mono text-[#d0c6ab] uppercase">
                {selectedPin.category}
              </span>
              <span className={`text-[10px] px-2 py-0.5 font-bold uppercase ${selectedPin.cleaned ? 'bg-[#78dc77] text-black' : 'bg-rose-500 text-white'}`}>
                {selectedPin.cleaned ? t.exhibits.cleanedStatus : 'ACTIVE'}
              </span>
            </div>
            <h3 className="font-['Archivo_Narrow'] text-xl font-bold text-white uppercase">
              {selectedPin.icon} {currentLang === 'en' && selectedPin.titleEn ? selectedPin.titleEn : selectedPin.title}
            </h3>
            <p className="text-xs text-[#d0c6ab]">
              📍 {currentLang === 'en' && selectedPin.locationEn ? selectedPin.locationEn : selectedPin.location} 
              ({currentLang === 'en' && selectedPin.districtEn ? selectedPin.districtEn : selectedPin.district})
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {!selectedPin.cleaned && onCleanExhibit && (
              <button
                onClick={() => {
                  soundFX.playSuccess();
                  onCleanExhibit(selectedPin.id);
                  setSelectedPin(prev => ({ ...prev, cleaned: true }));
                }}
                className="bg-[#78dc77] text-black px-4 py-2 text-xs font-['Archivo_Narrow'] font-black uppercase hover:bg-emerald-400 border border-white"
              >
                ✓ ՄԱՔՐԵԼ (+{selectedPin.points} PTS)
              </button>
            )}

            <button
              onClick={() => {
                soundFX.playClick();
                onSelectExhibit(selectedPin);
              }}
              className="bg-[#ffd700] text-[#1a1a1a] px-4 py-2 text-xs font-['Archivo_Narrow'] font-bold uppercase hover:bg-[#e9c400] border border-white"
            >
              {t.map.viewExhibit}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
