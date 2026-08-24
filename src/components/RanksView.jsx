import React, { useState } from 'react';
import { soundFX } from '../utils/audioFX';
import { translations } from '../data/translations';

export default function RanksView({ districts, userPoints, currentUser, onOpenScanner, currentLang = 'hy' }) {
  const [activeTab, setActiveTab] = useState('neighborhoods');
  const [selectedDistrictModal, setSelectedDistrictModal] = useState(null);

  const t = translations[currentLang] || translations.hy;

  const sortedDistricts = [...districts].sort((a, b) => b.points - a.points);
  const maxPoints = sortedDistricts[0]?.points || 3500;

  const individuals = [
    { id: 1, rank: 1, name: 'Agent X (Yerevan Leader)', role: 'The Master Sweeper', points: 4250 + userPoints, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6JAOaB0i-hIpxJhXZIqu8Zo2MeiYhN9l--ILfdhANCmRhDDFTNXkl9u2xb2vq-Dd8a1g6TAh4j_RVdXRfy1bTgnFFFh5xKVJeeJsRabEdc3ZcH7sPUO50NqCpT5-KUXqEmn4mqXia_mkhbKNQpKzkoKGUWSNboq5O6i-0s8gx2U55AoDtruwmKX4b7Jp4S7wXInu8YYyCuRMUNNoxLWJK80yalMKcCFPol0ES0HnwEaLlqbKlBYs8" },
    { id: 2, rank: 2, name: currentUser.name, role: currentUser.district, points: currentUser.points + userPoints, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQpNq7HbWrbpBblgG84H55zx-4_Bz1YHNIsrK72zduA1A7DGMIhRMeOam288p244hYY5ysEfj2z3cMYH950zV2sR4pitQe1fkDfKl02193q0I1SCI6_JKaxu_XCIOTiRGUyWhqbwhUMlw3ZPdikIitMCG8q0rRJP_tD-dN7pd8fV79RN0TjCuX_H9Yj42IV5Llfy64F4SbvPYkILMUg3kdxNmEuROjRpggdtlpJyk18KWgS15jeKW5" },
    { id: 3, rank: 3, name: 'Yerevanian99', role: 'Urban Activist', points: 3800, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7le_QlZYDjWGbzDE-crC4bz4wDK5gzxKYszeuQhU0mKyoa67YfqVD9SL5OcR5d3-fedHFOXqj7OxozM7m4AWy2p-1ZoDGVxhu-yRSrfNp-eWw7Y5Za4o9jpBTOPXASuUyb-SXH8TyuguDUHtgPMcS1qJptdqi63Qn0CEwXaig3rKBwHmiboGq0MHh0noWiU6BAAEOfUnmR0QY-7SsmkbFCNdf9G5fDjWaTcLo4Oe8G83M4YoXmC-5" },
    { id: 4, rank: 4, name: 'Armen Eco', role: 'Cascade Cleaner', points: 2950, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
    { id: 5, rank: 5, name: 'Elena_YVN', role: 'Recycling Champ', points: 2400, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80" },
  ];

  return (
    <div className="space-y-5 px-1.5 sm:px-0 py-2 sm:py-4">
      {/* Header / Context */}
      <div className="flex flex-col gap-1.5 mb-2">
        <div className="inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-[var(--primary-gold)] text-2xl sm:text-3xl">flag</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-['Outfit'] font-black uppercase text-white tracking-tight">
            {t.ranks.title}
          </h2>
        </div>
        <p className="text-xs font-['Montserrat'] text-gray-300 italic border-l-2 border-[var(--primary-gold)] pl-3 font-mono">
          Ref. YR-RNK-2026 // Real-time metric of urban intervention and civic cleanliness standings across sectors.
        </p>
      </div>

      {/* Brutalist Tab Switcher */}
      <div className="flex w-full border-2 border-[var(--primary-gold)]/40 bg-[var(--surface-1)] p-1 gap-1 rounded-xl shadow-lg">
        <button
          onClick={() => {
            soundFX.playClick();
            setActiveTab('neighborhoods');
          }}
          className={`flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-['Archivo_Narrow'] font-extrabold uppercase transition-all rounded-lg ${
            activeTab === 'neighborhoods'
              ? 'bg-[var(--primary-gold)] text-black font-black shadow-[0_0_12px_var(--primary-gold-glow)]'
              : 'text-gray-300 hover:bg-white/5'
          }`}
        >
          {t.ranks.neighborhoods}
        </button>

        <button
          onClick={() => {
            soundFX.playClick();
            setActiveTab('individuals');
          }}
          className={`flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-['Archivo_Narrow'] font-extrabold uppercase transition-all rounded-lg ${
            activeTab === 'individuals'
              ? 'bg-[var(--primary-gold)] text-black font-black shadow-[0_0_12px_var(--primary-gold-glow)]'
              : 'text-gray-300 hover:bg-white/5'
          }`}
        >
          {t.ranks.individuals}
        </button>
      </div>

      {/* Content Area: Neighborhoods */}
      {activeTab === 'neighborhoods' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3.5 animate-fadeIn">
          {sortedDistricts.map((d, index) => {
            const percentage = Math.round((d.points / maxPoints) * 100);

            return (
              <div 
                key={d.id}
                onClick={() => {
                  soundFX.playClick();
                  setSelectedDistrictModal(d);
                }}
                className={`bg-[var(--surface-1)] p-4 flex flex-col gap-3 cursor-pointer transition-all hover:border-[var(--primary-gold)] border-2 rounded-xl shadow-lg ${
                  index === 0 ? 'border-[var(--primary-gold)] shadow-[0_0_20px_var(--primary-gold-glow)]' : 'border-white/10'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center font-['Archivo_Narrow'] font-black text-base sm:text-lg shrink-0 rounded-lg ${
                      index === 0 ? 'bg-[var(--primary-gold)] text-black' : index === 1 ? 'bg-slate-300 text-black' : index === 2 ? 'bg-amber-700 text-white' : 'bg-[var(--bg-main)] text-white border border-white/20'
                    }`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-['Outfit'] text-base sm:text-xl font-bold uppercase text-white flex items-center gap-2 truncate">
                        <span className="truncate">{currentLang === 'en' ? d.nameEn : d.name}</span>
                        <span className="text-[11px] font-mono text-[var(--primary-gold)] shrink-0">{d.badge}</span>
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-['Montserrat'] text-gray-300 mt-0.5">
                        <span>🌱 {d.cleanedExhibits} {t.ranks.cleaned}</span>
                        <span>•</span>
                        <span className="text-rose-400">🔥 {d.hotspots} hotspots</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-['Archivo_Narrow'] text-lg sm:text-2xl font-black text-[var(--primary-gold)]">
                      {d.points.toLocaleString()} PTS
                    </div>
                    <div className="text-[10px] font-mono text-[#10b981]">
                      {d.cleanliness || 75}% CLEAN
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[var(--bg-main)] h-2 border border-white/10 overflow-hidden rounded-full">
                  <div 
                    className={`h-full transition-all duration-700 rounded-full ${
                      index === 0 ? 'bg-[var(--primary-gold)]' : index === 1 ? 'bg-slate-300' : index === 2 ? 'bg-amber-600' : 'bg-[#10b981]'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}

          {/* Contextual Action Button */}
          <div className="mt-4 flex justify-center xl:col-span-2">
            <button 
              onClick={() => {
                soundFX.playScanChirp();
                if (onOpenScanner) onOpenScanner();
              }}
              className="btn-primary-glow w-full sm:w-auto text-xs sm:text-sm px-8 py-3.5 rounded-xl uppercase flex items-center justify-center gap-2 font-black"
            >
              <span className="material-symbols-outlined text-xl">add_box</span>
              <span>Document Civic Intervention</span>
            </button>
          </div>
        </div>
      )}

      {/* Content Area: Individuals */}
      {activeTab === 'individuals' && (
        <div className="flex flex-col gap-3 animate-fadeIn">
          {individuals.map((ind) => (
            <div 
              key={ind.id}
              className={`bg-[var(--surface-1)] border-2 p-3.5 sm:p-4 flex items-center justify-between transition-colors rounded-xl ${
                ind.rank === 1 ? 'border-[var(--primary-gold)] shadow-[0_0_20px_var(--primary-gold-glow)]' : 'border-white/10'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-['Archivo_Narrow'] font-bold text-sm sm:text-lg shrink-0 rounded-lg ${
                  ind.rank === 1 ? 'bg-[var(--primary-gold)] text-black font-black' : 'bg-[var(--bg-main)] text-white border border-white/20'
                }`}>
                  {ind.rank}
                </div>

                <div className="w-10 h-10 sm:w-11 sm:h-11 border-2 border-[var(--primary-gold)] overflow-hidden rounded-full shrink-0">
                  <img src={ind.avatar} alt={ind.name} className="w-full h-full object-cover grayscale contrast-125" />
                </div>

                <div className="min-w-0">
                  <h3 className="font-['Outfit'] text-sm sm:text-lg font-bold uppercase text-white truncate">
                    {ind.name}
                  </h3>
                  <div className="text-[11px] sm:text-xs font-['Montserrat'] text-gray-300 truncate">
                    {ind.role}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="font-['Archivo_Narrow'] text-base sm:text-xl font-bold text-[var(--primary-gold)]">
                  {ind.points.toLocaleString()} PTS
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* District Detail Modal */}
      {selectedDistrictModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[var(--surface-1)] border-2 border-[var(--primary-gold)] p-5 sm:p-6 max-w-md w-full relative shadow-2xl space-y-4 rounded-2xl">
            <button
              onClick={() => setSelectedDistrictModal(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-[var(--primary-gold)] p-1 text-lg"
            >
              ✕
            </button>

            <h3 className="font-['Outfit'] text-xl sm:text-2xl font-black text-[var(--primary-gold)] uppercase">
              {currentLang === 'en' ? selectedDistrictModal.nameEn : selectedDistrictModal.name} {selectedDistrictModal.badge}
            </h3>

            <div className="space-y-2 text-xs text-gray-200 border-t border-b border-white/10 py-3">
              <div className="flex justify-between">
                <span>ՎԱՍՏԱԿԱԾ ՄԻԱՎՈՐՆԵՐ․</span>
                <span className="font-bold text-[var(--primary-gold)]">{selectedDistrictModal.points} PTS</span>
              </div>
              <div className="flex justify-between">
                <span>ՄԱՔՐՎԱԾ ՑՈՒՑԱՆՄՈՒՇՆԵՐ․</span>
                <span className="font-bold text-[#10b981]">{selectedDistrictModal.cleanedExhibits}</span>
              </div>
              <div className="flex justify-between">
                <span>ԱԿՏԻՎ HOTSPOTS․</span>
                <span className="font-bold text-rose-400">{selectedDistrictModal.hotspots}</span>
              </div>
              <div className="flex justify-between">
                <span>ՄԱՔՐՈՒԹՅԱՆ ԱՍՏԻՃԱՆ․</span>
                <span className="font-bold text-[var(--primary-gold)]">{selectedDistrictModal.cleanliness || 75}%</span>
              </div>
            </div>

            <button
              onClick={() => {
                soundFX.playClick();
                setSelectedDistrictModal(null);
                if (onOpenScanner) onOpenScanner();
              }}
              className="btn-primary-glow w-full py-3 text-xs font-black uppercase rounded-xl"
            >
              + ԱՎԵԼԱՑՆԵԼ ՑՈՒՑԱՆՄՈՒՇ ԱՅՍ ԹԱՂԱՄԱՍՈՒՄ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
