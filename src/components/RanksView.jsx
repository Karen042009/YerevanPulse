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
    <div className="space-y-6 px-2 md:px-0 py-4">
      {/* Header / Context */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ffd700] text-3xl">flag</span>
          <h2 className="text-3xl md:text-4xl font-['Archivo_Narrow'] font-black uppercase text-[#e2e2e2]">
            {t.ranks.title}
          </h2>
        </div>
        <p className="text-xs font-['Montserrat'] text-[#d0c6ab] italic border-l-2 border-[#ffd700] pl-3 ml-1 font-mono">
          Ref. YR-RNK-2026 // Real-time metric of urban intervention and civic cleanliness standings across sectors.
        </p>
      </div>

      {/* Brutalist Tab Switcher */}
      <div className="flex w-full border-2 border-[#4d4732] bg-[#1a1c1c] p-1 gap-1">
        <button
          onClick={() => {
            soundFX.playClick();
            setActiveTab('neighborhoods');
          }}
          className={`flex-1 py-3 text-sm font-['Archivo_Narrow'] font-extrabold uppercase transition-all ${
            activeTab === 'neighborhoods'
              ? 'bg-[#ffd700] text-[#1a1a1a] border border-[#ffd700]'
              : 'text-[#e2e2e2] hover:bg-[#333535] border border-transparent'
          }`}
        >
          {t.ranks.neighborhoods}
        </button>

        <button
          onClick={() => {
            soundFX.playClick();
            setActiveTab('individuals');
          }}
          className={`flex-1 py-3 text-sm font-['Archivo_Narrow'] font-extrabold uppercase transition-all ${
            activeTab === 'individuals'
              ? 'bg-[#ffd700] text-[#1a1a1a] border border-[#ffd700]'
              : 'text-[#e2e2e2] hover:bg-[#333535] border border-transparent'
          }`}
        >
          {t.ranks.individuals}
        </button>
      </div>

      {/* Content Area: Neighborhoods */}
      {activeTab === 'neighborhoods' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          {sortedDistricts.map((d, index) => {
            const percentage = Math.round((d.points / maxPoints) * 100);

            return (
              <div 
                key={d.id}
                onClick={() => {
                  soundFX.playClick();
                  setSelectedDistrictModal(d);
                }}
                className={`bg-[#1e2020] p-4 flex flex-col gap-3 cursor-pointer transition-all hover:border-[#ffd700] border-2 ${
                  index === 0 ? 'border-[#ffd700] shadow-[0_0_20px_rgba(255,215,0,0.15)]' : 'border-[#4d4732]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 flex items-center justify-center font-['Archivo_Narrow'] font-black text-lg ${
                      index === 0 ? 'bg-[#ffd700] text-[#1a1a1a]' : index === 1 ? 'bg-slate-300 text-black' : index === 2 ? 'bg-amber-700 text-white' : 'bg-[#121414] text-[#e2e2e2] border border-[#4d4732]'
                    }`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                    </div>

                    <div>
                      <h3 className="font-['Archivo_Narrow'] text-xl font-bold uppercase text-white flex items-center gap-2">
                        <span>{currentLang === 'en' ? d.nameEn : d.name}</span>
                        <span className="text-xs font-mono text-[#ffd700]">{d.badge}</span>
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-['Montserrat'] text-[#d0c6ab] mt-0.5">
                        <span>🌱 {d.cleanedExhibits} {t.ranks.cleaned}</span>
                        <span>•</span>
                        <span className="text-rose-400">🔥 {d.hotspots} hotspots</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-['Archivo_Narrow'] text-2xl font-black text-[#ffd700]">
                      {d.points.toLocaleString()} PTS
                    </div>
                    <div className="text-[10px] font-mono text-[#78dc77]">
                      {d.cleanliness || 75}% CLEANLINESS
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#121414] h-2 border border-[#4d4732] overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-700 ${
                      index === 0 ? 'bg-[#ffd700]' : index === 1 ? 'bg-slate-300' : index === 2 ? 'bg-amber-600' : 'bg-[#78dc77]'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}

          {/* Contextual Action Button */}
          <div className="mt-6 flex justify-center">
            <button 
              onClick={() => {
                soundFX.playScanChirp();
                if (onOpenScanner) onOpenScanner();
              }}
              className="bg-[#ffd700] text-[#1a1a1a] font-['Archivo_Narrow'] font-black text-sm px-8 py-4 border-2 border-white hover:bg-[#e9c400] transition-colors uppercase flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
            >
              <span className="material-symbols-outlined text-xl">add_box</span>
              <span>Document Civic Intervention</span>
            </button>
          </div>
        </div>
      )}

      {/* Content Area: Individuals */}
      {activeTab === 'individuals' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          {individuals.map((ind) => (
            <div 
              key={ind.id}
              className={`bg-[#1e2020] border-2 p-4 flex items-center justify-between transition-colors ${
                ind.rank === 1 ? 'border-[#ffd700] bg-[#252a28]' : 'border-[#4d4732]'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 flex items-center justify-center font-['Archivo_Narrow'] font-bold text-lg ${
                  ind.rank === 1 ? 'bg-[#ffd700] text-black font-black' : 'bg-[#121414] text-white border border-[#4d4732]'
                }`}>
                  {ind.rank}
                </div>

                <div className="w-11 h-11 border-2 border-[#ffd700] overflow-hidden rounded-full">
                  <img src={ind.avatar} alt={ind.name} className="w-full h-full object-cover grayscale contrast-125" />
                </div>

                <div>
                  <h3 className="font-['Archivo_Narrow'] text-lg font-bold uppercase text-white">
                    {ind.name}
                  </h3>
                  <div className="text-xs font-['Montserrat'] text-[#d0c6ab]">
                    {ind.role}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-['Archivo_Narrow'] text-xl font-bold text-[#ffd700]">
                  {ind.points.toLocaleString()} PTS
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* District Detail Modal */}
      {selectedDistrictModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#121414] border-2 border-[#ffd700] p-6 max-w-md w-full relative shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedDistrictModal(null)}
              className="absolute top-3 right-3 text-[#999077] hover:text-[#ffd700] p-1"
            >
              ✕
            </button>

            <h3 className="font-['Archivo_Narrow'] text-2xl font-black text-[#ffd700] uppercase">
              {currentLang === 'en' ? selectedDistrictModal.nameEn : selectedDistrictModal.name} {selectedDistrictModal.badge}
            </h3>

            <div className="space-y-2 text-xs text-[#e2e2e2] border-t border-b border-[#4d4732] py-3">
              <div className="flex justify-between">
                <span>ՎԱՍՏԱԿԱԾ ՄԻԱՎՈՐՆԵՐ․</span>
                <span className="font-bold text-[#ffd700]">{selectedDistrictModal.points} PTS</span>
              </div>
              <div className="flex justify-between">
                <span>ՄԱՔՐՎԱԾ ՑՈՒՑԱՆՄՈՒՇՆԵՐ․</span>
                <span className="font-bold text-[#78dc77]">{selectedDistrictModal.cleanedExhibits}</span>
              </div>
              <div className="flex justify-between">
                <span>ԱԿՏԻՎ HOTSPOTS․</span>
                <span className="font-bold text-rose-400">{selectedDistrictModal.hotspots}</span>
              </div>
              <div className="flex justify-between">
                <span>ՄԱՔՐՈՒԹՅԱՆ ԱՍՏԻՃԱՆ․</span>
                <span className="font-bold text-[#ffd700]">{selectedDistrictModal.cleanliness || 75}%</span>
              </div>
            </div>

            <button
              onClick={() => {
                soundFX.playClick();
                setSelectedDistrictModal(null);
                if (onOpenScanner) onOpenScanner();
              }}
              className="w-full bg-[#ffd700] text-[#1a1a1a] py-3 font-['Archivo_Narrow'] text-xs font-black uppercase tracking-wider hover:bg-[#e9c400]"
            >
              + ԱՎԵԼԱՑՆԵԼ ՑՈՒՑԱՆՄՈՒՇ ԱՅՍ ԹԱՂԱՄԱՍՈՒՄ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
