import React, { useState } from 'react';
import { soundFX } from '../utils/audioFX';
import AudioGuidePlayer from './AudioGuidePlayer';
import ExhibitQRModal from './ExhibitQRModal';
import { translations } from '../data/translations';

export default function ExhibitsView({ 
  exhibits, 
  onCleanExhibit, 
  onOpenScanner, 
  onOpenReport,
  currentLang = 'hy' 
}) {
  const [selectedExhibitId, setSelectedExhibitId] = useState(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL | ACTIVE | CLEANED
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('points'); // points | lifespan | code
  const [showShareToast, setShowShareToast] = useState(false);
  const [qrModalExhibit, setQrModalExhibit] = useState(null);

  const t = translations[currentLang] || translations.hy;
  const selectedExhibit = exhibits.find((exhibit) => exhibit.id === selectedExhibitId);

  const categories = ['ALL', 'Պլաստիկ', 'Ծխախոտ', 'Ապակի', 'Մետաղ', 'Թուղթ/Պլաստիկ', 'Էլեկտրոնիկա'];

  const filteredExhibits = exhibits
    .filter((exhibit) => {
      if (activeCategoryFilter !== 'ALL' && !exhibit.category.toLowerCase().includes(activeCategoryFilter.toLowerCase())) {
        return false;
      }
      if (statusFilter === 'ACTIVE' && exhibit.cleaned) return false;
      if (statusFilter === 'CLEANED' && !exhibit.cleaned) return false;
            
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const title = (currentLang === 'en' && exhibit.titleEn ? exhibit.titleEn : exhibit.title).toLowerCase();
        const location = (currentLang === 'en' && exhibit.locationEn ? exhibit.locationEn : exhibit.location).toLowerCase();
        const district = (currentLang === 'en' && exhibit.districtEn ? exhibit.districtEn : exhibit.district).toLowerCase();
        const code = exhibit.code.toLowerCase();
        if (!title.includes(query) && !location.includes(query) && !district.includes(query) && !code.includes(query)) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'points') return b.points - a.points;
      if (sortBy === 'lifespan') return b.lifespanYears - a.lifespanYears;
      return a.code.localeCompare(b.code);
    });

  const handleClean = (exhibitId) => {
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

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return <span className="bg-purple-500/20 text-purple-400 border border-purple-500/40 text-[10px] font-mono px-2 py-0.5 uppercase font-bold">🚨 CRITICAL</span>;
      case 'high':
        return <span className="bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[10px] font-mono px-2 py-0.5 uppercase font-bold">🔥 HIGH</span>;
      case 'medium':
        return <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-mono px-2 py-0.5 uppercase font-bold">⚠️ MEDIUM</span>;
      default:
        return <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono px-2 py-0.5 uppercase font-bold">🌱 LOW</span>;
    }
  };

  return (
    <div className="space-y-6 px-2 md:px-0 py-4">
      {/* Search and Advanced Filters Control Bar */}
      <div className="space-y-3 bg-[#1e2020] p-4 border border-[#4d4732] shadow-md">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#999077] text-lg">
              search
            </span>
            <input
              type="text"
              placeholder={t.exhibits.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121414] border border-[#4d4732] focus:border-[#ffd700] pl-10 pr-8 py-2 text-xs text-[#e2e2e2] outline-none font-['Montserrat']"
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
              { id: 'ALL', label: t.exhibits.filterAll },
              { id: 'ACTIVE', label: t.exhibits.filterActive },
              { id: 'CLEANED', label: t.exhibits.filterCleaned }
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
              {t.exhibits.sortBy}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#121414] border border-[#4d4732] text-[#ffd700] text-xs font-['Archivo_Narrow'] font-bold px-2 py-2 outline-none"
            >
              <option value="points">{t.exhibits.pointsMax}</option>
              <option value="lifespan">{t.exhibits.lifespanMax}</option>
              <option value="code">{t.exhibits.codeAZ}</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pt-2 border-t border-[#4d4732]/60 no-scrollbar">
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
              {cat === 'ALL' ? t.exhibits.allCategories : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Share Toast Notification */}
      {showShareToast && (
        <div className="fixed top-20 right-4 z-50 bg-[#ffd700] text-[#1a1a1a] px-4 py-3 border-2 border-white font-['Archivo_Narrow'] font-black text-sm uppercase shadow-2xl animate-bounce flex items-center gap-2">
          <span className="material-symbols-outlined text-xl">share</span>
          <span>LINK COPIED TO CLIPBOARD!</span>
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
                setSelectedExhibitId(null);
              }}
              className="flex items-center gap-2 text-[#ffd700] hover:opacity-80 font-['Archivo_Narrow'] text-base font-bold uppercase"
            >
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
              <span>ՎԵՐԱԴԱՌՆԱԼ / BACK</span>
            </button>
            <span className="font-['Archivo_Narrow'] text-xl font-extrabold text-[#ffd700] tracking-wider uppercase">
              EXHIBIT #{selectedExhibit.code}
            </span>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-12 md:gap-8">
            {/* Artifact Image Frame */}
            <div className="md:col-span-7 mb-6 md:mb-0 space-y-4">
              <div className="relative border-2 border-[#ffd700] bg-[#1A1A1A] overflow-hidden aspect-[4/3] flex items-center justify-center group shadow-xl">
                <img 
                  src={selectedExhibit.imageUrl || "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80"} 
                  alt={selectedExhibit.title}
                  className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-all duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#1A1A1A] border-2 border-[#ffd700] px-3 py-1">
                  <span className="font-['Archivo_Narrow'] text-xs font-bold text-[#ffd700] tracking-wider uppercase">
                    YR-2026-{selectedExhibit.code}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  {getSeverityBadge(selectedExhibit.severity)}
                </div>
              </div>

              {/* Museum Narration Audio Guide Player Component */}
              <AudioGuidePlayer
                key={`${selectedExhibit.code}-${currentLang}`}
                text={currentLang === 'en' && selectedExhibit.audioTextEn ? selectedExhibit.audioTextEn : selectedExhibit.audioText}
                audioUrl={currentLang === 'en' ? selectedExhibit.audioUrlEn : selectedExhibit.audioUrl}
                lang={currentLang}
                title={`${t.exhibits.audioGuide} — #${selectedExhibit.code}`}
              />
            </div>

            {/* Museum Plaque Details */}
            <div className="md:col-span-5 flex flex-col justify-start">
              <div className="border-2 border-[#ffd700] bg-[#2A2A2A] p-6 mb-6 relative shadow-2xl">
                {/* Stencil Pin Effect */}
                <div className="absolute -top-3 -right-3 w-7 h-7 bg-[#ffd700] rounded-full border-2 border-[#1A1A1A] flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-base text-[#1A1A1A]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    push_pin
                  </span>
                </div>

                <h1 className="font-['Archivo_Narrow'] text-3xl font-black text-[#ffd700] mb-3 uppercase tracking-tight">
                  {currentLang === 'en' && selectedExhibit.titleEn ? selectedExhibit.titleEn : selectedExhibit.title}
                </h1>

                <div className="mb-6 flex flex-wrap gap-2">
                  <span className="bg-[#ffd700] text-[#1A1A1A] text-xs font-['Montserrat'] font-bold px-2.5 py-1 uppercase tracking-wider border border-white">
                    {t.exhibits.lifespan} {selectedExhibit.lifespanYears >= 1000000 ? t.exhibits.millionYears : `${selectedExhibit.lifespanYears} ${t.exhibits.years}`}
                  </span>
                  <span className={`text-xs font-['Montserrat'] font-bold px-2.5 py-1 uppercase tracking-wider border ${
                    selectedExhibit.cleaned ? 'bg-[#78dc77] text-black border-white' : 'bg-rose-500 text-white border-white'
                  }`}>
                    {selectedExhibit.cleaned ? t.exhibits.cleanedStatus : 'ACTIVE HOTSPOT'}
                  </span>
                </div>

                <p className="text-base font-['Montserrat'] text-[#d0c6ab] italic mb-6 border-l-4 border-[#ffd700] pl-4">
                  "{currentLang === 'en' && selectedExhibit.quoteEn ? selectedExhibit.quoteEn : selectedExhibit.quote}"
                </p>

                <div className="space-y-3 mb-8 border-l-2 border-[#4d4732] pl-4 text-sm text-[#e2e2e2]">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#ffd700]">location_on</span>
                    <span>
                      {currentLang === 'en' && selectedExhibit.locationEn ? selectedExhibit.locationEn : selectedExhibit.location} 
                      ({currentLang === 'en' && selectedExhibit.districtEn ? selectedExhibit.districtEn : selectedExhibit.district})
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#ffd700]">person_pin</span>
                    <span>Curator: {selectedExhibit.curator || 'Anonymous Activist'}</span>
                  </div>
                </div>

                {/* Gamification Clean Action Button */}
                {selectedExhibit.cleaned ? (
                  <div className="w-full bg-[#78dc77]/20 text-[#78dc77] border-2 border-[#78dc77] py-4 text-center font-['Archivo_Narrow'] text-lg font-extrabold uppercase flex items-center justify-center gap-3">
                    <span className="material-symbols-outlined text-2xl">check_circle</span>
                    <span>{t.exhibits.cleanedStatus} (+{selectedExhibit.points} PTS)</span>
                  </div>
                ) : selectedExhibit.pendingVerification ? (
                  <div className="w-full bg-[#00f5d4]/20 text-[#00f5d4] border-2 border-[#00f5d4] py-4 text-center font-['Archivo_Narrow'] text-lg font-extrabold uppercase flex items-center justify-center gap-3 animate-pulse">
                    <span className="material-symbols-outlined text-2xl">schedule</span>
                    <span>{currentLang === 'hy' ? '⏳ ԳՆԱՑ ՀԱՍՏԱՏՄԱՆ (ՍՊԱՍՎՈՒՄ Է ՍՏՈՒԳՄԱՆ)' : '⏳ PENDING VERIFICATION'}</span>
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
                      {t.exhibits.cleanAction} {selectedExhibit.points} PTS
                    </span>
                  </button>
                )}
              </div>

              {/* Action Buttons Row */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setQrModalExhibit(selectedExhibit)}
                  className="border-2 border-[#ffd700] text-[#ffd700] py-3 flex items-center justify-center gap-2 hover:bg-[#ffd700] hover:text-[#1a1a1a] transition-all font-['Archivo_Narrow'] text-xs font-bold uppercase"
                >
                  <span className="material-symbols-outlined text-base">qr_code_2</span>
                  <span>{t.exhibits.showQR}</span>
                </button>

                <button 
                  onClick={handleShare}
                  className="border-2 border-[#4d4732] text-[#e2e2e2] py-3 flex items-center justify-center gap-2 hover:bg-[#333535] transition-colors font-['Archivo_Narrow'] text-xs font-bold uppercase"
                >
                  <span className="material-symbols-outlined text-base">share</span>
                  <span>{t.exhibits.shareExhibit}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Exhibits Grid List */
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#4d4732] pb-3">
            <h2 className="font-['Archivo_Narrow'] text-xl font-bold text-[#e2e2e2] uppercase">
              {t.exhibits.title} ({filteredExhibits.length})
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
              <span>+ {t.hero.reportExhibit}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExhibits.map((exhibit) => {
              const displayTitle = currentLang === 'en' && exhibit.titleEn ? exhibit.titleEn : exhibit.title;
              const displayLocation = currentLang === 'en' && exhibit.locationEn ? exhibit.locationEn : exhibit.location;
              const displayQuote = currentLang === 'en' && exhibit.quoteEn ? exhibit.quoteEn : exhibit.quote;

              return (
                <div
                  key={exhibit.id}
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedExhibitId(exhibit.id);
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
                        {getSeverityBadge(exhibit.severity)}
                      </div>
                      <h3 className="font-['Archivo_Narrow'] text-lg font-bold text-white uppercase flex items-center gap-2 group-hover:text-[#ffd700] transition-colors">
                        <span>{exhibit.icon}</span>
                        <span>{displayTitle}</span>
                      </h3>
                    </div>

                    <span className="text-xs font-['Archivo_Narrow'] font-black text-[#ffd700] bg-[#ffd700]/10 px-2.5 py-1 border border-[#ffd700]/30">
                      +{exhibit.points} PTS
                    </span>
                  </div>

                  <p className="text-xs text-[#d0c6ab] italic my-3 line-clamp-2">
                    "{displayQuote}"
                  </p>

                  <div className="flex items-center justify-between text-xs text-[#999077] pt-3 border-t border-white/10">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-[#ffd700]">location_on</span>
                      {displayLocation}
                    </span>
                    <span className="text-[#ffd700] font-bold group-hover:underline">
                      {exhibit.cleaned
                        ? `✓ ${t.exhibits.cleanedStatus}`
                        : exhibit.pendingVerification
                        ? `⏳ ${currentLang === 'hy' ? 'ԳՆԱՑ ՀԱՍՏԱՏՄԱՆ' : 'PENDING'}`
                        : `${t.exhibits.viewDetail}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* QR Code Plaque Modal */}
      <ExhibitQRModal
        exhibit={qrModalExhibit}
        isOpen={!!qrModalExhibit}
        onClose={() => setQrModalExhibit(null)}
      />
    </div>
  );
}
