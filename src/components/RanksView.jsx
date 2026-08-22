import React, { useState } from 'react';
import { soundFX } from '../utils/audioFX';

export default function RanksView({ districts, userPoints, onOpenScanner }) {
  const [activeTab, setActiveTab] = useState('neighborhoods');

  const sortedDistricts = [...districts].sort((a, b) => b.points - a.points);

  const individuals = [
    { id: 1, rank: 1, name: 'Agent X', role: 'The Sweeper', points: 4250 + userPoints, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6JAOaB0i-hIpxJhXZIqu8Zo2MeiYhN9l--ILfdhANCmRhDDFTNXkl9u2xb2vq-Dd8a1g6TAh4j_RVdXRfy1bTgnFFFh5xKVJeeJsRabEdc3ZcH7sPUO50NqCpT5-KUXqEmn4mqXia_mkhbKNQpKzkoKGUWSNboq5O6i-0s8gx2U55AoDtruwmKX4b7Jp4S7wXInu8YYyCuRMUNNoxLWJK80yalMKcCFPol0ES0HnwEaLlqbKlBYs8" },
    { id: 2, rank: 2, name: 'Անի Սարգսյան (Դուք)', role: 'Քաղաքի Պահապան', points: 850 + userPoints, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQpNq7HbWrbpBblgG84H55zx-4_Bz1YHNIsrK72zduA1A7DGMIhRMeOam288p244hYY5ysEfj2z3cMYH950zV2sR4pitQe1fkDfKl02193q0I1SCI6_JKaxu_XCIOTiRGUyWhqbwhUMlw3ZPdikIitMCG8q0rRJP_tD-dN7pd8fV79RN0TjCuX_H9Yj42IV5Llfy64F4SbvPYkILMUg3kdxNmEuROjRpggdtlpJyk18KWgS15jeKW5" },
    { id: 3, rank: 3, name: 'Yerevanian99', role: 'Urban Cleaner', points: 3800, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7le_QlZYDjWGbzDE-crC4bz4wDK5gzxKYszeuQhU0mKyoa67YfqVD9SL5OcR5d3-fedHFOXqj7OxozM7m4AWy2p-1ZoDGVxhu-yRSrfNp-eWw7Y5Za4o9jpBTOPXASuUyb-SXH8TyuguDUHtgPMcS1qJptdqi63Qn0CEwXaig3rKBwHmiboGq0MHh0noWiU6BAAEOfUnmR0QY-7SsmkbFCNdf9G5fDjWaTcLo4Oe8G83M4YoXmC-5" },
  ];

  return (
    <div className="space-y-6 px-2 md:px-0 py-4">
      {/* Header / Context */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ffd700] text-3xl">flag</span>
          <h2 className="text-3xl md:text-4xl font-['Archivo_Narrow'] font-black uppercase text-[#e2e2e2]">
            Civic Standings
          </h2>
        </div>
        <p className="text-xs font-['Montserrat'] text-[#d0c6ab] italic border-l-2 border-[#ffd700] pl-3 ml-1 font-mono">
          Ref. YR-RNK-2023 // Real-time metric of urban intervention and documented negligence across sectors.
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
          ԹԱՂԱՄԱՍԵՐ
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
          ԱՆՀԱՏՆԵՐ
        </button>
      </div>

      {/* Content Area: Neighborhoods */}
      {activeTab === 'neighborhoods' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          {sortedDistricts.map((d, index) => {
            const isRank1 = index === 0;

            if (isRank1) {
              return (
                <div 
                  key={d.id}
                  className="relative bg-[#282a2b] museum-label-active p-5 flex items-center justify-between overflow-hidden group border-2 border-[#ffd700]"
                >
                  <div className="absolute inset-0 bg-[#ffd700]/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="flex flex-col items-center justify-center w-12 h-12 bg-[#ffd700] text-[#1a1a1a] font-['Archivo_Narrow'] font-black text-xl sticker-effect relative">
                      <span className="material-symbols-outlined text-[#1a1a1a] absolute -top-4 -left-3 rotate-[-15deg] text-2xl drop-shadow-md">
                        crown
                      </span>
                      1
                    </div>
                    <div>
                      <h3 className="font-['Archivo_Narrow'] text-2xl font-black uppercase text-white">
                        {d.name}
                      </h3>
                      <div className="text-xs font-['Montserrat'] text-[#ffd700] mt-1 font-mono uppercase">
                        SECTOR: {d.nameEn.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <div className="text-right relative z-10">
                    <div className="font-['Archivo_Narrow'] text-2xl font-black text-[#ffd700]">
                      {d.points.toLocaleString()}
                    </div>
                    <div className="text-xs font-['Montserrat'] text-[#d0c6ab] uppercase tracking-widest">
                      PTS
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={d.id}
                className="bg-[#282a2b] border-2 border-[#4d4732] p-4 flex items-center justify-between hover:border-[#ffd700] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex flex-col items-center justify-center w-10 h-10 border border-[#999077] text-white font-['Archivo_Narrow'] font-bold text-lg ${index === 1 ? 'opacity-80' : 'opacity-60'}`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-['Archivo_Narrow'] text-lg font-bold uppercase text-white">
                      {d.name}
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-['Archivo_Narrow'] text-xl font-bold text-[#e2e2e2]">
                    {d.points.toLocaleString()}
                  </div>
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
              className="bg-[#ffd700] text-[#1a1a1a] font-['Archivo_Narrow'] font-black text-sm px-8 py-4 border-2 border-[#ffd700] hover:bg-[#333535] hover:text-[#ffd700] transition-colors uppercase flex items-center gap-2 sticker-effect"
            >
              <span className="material-symbols-outlined text-xl">add_box</span>
              <span>Document Intervention</span>
            </button>
          </div>
        </div>
      )}

      {/* Content Area: Individuals */}
      {activeTab === 'individuals' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          {individuals.map((ind) => {
            const isRank1 = ind.rank === 1;

            if (isRank1) {
              return (
                <div 
                  key={ind.id}
                  className="relative bg-[#282a2b] museum-label-active p-5 flex items-center justify-between overflow-hidden border-2 border-[#ffd700]"
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="flex flex-col items-center justify-center w-12 h-12 bg-[#ffd700] text-[#1a1a1a] font-['Archivo_Narrow'] font-black text-xl sticker-effect relative">
                      <span className="material-symbols-outlined text-[#1a1a1a] absolute -top-4 -left-3 rotate-[-15deg] text-2xl drop-shadow-md">
                        crown
                      </span>
                      1
                    </div>

                    <div className="w-12 h-12 rounded-none border-2 border-[#ffd700] overflow-hidden sticker-effect">
                      <img src={ind.avatar} alt={ind.name} className="w-full h-full object-cover grayscale contrast-150" />
                    </div>

                    <div>
                      <h3 className="font-['Archivo_Narrow'] text-xl font-black uppercase text-white">
                        {ind.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="inline-block w-2 h-2 bg-[#78dc77] rounded-sm"></span>
                        <span className="text-xs font-['Montserrat'] text-[#d0c6ab]">{ind.role}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right relative z-10">
                    <div className="font-['Archivo_Narrow'] text-2xl font-black text-[#ffd700]">
                      {ind.points.toLocaleString()}
                    </div>
                    <div className="text-xs font-['Montserrat'] text-[#d0c6ab] uppercase tracking-widest">
                      PTS
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={ind.id}
                className="bg-[#282a2b] border-2 border-[#4d4732] p-4 flex items-center justify-between hover:border-[#ffd700] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center justify-center w-10 h-10 border border-[#999077] text-white font-['Archivo_Narrow'] font-bold text-lg opacity-80">
                    {ind.rank}
                  </div>

                  <div className="w-10 h-10 border border-[#999077] overflow-hidden grayscale contrast-125">
                    <img src={ind.avatar} alt={ind.name} className="w-full h-full object-cover" />
                  </div>

                  <div>
                    <h3 className="font-['Archivo_Narrow'] text-base font-bold uppercase text-white">
                      {ind.name}
                    </h3>
                    <div className="text-xs font-['Montserrat'] text-[#d0c6ab]">
                      {ind.role}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-['Archivo_Narrow'] text-lg font-bold text-[#e2e2e2]">
                    {ind.points.toLocaleString()}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="text-center mt-4">
            <p className="text-xs font-['Montserrat'] text-[#d0c6ab] italic">
              More agents documented in database...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
