import React from 'react';
import { soundFX } from '../utils/audioFX';
import { translations } from '../data/translations';

export default function PendingVerificationsModal({
  isOpen,
  onClose,
  exhibits,
  onApproveClean,
  onRejectClean,
  currentLang = 'hy'
}) {
  const t = translations[currentLang] || translations.hy;
  const tc = t.cleanVerification;

  if (!isOpen) return null;

  const pendingExhibits = exhibits.filter(ex => ex.pendingVerification);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[var(--bg-main)] border-2 border-[var(--accent-cyan)] p-5 sm:p-6 max-w-2xl w-full relative shadow-[0_0_50px_var(--accent-cyan-glow)] rounded-xl space-y-4 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Close Button */}
        <button
          onClick={() => {
            soundFX.playClick();
            onClose();
          }}
          className="absolute top-3 right-3 text-gray-400 hover:text-[var(--accent-cyan)] p-1 text-xl font-bold transition-colors"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/40 rounded text-[10px] font-mono text-[var(--accent-cyan)] uppercase">
            <span className="material-symbols-outlined text-xs">verified</span>
            <span>CIVIC CURATOR ADMIN PANEL</span>
          </div>
          <h2 className="font-['Outfit'] text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
            <span>{tc.adminPendingTitle}</span>
            <span className="bg-[var(--accent-cyan)] text-black text-xs font-bold px-2 py-0.5 rounded-full">
              {pendingExhibits.length}
            </span>
          </h2>
          <p className="font-['Montserrat'] text-xs text-gray-300">
            {currentLang === 'hy'
              ? 'Ստուգեք քաղաքացիների կողմից ուղարկված մաքրման լուսանկարները և հաստատեք միավորների փոխանցումը:'
              : 'Review cleanup proof photos submitted by citizens and approve points attribution.'}
          </p>
        </div>

        {/* Pending Submissions List */}
        {pendingExhibits.length === 0 ? (
          <div className="p-8 bg-[var(--surface-1)] border border-white/10 rounded-lg text-center space-y-3">
            <span className="material-symbols-outlined text-5xl text-gray-600">task_alt</span>
            <h3 className="font-['Outfit'] text-base font-bold text-gray-300 uppercase">
              {currentLang === 'hy' ? 'ՉԿԱՆ ՀԱՍՏԱՏՄԱՆ ՍՊԱՍՈՂ ՄԱՔՐՈՒՄՆԵՐ' : 'NO PENDING SUBMISSIONS'}
            </h3>
            <p className="font-['Montserrat'] text-xs text-gray-400 max-w-sm mx-auto">
              {currentLang === 'hy'
                ? 'Բոլոր մաքրման ապացույցներն արդեն ստուգված են: Սեղմեք «ՄԱՔՐԵԼ» ցուցանմուշների վրա՝ նոր լուսանկար ուղարկելու համար:'
                : 'All submissions are verified. Click "CLEAN" on active exhibits to test the submission flow.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingExhibits.map(exhibit => (
              <div
                key={exhibit.id}
                className="bg-[var(--surface-1)] border border-[var(--accent-cyan)]/40 p-4 rounded-lg space-y-3 relative group hover:border-[var(--accent-cyan)] transition-all shadow-md"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{exhibit.icon}</span>
                    <div>
                      <h4 className="font-['Outfit'] text-sm font-bold text-white uppercase">
                        #{exhibit.code} — {currentLang === 'en' && exhibit.titleEn ? exhibit.titleEn : exhibit.title}
                      </h4>
                      <span className="text-[11px] font-mono text-gray-400">
                        📍 {currentLang === 'en' && exhibit.locationEn ? exhibit.locationEn : exhibit.location} ({exhibit.district})
                      </span>
                    </div>
                  </div>
                  <span className="bg-[var(--primary-gold)]/10 text-[var(--primary-gold)] border border-[var(--primary-gold)]/30 font-['Outfit'] text-xs font-black px-2.5 py-1 rounded self-start sm:self-auto">
                    +{exhibit.points} PTS
                  </span>
                </div>

                {/* Submitted Proof Image & Notes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-5 h-36 bg-black border border-gray-700 rounded overflow-hidden relative">
                    <img
                      src={exhibit.proofImage || "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80"}
                      alt="Proof"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-emerald-500 text-black text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
                      SUBMITTED PROOF
                    </span>
                  </div>

                  <div className="sm:col-span-7 space-y-2 text-xs">
                    <div className="p-2 bg-[var(--bg-main)] border border-white/10 rounded font-['Montserrat'] text-gray-300">
                      <span className="text-[var(--accent-cyan)] font-bold block mb-0.5">💬 {currentLang === 'hy' ? 'Քաղաքացու նշումը:' : 'User Notes:'}</span>
                      "{exhibit.proofNotes || (currentLang === 'hy' ? 'Աղբը մաքրված է և տեղափոխված աղբաման:' : 'Trash cleaned and disposed of.')}"
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                      <span className="material-symbols-outlined text-xs text-[var(--accent-cyan)]">schedule</span>
                      <span>Submitted: {exhibit.submittedAt || 'Just now'}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                  <button
                    onClick={() => {
                      soundFX.playClick();
                      onRejectClean(exhibit.id);
                    }}
                    className="border border-rose-500/60 text-rose-400 hover:bg-rose-500 hover:text-white px-3 py-2 text-xs font-['Archivo_Narrow'] font-bold uppercase transition-all rounded"
                  >
                    ✕ {currentLang === 'hy' ? 'ՄԵՐԺԵԼ' : 'REJECT'}
                  </button>

                  <button
                    onClick={() => {
                      soundFX.playVictoryJingle();
                      onApproveClean(exhibit.id);
                    }}
                    className="bg-[var(--accent-cyan)] text-[var(--bg-main)] hover:bg-[var(--accent-cyan)] px-4 py-2 text-xs font-['Archivo_Narrow'] font-black uppercase transition-all rounded shadow-md flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>{tc.adminApprove} (+{exhibit.points} PTS)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
