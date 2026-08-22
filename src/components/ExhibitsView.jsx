import React, { useState } from 'react';
import { soundFX } from '../utils/audioFX';

export default function ExhibitsView({ exhibits, onCleanExhibit, onOpenScanner, onOpenReport }) {
  const [selectedExhibit, setSelectedExhibit] = useState(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL | ACTIVE | CLEANED
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('points'); // points | lifespan | code
  const [showShareToast, setShowShareToast] = useState(false);

  const categories = ['ALL', 'Պլաստիկ', 'Ծխախոտ', 'Ապակի', 'Մետաղ', 'Թուղթ/Պլաստիկ'];

  const filteredExhibits = exhibits
    .filter((exhibit) => {
      if (activeCategoryFilter !== 'ALL' && !exhibit.category.toLowerCase().includes(activeCategoryFilter.toLowerCase())) {
        return false;
      }
      if (statusFilter === 'ACTIVE' && exhibit.cleaned) return false;
      if (statusFilter === 'CLEANED' && !exhibit.cleaned) return false;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = exhibit.title.toLowerCase().includes(query);
        const matchesLoc = exhibit.location.toLowerCase().includes(query);
        const matchesCode = exhibit.code.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc && !matchesCode) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'points') return b.points - a.points;
      if (sortBy === 'lifespan') return b.lifespanYears - a.lifespanYears;
      return a.code.localeCompare(b.code);
    });

  const handleClean = (exhibitId) => {
    soundFX.playSuccess();
    onCleanExhibit(exhibitId);
  };

  const handleShare = () => {
    soundFX.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 3000);
  };

  return (
    <div className="space-y-6 px-2 md:px-0 py-4">
      {/* Search and Advanced Filters Control Bar */}
      <div className="space-y-3 bg-[#1e2020] p-4 border border-[#4d4732]">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#999077] text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Որոնել ցուցանմուշ, հասցե կամ կոդ (#042)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121414] border border-[#4d4732] focus:border-[#ffd700] pl-10 pr-4 py-2 text-xs text-[#e2e2e2] outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-[#999077] hover:text-[#ffd700]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1 border-l-0 md:border-l border-[#4d4732] md:pl-3">
            {[
              { id: 'ALL', label: 'ԲՈԼՈՐԸ' },
              { id: 'ACTIVE', label: '⚡ ԱԿՏԻՎ' },
              { id: 'CLEANED', label: '✓ ՄԱՔՐՎԱԾ' }
            ].map((status) => (
              <button
                key={status.id}
                onClick={() => {
                  soundFX.playClick();
                  setStatusFilter(status.id);
                }}
                className={`px-2.5 py-2 font-['Archivo_Narrow'] text-[11px] font-bold uppercase transition-all border whitespace-nowrap ${
                  statusFilter === status.id
                    ? 'bg-[#ffd700] text-[#1a1a1a] border-[#ffd700]'
                    : 'bg-[#121414] text-[#d0c6ab] border-[#4d4732] hover:border-[#ffd700]'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 border-l-0 md:border-l border-[#4d4732] md:pl-3">
            <span className="text-[10px] font-['Archivo_Narrow'] text-[#999077] font-bold uppercase whitespace-nowrap">
              ՏԵՍԱԿԱՎՈՐԵԼ՝
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#121414] border border-[#4d4732] text-[#ffd700] text-xs font-['Archivo_Narrow'] font-bold px-2 py-2 outline-none"
            >
              <option value="points">Միավորներ (Max)</option>
              <option value="lifespan">Քայքայում (Max)</option>
              <option value="code">Կոդով (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pt-2 border-t border-[#4d4732]/60">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFX.playClick();
                setActiveCategoryFilter(cat);
              }}
              className={`px-3 py-1 font-['Archivo_Narrow'] text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                activeCategoryFilter === cat
                  ? 'bg-[#ffd700] text-[#1a1a1a] border-[#ffd700]'
                  : 'bg-[#121414] text-[#e2e2e2] border-[#4d4732] hover:border-[#ffd700]'
              }`}
            >
              {cat === 'ALL' ? 'ԲՈԼՈՐ ԿԱՏԵԳՈՐԻԱՆԵՐԸ' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Share Toast Notification */}
      {showShareToast && (
        <div className="fixed top-20 right-4 z-50 bg-[#ffd700] text-[#1a1a1a] px-4 py-3 border-2 border-white font-['Archivo_Narrow'] font-black text-sm uppercase shadow-2xl animate-bounce flex items-center gap-2">
          <span className="material-symbols-outlined text-xl">share</span>
          <span>ՑՈՒՑԱՆՄՈՒՇԻ ՀՂՈՒՄԸ ՊԱՏՃԵՆՎԵՑ (LINK COPIED)!</span>
        </div>
      )}

      {/* Detailed Exhibit Plaque View */}
      {selectedExhibit ? (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Navigation */}
          <div className="flex justify-between items-center bg-[#121414] border-b-2 border-[#4d4732] pb-3">
            <button
              onClick={() => {
                soundFX.playClick();
                setSelectedExhibit(null);
              }}
              className="flex items-center gap-2 text-[#ffd700] hover:opacity-80 font-['Archivo_Narrow'] text-base font-bold uppercase"
            >
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
              <span>ՎԵՐԱԴԱՌՆԱԼ</span>
            </button>
            <span className="font-['Archivo_Narrow'] text-xl font-extrabold text-[#ffd700] tracking-wider uppercase">
              ՑՈՒՑԱՆՄՈՒՇ #{selectedExhibit.code}
            </span>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-12 md:gap-8">
            {/* Artifact Image Frame */}
            <div className="md:col-span-7 mb-6 md:mb-0">
              <div className="relative border-2 border-[#4d4732] bg-[#1A1A1A] overflow-hidden aspect-[4/3] flex items-center justify-center group shadow-xl">
                <img 
                  src={selectedExhibit.imageUrl || "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80"} 
                  alt={selectedExhibit.title}
                  className="object-cover w-full h-full opacity-85 group-hover:opacity-100 transition-all mix-blend-luminosity hover:mix-blend-normal duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#1A1A1A] border-2 border-[#ffd700] px-3 py-1">
                  <span className="font-['Archivo_Narrow'] text-xs font-bold text-[#ffd700] tracking-wider uppercase">
                    YR-2026-{selectedExhibit.code}
                  </span>
                </div>
              </div>
            </div>

            {/* Museum Plaque Details */}
            <div className="md:col-span-5 flex flex-col justify-start">
              <div className="border-2 border-[#ffd700] bg-[#2A2A2A] p-6 mb-6 relative">
                {/* Stencil Pin Effect */}
                <div className="absolute -top-3 -right-3 w-7 h-7 bg-[#ffd700] rounded-full border-2 border-[#1A1A1A] flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-base text-[#1A1A1A]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    push_pin
                  </span>
                </div>

                <h1 className="font-['Archivo_Narrow'] text-3xl font-black text-[#ffd700] mb-3 uppercase tracking-tight">
                  {selectedExhibit.title}
                </h1>

                <div className="mb-6 flex flex-wrap gap-2">
                  <span className="bg-[#ffd700] text-[#1A1A1A] text-xs font-['Montserrat'] font-bold px-2.5 py-1 uppercase tracking-wider border border-white">
                    ՔԱՅՔԱՅՄԱՆ ԺԱՄԿԵՏ՝ {selectedExhibit.lifespanYears >= 1000000 ? '1 ՄԻԼԻՈՆ ՏԱՐԻ' : `${selectedExhibit.lifespanYears} ՏԱՐԻ`}
                  </span>
                  <span className="bg-white text-[#1A1A1A] text-xs font-['Montserrat'] font-bold px-2.5 py-1 uppercase tracking-wider">
                    {selectedExhibit.cleaned ? 'ՄԱՔՐՎԱԾ Է' : 'ՀԱՅՏՆԱԲԵՐՎԱԾ'}
                  </span>
                </div>

                <p className="text-base font-['Montserrat'] text-[#d0c6ab] italic mb-6 border-l-2 border-[#ffd700] pl-4">
                  "{selectedExhibit.quote}"
                </p>

                <div className="space-y-3 mb-8 border-l-2 border-[#4d4732] pl-4 text-sm text-[#e2e2e2]">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#999077]">location_on</span>
                    <span>{selectedExhibit.location} (Թաղամաս՝ {selectedExhibit.district})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#999077]">calendar_today</span>
                    <span>Հայտնաբերվել է՝ {selectedExhibit.discoveredDate || '12.10.2023'}</span>
                  </div>
                </div>

                {/* Gamification Clean Action Button */}
                {selectedExhibit.cleaned ? (
                  <div className="w-full bg-[#78dc77]/20 text-[#78dc77] border-2 border-[#78dc77] py-4 text-center font-['Archivo_Narrow'] text-lg font-extrabold uppercase flex items-center justify-center gap-3">
                    <span className="material-symbols-outlined text-2xl">check_circle</span>
                    <span>ՄԱՔՐՎԱԾ Է (+{selectedExhibit.points} PTS)</span>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleClean(selectedExhibit.id)}
                    className="w-full bg-[#ffd700] text-[#1A1A1A] py-4 px-6 flex items-center justify-center gap-3 hover:bg-[#e9c400] active:scale-[0.98] transition-all border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] group"
                  >
                    <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                      recycling
                    </span>
                    <span className="font-['Archivo_Narrow'] text-lg font-bold uppercase tracking-tight">
                      ՄԱՔՐԵԼ ԵՎ ՍՏԱՆԱԼ {selectedExhibit.points} ՄԻԱՎՈՐ
                    </span>
                  </button>
                )}
              </div>

              {/* Decomposition Progress Bar */}
              <div className="mb-6 bg-[#1e2020] p-4 border border-[#4d4732]">
                <h3 className="font-['Archivo_Narrow'] text-xs font-bold text-[#d0c6ab] mb-2 uppercase tracking-widest">
                  ՔԱՅՔԱՅՄԱՆ ԸՆԹԱՑՔԸ
                </h3>
                <div className="flex gap-1 h-4 w-full bg-[#121414] p-0.5 border border-[#4d4732]">
                  <div className="bg-[#ffd700] h-full w-[4%]"></div>
                  <div className="bg-[#333535] h-full w-[16%]"></div>
                  <div className="bg-[#333535] h-full w-[20%]"></div>
                  <div className="bg-[#333535] h-full w-[20%]"></div>
                  <div className="bg-[#333535] h-full w-[40%]"></div>
                </div>
                <div className="flex justify-between mt-2 text-xs font-['Montserrat'] text-[#999077]">
                  <span>0 ՏԱՐԻ</span>
                  <span>{selectedExhibit.lifespanYears >= 1000000 ? '1,000,000 ՏԱՐԻ' : `${selectedExhibit.lifespanYears} ՏԱՐԻ`}</span>
                </div>
              </div>

              {/* Social Share Action */}
              <button 
                onClick={handleShare}
                className="w-full border-2 border-[#4d4732] text-[#e2e2e2] py-3 flex items-center justify-center gap-2 hover:bg-[#333535] transition-colors"
              >
                <span className="material-symbols-outlined">share</span>
                <span className="font-['Archivo_Narrow'] text-sm font-bold uppercase">ՏԱՐԱԾԵԼ ՑՈՒՑԱՆՄՈՒՇԸ</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Exhibits Grid List */
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#4d4732] pb-3">
            <h2 className="font-['Archivo_Narrow'] text-xl font-bold text-[#e2e2e2] uppercase">
              ՑՈՒՑԱՍՐԱՀԻ ՑՈՒՑԱՆՄՈՒՇՆԵՐԸ ({filteredExhibits.length})
            </h2>
            
            <button 
              onClick={() => {
                soundFX.playClick();
                if (onOpenReport) onOpenReport();
                else if (onOpenScanner) onOpenScanner();
              }}
              className="bg-[#ffd700] text-[#1a1a1a] px-3 py-1.5 text-xs font-['Archivo_Narrow'] font-black uppercase tracking-wider flex items-center gap-1 hover:bg-[#e9c400] transition-all border border-white"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              <span>+ ԱՎԵԼԱՑՆԵԼ ՑՈՒՑԱՆՄՈՒՇ</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredExhibits.map((exhibit) => (
              <div
                key={exhibit.id}
                onClick={() => {
                  soundFX.playClick();
                  setSelectedExhibit(exhibit);
                }}
                className={`museum-label p-5 cursor-pointer transition-all hover:border-[#ffd700] relative group ${
                  exhibit.cleaned ? 'opacity-75 border-l-4 border-l-[#78dc77]' : 'border-l-4 border-l-[#ffd700]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-['Archivo_Narrow'] text-xs font-bold text-[#ffd700] bg-[#1a1a1a] px-2 py-0.5 border border-[#ffd700]/40">
                        #{exhibit.code}
                      </span>
                      <span className="text-xs text-[#999077] uppercase font-mono">
                        {exhibit.category}
                      </span>
                    </div>
                    <h3 className="font-['Archivo_Narrow'] text-lg font-bold text-white uppercase flex items-center gap-2 group-hover:text-[#ffd700] transition-colors">
                      <span>{exhibit.icon}</span>
                      <span>{exhibit.title}</span>
                    </h3>
                  </div>

                  <span className="text-xs font-['Archivo_Narrow'] font-black text-[#ffd700] bg-[#ffd700]/10 px-2.5 py-1 border border-[#ffd700]/30">
                    +{exhibit.points} PTS
                  </span>
                </div>

                <p className="text-xs text-[#d0c6ab] italic my-3 line-clamp-2">
                  "{exhibit.quote}"
                </p>

                <div className="flex items-center justify-between text-xs text-[#999077] pt-3 border-t border-white/10">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {exhibit.location}
                  </span>
                  <span className="text-[#ffd700] font-bold group-hover:underline">
                    {exhibit.cleaned ? '✓ ՄԱՔՐՎԱԾ Է' : 'ԴԻՏԵԼ ՑՈՒՑԱՆՄՈՒՇԸ ➔'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
