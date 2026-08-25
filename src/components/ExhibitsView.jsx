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
        return <span className="bg-purple-500/20 text-purple-400 border border-purple-500/40 text-[10px] font-mono px-2 py-0.5 uppercase font-bold shrink-0">🚨 CRITICAL</span>;
      case 'high':
        return <span className="bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[10px] font-mono px-2 py-0.5 uppercase font-bold shrink-0">🔥 HIGH</span>;
      case 'medium':
        return <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-mono px-2 py-0.5 uppercase font-bold shrink-0">⚠️ MEDIUM</span>;
      default:
        return <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono px-2 py-0.5 uppercase font-bold shrink-0">🌱 LOW</span>;
    }
  };

  return (
    <div className="space-y-6 px-1.5 sm:px-0 py-2 sm:py-4">
      {/* Search and Advanced Filters Control Bar */}
      <div className="space-y-3 bg-[var(--surface-1)] p-3.5 sm:p-4 border border-[var(--primary-gold)]/40 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-lg">
              search
            </span>
            <input
              type="text"
              placeholder={t.exhibits.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--bg-main)] border border-gray-700 focus:border-[var(--primary-gold)] pl-10 pr-8 py-2 text-xs text-white outline-none font-['Montserrat'] rounded-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-[var(--primary-gold)]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 border-l-0 md:border-l border-white/10 md:pl-3">
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
                className={`flex-1 sm:flex-initial px-3 py-2 font-['Archivo_Narrow'] text-[11px] font-bold uppercase transition-all border rounded-lg whitespace-nowrap text-center ${
                  statusFilter === status.id
                    ? 'bg-[var(--primary-gold)] text-[var(--bg-deep)] border-[var(--primary-gold)] shadow-[0_0_10px_var(--primary-gold-glow)] font-black'
                    : 'bg-[var(--bg-main)] text-gray-300 border-gray-700 hover:border-[var(--primary-gold)]'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>

          {/* Sort Selector Buttons */}
          <div className="flex items-center justify-between sm:justify-start gap-1.5 border-l-0 md:border-l border-white/10 md:pl-3">
            <span className="text-[10px] font-['Archivo_Narrow'] text-gray-400 font-bold uppercase whitespace-nowrap">
              {t.exhibits.sortBy}
            </span>
            <div className="flex items-center gap-1 bg-[var(--bg-main)] p-1 border border-gray-700 rounded-lg">
              {[
                { id: 'points', label: '🏆 PTS' },
                { id: 'lifespan', label: '⏳ ՔԱՅՔԱՅՈՒՄ' },
                { id: 'code', label: '🔤 ԿՈԴ' }
              ].map((sortItem) => (
                <button
                  key={sortItem.id}
                  onClick={() => {
                    soundFX.playClick();
                    setSortBy(sortItem.id);
                  }}
                  className={`px-2 py-1 text-[10px] font-['Archivo_Narrow'] font-bold rounded uppercase transition-all ${
                    sortBy === sortItem.id
                      ? 'bg-[var(--primary-gold)] text-black font-black shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {sortItem.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pt-2 border-t border-white/10 no-scrollbar pb-1 flex-nowrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFX.playClick();
                setActiveCategoryFilter(cat);
              }}
              className={`px-3.5 py-1.5 font-['Archivo_Narrow'] text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0 transition-all border rounded-lg ${
                activeCategoryFilter === cat
                  ? 'bg-[var(--primary-gold)] text-[var(--bg-deep)] border-[var(--primary-gold)] shadow-[0_0_10px_var(--primary-gold-glow)]'
                  : 'bg-[var(--bg-main)] text-gray-200 border-gray-700 hover:border-[var(--primary-gold)]'
              }`}
            >
              {cat === 'ALL' ? t.exhibits.allCategories : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Share Toast Notification */}
      {showShareToast && (
        <div className="fixed top-20 right-4 z-50 bg-[var(--primary-gold)] text-[var(--bg-deep)] px-4 py-3 border-2 border-white font-['Archivo_Narrow'] font-black text-sm uppercase shadow-2xl animate-bounce flex items-center gap-2 rounded-lg">
          <span className="material-symbols-outlined text-xl">share</span>
          <span>LINK COPIED TO CLIPBOARD!</span>
        </div>
      )}

      {/* Detailed Exhibit Plaque View */}
      {selectedExhibit ? (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Navigation */}
          <div className="flex justify-between items-center bg-[var(--surface-1)] border-b-2 border-[var(--primary-gold)]/40 pb-3 px-2 rounded-lg">
            <button
              onClick={() => {
                soundFX.playClick();
                setSelectedExhibitId(null);
              }}
              className="flex items-center gap-2 text-[var(--primary-gold)] hover:opacity-80 font-['Archivo_Narrow'] text-base font-bold uppercase"
            >
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
              <span>{currentLang === 'hy' ? 'ՎԵՐԱԴԱՌՆԱԼ' : 'BACK'}</span>
            </button>
            <span className="font-['Archivo_Narrow'] text-base sm:text-xl font-extrabold text-[var(--primary-gold)] tracking-wider uppercase">
              EXHIBIT #{selectedExhibit.code}
            </span>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-12 md:gap-8">
            {/* Artifact Image Frame */}
            <div className="md:col-span-7 mb-6 md:mb-0 space-y-4">
              <div className="relative border-2 border-[var(--primary-gold)] bg-[var(--surface-2)] overflow-hidden aspect-[4/3] flex items-center justify-center group shadow-xl rounded-xl">
                <img 
                  src={selectedExhibit.imageUrl || "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80"} 
                  alt={selectedExhibit.title}
                  className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-all duration-500"
                />
                <div className="absolute top-4 left-4 bg-[var(--surface-2)] border-2 border-[var(--primary-gold)] px-3 py-1 rounded">
                  <span className="font-['Archivo_Narrow'] text-xs font-bold text-[var(--primary-gold)] tracking-wider uppercase">
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
              <div className="border-2 border-[var(--primary-gold)] bg-[var(--surface-1)] p-5 sm:p-6 mb-6 relative shadow-2xl rounded-xl">
                {/* Stencil Pin Effect */}
                <div className="absolute -top-3 -right-3 w-7 h-7 bg-[var(--primary-gold)] rounded-full border-2 border-black flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-base text-black" style={{ fontVariationSettings: "'FILL' 1" }}>
                    push_pin
                  </span>
                </div>

                <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-black text-[var(--primary-gold)] mb-3 uppercase tracking-tight">
                  {currentLang === 'en' && selectedExhibit.titleEn ? selectedExhibit.titleEn : selectedExhibit.title}
                </h1>

                <div className="mb-6 flex flex-wrap gap-2">
                  <span className="bg-[var(--primary-gold)] text-black text-xs font-['Montserrat'] font-bold px-2.5 py-1 uppercase tracking-wider rounded">
                    {t.exhibits.lifespan} {selectedExhibit.lifespanYears >= 1000000 ? t.exhibits.millionYears : `${selectedExhibit.lifespanYears} ${t.exhibits.years}`}
                  </span>
                  <span className={`text-xs font-['Montserrat'] font-bold px-2.5 py-1 uppercase tracking-wider rounded ${
                    selectedExhibit.cleaned ? 'bg-[#10b981] text-black' : 'bg-rose-500 text-white'
                  }`}>
                    {selectedExhibit.cleaned ? t.exhibits.cleanedStatus : 'ACTIVE HOTSPOT'}
                  </span>
                </div>

                <p className="text-sm sm:text-base font-['Montserrat'] text-gray-300 italic mb-6 border-l-4 border-[var(--primary-gold)] pl-4">
                  "{currentLang === 'en' && selectedExhibit.quoteEn ? selectedExhibit.quoteEn : selectedExhibit.quote}"
                </p>

                <div className="space-y-3 mb-8 border-l-2 border-white/10 pl-4 text-xs sm:text-sm text-gray-200">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[var(--primary-gold)]">location_on</span>
                    <span>
                      {currentLang === 'en' && selectedExhibit.locationEn ? selectedExhibit.locationEn : selectedExhibit.location} 
                      ({currentLang === 'en' && selectedExhibit.districtEn ? selectedExhibit.districtEn : selectedExhibit.district})
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[var(--primary-gold)]">person_pin</span>
                    <span>Curator: {selectedExhibit.curator || 'Anonymous Activist'}</span>
                  </div>
                </div>

                {/* Gamification Clean Action Button */}
                {selectedExhibit.cleaned ? (
                  <div className="w-full bg-[#10b981]/20 text-[#10b981] border-2 border-[#10b981] py-4 text-center font-['Archivo_Narrow'] text-lg font-extrabold uppercase flex items-center justify-center gap-3 rounded-lg">
                    <span className="material-symbols-outlined text-2xl">check_circle</span>
                    <span>{t.exhibits.cleanedStatus} (+{selectedExhibit.points} PTS)</span>
                  </div>
                ) : selectedExhibit.pendingVerification ? (
                  <div className="w-full bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] border-2 border-[var(--accent-cyan)] py-4 text-center font-['Archivo_Narrow'] text-lg font-extrabold uppercase flex items-center justify-center gap-3 animate-pulse rounded-lg">
                    <span className="material-symbols-outlined text-2xl">schedule</span>
                    <span>{currentLang === 'hy' ? '⏳ ԳՆԱՑ ՀԱՍՏԱՏՄԱՆ (ՍՊԱՍՎՈՒՄ Է ՍՏՈՒԳՄԱՆ)' : '⏳ PENDING VERIFICATION'}</span>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleClean(selectedExhibit.id)}
                    className="btn-primary-glow w-full py-4 px-6 flex items-center justify-center gap-3 text-lg rounded-lg"
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
                  className="border-2 border-[var(--primary-gold)] text-[var(--primary-gold)] py-3 flex items-center justify-center gap-2 hover:bg-[var(--primary-gold)] hover:text-black transition-all font-['Archivo_Narrow'] text-xs font-bold uppercase rounded-lg"
                >
                  <span className="material-symbols-outlined text-base">qr_code_2</span>
                  <span>{t.exhibits.showQR}</span>
                </button>

                <button 
                  onClick={handleShare}
                  className="border-2 border-white/20 text-gray-200 py-3 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors font-['Archivo_Narrow'] text-xs font-bold uppercase rounded-lg"
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
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/10 pb-3">
            <h2 className="font-['Outfit'] text-lg sm:text-xl font-black text-white uppercase tracking-wide">
              {t.exhibits.title} ({filteredExhibits.length})
            </h2>
            
            <button 
              onClick={() => {
                soundFX.playClick();
                if (onOpenReport) onOpenReport();
                else if (onOpenScanner) onOpenScanner();
              }}
              className="btn-primary-glow px-4 py-2 text-xs font-['Archivo_Narrow'] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 w-full sm:w-auto rounded-lg"
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
                  className={`museum-label p-4 sm:p-5 cursor-pointer transition-all hover:border-[var(--primary-gold)] relative group flex flex-col justify-between ${
                    exhibit.cleaned ? 'opacity-75 border-l-4 border-l-[#10b981]' : 'border-l-4 border-l-[var(--primary-gold)]'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-['Archivo_Narrow'] text-xs sm:text-sm font-bold text-[var(--primary-gold)] bg-[var(--bg-main)] px-2 py-0.5 border border-[var(--primary-gold)]/40 rounded">
                          #{exhibit.code}
                        </span>
                        <span className="text-xs text-gray-400 uppercase font-mono font-medium">
                          {exhibit.category}
                        </span>
                        {getSeverityBadge(exhibit.severity)}
                      </div>

                      <span className="text-xs sm:text-sm font-['Archivo_Narrow'] font-black text-[var(--primary-gold)] bg-[var(--primary-gold)]/10 px-2.5 py-0.5 border border-[var(--primary-gold)]/30 shrink-0 rounded">
                        +{exhibit.points} PTS
                      </span>
                    </div>

                    <h3 className="font-['Outfit'] text-base sm:text-lg font-bold text-white uppercase flex items-center gap-2 group-hover:text-[var(--primary-gold)] transition-colors leading-snug my-1">
                      <span>{exhibit.icon}</span>
                      <span>{displayTitle}</span>
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-300 italic my-2.5 line-clamp-2 border-l-2 border-white/20 pl-2">
                      "{displayQuote}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400 pt-3 border-t border-white/10">
                    <span className="flex items-center gap-1 truncate max-w-[70%]">
                      <span className="material-symbols-outlined text-base text-[var(--primary-gold)] shrink-0">location_on</span>
                      <span className="truncate">{displayLocation}</span>
                    </span>
                    <span className="text-[var(--primary-gold)] font-bold group-hover:underline shrink-0 text-xs sm:text-sm">
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
