import React, { useState } from 'react';
import { soundFX } from '../utils/audioFX';

export default function MapView({ exhibits, districts, onSelectExhibit }) {
  const [activeDistrict, setActiveDistrict] = useState('ALL');
  const [selectedPin, setSelectedPin] = useState(null);

  const filteredExhibits = exhibits.filter(ex => {
    if (activeDistrict === 'ALL') return true;
    return ex.district === activeDistrict;
  });

  return (
    <div className="space-y-6 px-4 py-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffd700] text-2xl">map</span>
            <h2 className="font-['Archivo_Narrow'] text-2xl font-black uppercase text-[#e2e2e2] tracking-tight">
              ԵՐԵՎԱՆԻ ԱՂՏՈՏՎԱԾՈՒԹՅԱՆ ՔԱՐՏԵԶ
            </h2>
          </div>
          <span className="bg-rose-500/20 text-rose-400 text-[10px] font-mono px-2 py-0.5 border border-rose-500/40 uppercase font-bold animate-pulse">
            LIVE MONITORING
          </span>
        </div>
        <p className="text-xs font-['Montserrat'] text-[#d0c6ab] italic border-l-2 border-[#ffd700] pl-3">
          Ռեալ-ժամանակում ֆիքսված «ցուցանմուշների» տեղակայումը Երևանի 12 թաղամասերում։
        </p>
      </div>

      {/* District Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-[#4d4732]">
        <button
          onClick={() => { soundFX.playClick(); setActiveDistrict('ALL'); }}
          className={`px-3 py-1.5 font-['Archivo_Narrow'] text-xs font-bold uppercase transition-all border whitespace-nowrap ${
            activeDistrict === 'ALL' ? 'bg-[#ffd700] text-[#1a1a1a] border-[#ffd700]' : 'bg-[#1e2020] text-[#e2e2e2] border-[#4d4732]'
          }`}
        >
          ԱՄԲՈՂՋ ԵՐԵՎԱՆԸ
        </button>
        {districts.map(d => (
          <button
            key={d.id}
            onClick={() => { soundFX.playClick(); setActiveDistrict(d.name); }}
            className={`px-3 py-1.5 font-['Archivo_Narrow'] text-xs font-bold uppercase transition-all border whitespace-nowrap ${
              activeDistrict === d.name ? 'bg-[#ffd700] text-[#1a1a1a] border-[#ffd700]' : 'bg-[#1e2020] text-[#e2e2e2] border-[#4d4732]'
            }`}
          >
            {d.name} ({d.hotspots})
          </button>
        ))}
      </div>

      {/* Interactive Canvas Container */}
      <div className="relative w-full h-80 sm:h-96 bg-[#1A1A1A] border-2 border-[#ffd700] overflow-hidden p-4">
        {/* Vector Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{ 
            backgroundImage: 'radial-gradient(#ffd700 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
          }}
        />

        {/* Yerevan City Map SVG Canvas */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* District Boundary Shapes */}
          <path d="M 30,10 L 70,15 L 85,45 L 65,85 L 20,80 L 10,40 Z" fill="#282a2b" stroke="#4d4732" strokeWidth="0.8" />
          <path d="M 40,30 L 60,32 L 65,55 L 45,58 Z" fill="#ffd700" fillOpacity="0.08" stroke="#ffd700" strokeWidth="0.6" strokeDasharray="1,1" />

          {/* Exhibit Markers */}
          {filteredExhibits.map(ex => (
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
              <circle r="4" fill={ex.cleaned ? "#78dc77" : "#ffd700"} fillOpacity="0.3" className="animate-ping" />
              {/* Marker Pin */}
              <circle r="2.5" fill={ex.cleaned ? "#78dc77" : "#ffd700"} stroke="#121414" strokeWidth="0.8" />
              <text y="-4" fontSize="4" textAnchor="middle" fill="#e2e2e2" className="font-mono font-bold select-none">
                #{ex.code}
              </text>
            </g>
          ))}
        </svg>

        {/* Map Legend overlay */}
        <div className="absolute bottom-3 left-3 bg-[#121414]/90 p-2 border border-[#4d4732] text-[10px] space-y-1">
          <div className="flex items-center gap-1.5 text-[#ffd700]">
            <span className="w-2 h-2 rounded-full bg-[#ffd700] inline-block"></span>
            <span>Ակտիվ Hotspot (Աղբ)</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#78dc77]">
            <span className="w-2 h-2 rounded-full bg-[#78dc77] inline-block"></span>
            <span>Մաքրված Ցուցանմուշ</span>
          </div>
        </div>
      </div>

      {/* Selected Marker Detail Card */}
      {selectedPin && (
        <div className="museum-label-active p-4 border-2 border-[#ffd700] animate-fadeIn flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-[#ffd700] bg-black px-1.5 py-0.5 border border-[#ffd700]">
              #{selectedPin.code}
            </span>
            <h3 className="font-['Archivo_Narrow'] text-base font-bold text-white uppercase mt-1">
              {selectedPin.title}
            </h3>
            <p className="text-xs text-[#d0c6ab]">📍 {selectedPin.location} ({selectedPin.district})</p>
          </div>
          <button
            onClick={() => {
              soundFX.playClick();
              onSelectExhibit(selectedPin);
            }}
            className="bg-[#ffd700] text-[#1a1a1a] px-3 py-2 text-xs font-['Archivo_Narrow'] font-bold uppercase hover:bg-[#e9c400]"
          >
            ԴԻՏԵԼ ՑՈՒՑԱՆՄՈՒՇԸ ➔
          </button>
        </div>
      )}
    </div>
  );
}
