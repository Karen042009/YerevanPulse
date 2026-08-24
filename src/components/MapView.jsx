import React, { useState } from 'react';
import { soundFX } from '../utils/audioFX';
import { translations } from '../data/translations';

export default function MapView({ exhibits, districts, onSelectExhibit, onCleanExhibit, currentLang = 'hy' }) {
  const [mapMode, setMapMode] = useState('yandex'); // 'yandex' | 'vector'
  const [activeDistrict, setActiveDistrict] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL | ACTIVE | CLEANED
  const [selectedPinId, setSelectedPinId] = useState(null);
  const selectedPin = exhibits.find((exhibit) => exhibit.id === selectedPinId);

  const t = translations[currentLang] || translations.hy;

  const filteredExhibits = exhibits.filter(ex => {
    if (activeDistrict !== 'ALL' && ex.district !== activeDistrict) return false;
    if (statusFilter === 'ACTIVE' && ex.cleaned) return false;
    if (statusFilter === 'CLEANED' && !ex.cleaned) return false;
    return true;
  });


  // Yandex Map embed center for Yerevan (lat: 40.1792, lon: 44.4991)
  const yandexMapUrl = `https://yandex.com/map-widget/v1/?ll=44.5126%2C40.1792&z=13&l=map&pt=44.515,40.186,pm2rdm1~44.507,40.178,pm2gcm2~44.530,40.190,pm2blm3~44.480,40.150,pm2dgm4`;

  return (
    <div className="app-map-view space-y-6 px-2 md:px-0 py-4 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <div className="app-map-heading flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffc700] text-3xl">map</span>
            <h2 className="font-['Outfit'] text-2xl md:text-3xl font-black uppercase text-white tracking-tight">
              {t.map.title}
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Map Mode Switcher Tabs */}
            <div className="app-map-mode flex bg-[#121620] border border-[#ffc700]/60 p-0.5 rounded">
              <button
                onClick={() => { soundFX.playClick(); setMapMode('yandex'); }}
                className={`px-3 py-1 font-['Space_Grotesk'] text-xs font-bold uppercase transition-all rounded-sm ${
                  mapMode === 'yandex' ? 'bg-[#ffc700] text-[#0b0e14]' : 'text-gray-300 hover:text-white'
                }`}
              >
                🗺️ YANDEX MAP
              </button>
              <button
                onClick={() => { soundFX.playClick(); setMapMode('vector'); }}
                className={`px-3 py-1 font-['Space_Grotesk'] text-xs font-bold uppercase transition-all rounded-sm ${
                  mapMode === 'vector' ? 'bg-[#ffc700] text-[#0b0e14]' : 'text-gray-300 hover:text-white'
                }`}
              >
                📐 VECTOR MAP
              </button>
            </div>

            <span className="hidden sm:inline-block bg-rose-500/20 text-rose-400 text-[10px] font-mono px-2.5 py-1 border border-rose-500/40 uppercase font-bold animate-pulse rounded">
              {t.map.liveMonitoring}
            </span>
          </div>
        </div>

        <p className="text-xs font-['Montserrat'] text-gray-300 italic border-l-2 border-[#ffc700] pl-3">
          {currentLang === 'hy' 
            ? 'Ռեալ-ժամանակում ֆիքսված «ցուցանմուշների» տեղակայումը Երևանի 12 թաղամասերում Yandex Քարտեզի վրա։'
            : 'Real-time mapping of documented exhibits across all 12 districts of Yerevan on Yandex Map.'}
        </p>
      </div>

      {/* Control Filters Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 bg-[#121620] p-3 border border-gray-700 rounded-lg shadow-md">
        {/* District Selector Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar flex-1">
          <button
            onClick={() => { soundFX.playClick(); setActiveDistrict('ALL'); }}
            className={`px-3 py-1.5 font-['Archivo_Narrow'] text-xs font-bold uppercase transition-all border rounded whitespace-nowrap ${
              activeDistrict === 'ALL' ? 'bg-[#ffc700] text-[#0b0e14] border-[#ffc700]' : 'bg-[#0b0e14] text-gray-200 border-gray-700'
            }`}
          >
            {t.map.allYerevan}
          </button>
          {districts.map(d => (
            <button
              key={d.id}
              onClick={() => { soundFX.playClick(); setActiveDistrict(d.name); }}
              className={`px-3 py-1.5 font-['Archivo_Narrow'] text-xs font-bold uppercase transition-all border rounded whitespace-nowrap ${
                activeDistrict === d.name ? 'bg-[#ffc700] text-[#0b0e14] border-[#ffc700]' : 'bg-[#0b0e14] text-gray-200 border-gray-700'
              }`}
            >
              {currentLang === 'en' ? d.nameEn : d.name} ({d.hotspots})
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 border-t sm:border-t-0 sm:border-l border-gray-700 pt-2 sm:pt-0 sm:pl-3">
          {[
            { id: 'ALL', label: t.exhibits.filterAll },
            { id: 'ACTIVE', label: '⚡ HOTSPOTS' },
            { id: 'CLEANED', label: '✓ CLEANED' }
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => { soundFX.playClick(); setStatusFilter(st.id); }}
              className={`px-2.5 py-1.5 font-['Archivo_Narrow'] text-[11px] font-bold uppercase transition-all border rounded whitespace-nowrap ${
                statusFilter === st.id ? 'bg-[#ffc700] text-[#0b0e14] border-[#ffc700]' : 'bg-[#0b0e14] text-gray-300 border-gray-700'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Real Yandex Maps Embed Mode */}
      {mapMode === 'yandex' ? (
        <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[580px] xl:h-[640px] bg-[#0e1111] border-2 border-[#ffc700] overflow-hidden rounded-lg shadow-2xl">
          <iframe 
            title="Yerevan Yandex Map"
            src={yandexMapUrl} 
            className="w-full h-full border-0 filter contrast-125 saturate-110"
            allowFullScreen={true}
          />

          {/* Interactive Exhibit Hotspots Floating Drawer */}
          <div className="absolute top-3 right-3 bg-[#0b0e14]/95 p-3 border border-[#ffc700] rounded-lg max-w-xs space-y-2 backdrop-blur-md shadow-2xl">
            <span className="font-['Space_Grotesk'] text-[10px] font-bold text-[#ffc700] uppercase block">
              📍 YANDEX HOTSPOT MARKERS ({filteredExhibits.length})
            </span>
            <div className="space-y-1.5 max-h-60 overflow-y-auto no-scrollbar">
              {filteredExhibits.map(ex => (
                <div
                  key={ex.id}
                  onClick={() => { soundFX.playClick(); setSelectedPinId(ex.id); }}
                  className={`p-2 border rounded text-xs cursor-pointer transition-all ${
                    selectedPin?.id === ex.id ? 'bg-[#ffc700] text-black border-white' : 'bg-[#121620] text-gray-200 border-gray-700 hover:border-[#ffc700]'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold font-mono">#{ex.code}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 uppercase font-bold rounded ${ex.cleaned ? 'bg-emerald-500 text-black' : 'bg-rose-500 text-white'}`}>
                      {ex.cleaned ? 'CLEANED' : 'HOTSPOT'}
                    </span>
                  </div>
                  <div className="truncate font-semibold mt-0.5">{ex.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Vector Yerevan Map Canvas */
        <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[580px] xl:h-[640px] bg-[#0e1111] border-2 border-[#ffc700] overflow-hidden p-4 rounded-lg shadow-2xl">
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ 
              backgroundImage: 'radial-gradient(#ffc700 1px, transparent 1px)', 
              backgroundSize: '24px 24px' 
            }}
          />

          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M 25,0 Q 35,40 28,60 T 22,100" fill="none" stroke="#00f5d4" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.7" />
            <text x="14" y="32" fontSize="3" fill="#00f5d4" className="font-mono" opacity="0.8">
              {currentLang === 'en' ? 'Hrazdan River' : 'Հրազդան Գետ'}
            </text>

            <path d="M 30,10 L 70,12 L 88,38 L 78,82 L 40,88 L 14,60 Z" fill="#181c1b" stroke="#374151" strokeWidth="0.8" />

            <polygon points="45,28 65,30 68,52 48,56" fill="#ffc700" fillOpacity="0.15" stroke="#ffc700" strokeWidth="0.5" strokeDasharray="1,1" />
            <text x="56" y="44" fontSize="3.5" textAnchor="middle" fill="#ffc700" fontWeight="bold" opacity="0.8" className="font-mono">
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

            {filteredExhibits.map(ex => {
              const isSelected = selectedPin?.id === ex.id;
              return (
                <g 
                  key={ex.id} 
                  transform={`translate(${ex.coordinates?.x || 50}, ${ex.coordinates?.y || 50})`}
                  className="cursor-pointer group"
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedPinId(ex.id);
                  }}
                >
                  {!ex.cleaned && (
                    <circle r="4.5" fill="#ffc700" fillOpacity="0.35" className="animate-ping" />
                  )}
                  <circle 
                    r={isSelected ? "3.8" : "2.8"} 
                    fill={ex.cleaned ? "#10b981" : ex.severity === 'critical' ? "#ff007a" : "#ffc700"} 
                    stroke="#0b0e14" 
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
          <div className="absolute bottom-3 left-3 bg-[#0b0e14]/90 p-2.5 border border-gray-700 text-[10px] space-y-1 backdrop-blur-sm rounded shadow-md">
            <div className="flex items-center gap-1.5 text-[#ffc700]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffc700] inline-block animate-pulse"></span>
              <span className="font-bold">{t.map.legendActive}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#10b981]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] inline-block"></span>
              <span className="font-bold">{t.map.legendCleaned}</span>
            </div>
          </div>
        </div>
      )}

      {/* Selected Marker Detail Card */}
      {selectedPin && (
        <div className="museum-label-active p-5 border-2 border-[#ffc700] animate-fadeIn flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl rounded-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#ffc700] bg-black px-2 py-0.5 border border-[#ffc700] rounded">
                #{selectedPin.code}
              </span>
              <span className="text-xs font-mono text-gray-300 uppercase">
                {selectedPin.category}
              </span>
              <span className={`text-[10px] px-2 py-0.5 font-bold uppercase rounded ${selectedPin.cleaned ? 'bg-emerald-500 text-black' : selectedPin.pendingVerification ? 'bg-[#00f5d4] text-black animate-pulse' : 'bg-rose-500 text-white'}`}>
                {selectedPin.cleaned ? t.exhibits.cleanedStatus : selectedPin.pendingVerification ? '⏳ PENDING' : 'ACTIVE'}
              </span>
            </div>
            <h3 className="font-['Outfit'] text-xl font-bold text-white uppercase">
              {selectedPin.icon} {currentLang === 'en' && selectedPin.titleEn ? selectedPin.titleEn : selectedPin.title}
            </h3>
            <p className="text-xs text-gray-300">
              📍 {currentLang === 'en' && selectedPin.locationEn ? selectedPin.locationEn : selectedPin.location} 
              ({currentLang === 'en' && selectedPin.districtEn ? selectedPin.districtEn : selectedPin.district})
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {!selectedPin.cleaned && (
              selectedPin.pendingVerification ? (
                <div className="bg-[#00f5d4]/20 text-[#00f5d4] border border-[#00f5d4] px-4 py-2 text-xs font-['Archivo_Narrow'] font-bold uppercase rounded animate-pulse">
                  ⏳ {currentLang === 'hy' ? 'ԳՆԱՑ ՀԱՍՏԱՏՄԱՆ' : 'PENDING'}
                </div>
              ) : onCleanExhibit && (
                <button
                  onClick={() => {
                    onCleanExhibit(selectedPin.id);
                  }}
                  className="bg-[#10b981] text-black px-4 py-2 text-xs font-['Archivo_Narrow'] font-black uppercase hover:bg-emerald-400 border border-white rounded shadow-lg"
                >
                  ✓ ՄԱՔՐԵԼ (+{selectedPin.points} PTS)
                </button>
              )
            )}

            <button
              onClick={() => {
                soundFX.playClick();
                onSelectExhibit(selectedPin);
              }}
              className="btn-primary-glow px-4 py-2 text-xs font-black uppercase rounded"
            >
              {t.map.viewExhibit}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
