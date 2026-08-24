import React, { useState } from 'react';
import { soundFX } from '../utils/audioFX';
import { translations } from '../data/translations';

export default function ProfileView({ userPoints, cleanedCount, currentUser, currentLang = 'hy' }) {
  const [logLimit, setLogLimit] = useState(4);
  const [selectedBadgeModal, setSelectedBadgeModal] = useState(null);

  const t = translations[currentLang] || translations.hy;

  const totalPoints = currentUser.points + userPoints;
  const totalCleaned = 12 + cleanedCount;

  const achievements = [
    { id: 'b1', icon: 'footprint', title: 'Առաջին Քայլ', titleEn: 'First Step', desc: 'Առաջին մաքրված ցուցանմուշը Երևանում', unlocked: true },
    { id: 'b2', icon: 'eco', title: 'Էկո-Հերոս', titleEn: 'Eco Hero', desc: 'Վաստակել 500+ Eco-Pulse միավոր', unlocked: totalPoints >= 500 },
    { id: 'b3', icon: 'workspace_premium', title: 'Շաբաթվա Լավագույն', titleEn: 'Weekly Best', desc: 'Մտնել Կենտրոն թաղամասի Top 5-ի մեջ', unlocked: true },
    { id: 'b4', icon: 'qr_code_scanner', title: 'Սկանավորման Վարպետ', titleEn: 'Scanner Master', desc: 'Սկանավորել 10+ փողոցային QR-կոդ', unlocked: totalCleaned >= 5 },
    { id: 'b5', icon: 'shield', title: 'Քաղաքի Պահապան', titleEn: 'City Guardian', desc: 'Հասնել Level 4-ի', unlocked: true },
    { id: 'b6', icon: 'military_tech', title: 'Էլիտար Ակտիվիստ', titleEn: 'Elite Activist', desc: 'Վաստակել 2000+ միավոր', unlocked: totalPoints >= 2000 },
  ];

  const actionLogs = [
    { id: 1, title: 'Պլաստիկ Շիշ #042', location: 'Կասկադ', points: 50, icon: 'delete_outline', type: 'active', date: '20 րոպե առաջ' },
    { id: 2, title: 'Ծխախոտի Ֆիլտր #108', location: 'Աբովյան փողոց', points: 30, icon: 'check_circle', type: 'resolved', date: '1 ժամ առաջ' },
    { id: 3, title: 'Պլաստիկ Տոպրակ #089', location: 'Հյուսիսային Պողոտա', points: 40, icon: 'delete_outline', type: 'active', date: 'Երեկ' },
    { id: 4, title: 'Ալյումինե Տարա #204', location: 'Վերնիսաժ', points: 60, icon: 'check_circle', type: 'resolved', date: '2 օր առաջ' },
    { id: 5, title: 'Կոտրված Ապակի #501', location: 'Բարեկամություն', points: 100, icon: 'delete_outline', type: 'active', date: '3 օր առաջ' },
  ];

  return (
    <div className="space-y-5 px-1.5 sm:px-0 py-2 sm:py-4">
      {/* Profile Header Card */}
      <section className="bg-[var(--surface-1)] border-2 border-[var(--primary-gold)] p-4 sm:p-6 flex flex-col md:flex-row items-center gap-4 sm:gap-6 relative overflow-hidden shadow-2xl rounded-2xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(var(--primary-gold)_1px,transparent_1px)] [background-size:12px_12px]" />
        
        {/* Avatar with LVL {currentUser.level} Badge */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl border-2 sm:border-4 border-[var(--primary-gold)] relative z-10 shrink-0 shadow-xl overflow-hidden">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJSdFTmOPkvDaEO4Ay292rWxM574-584MJGI6BJRBkCjytZUExR3P9IdCqTxqWHH2T-r4brj_93V_c4vtZsNqNFYRE1tdd1MKa2V7lNLpbsQ-anh2iWquqgXSiaW47JWLQUeFEsIqWIsOCzg3SkrXYxPABAd4bUCBA-B8jVHcq73-5GYHFj7r8-GTj3hiySNpEvkkkrth4k8hrrQ-nw1vCmrwg3iyTgYOCtKQZCAMBUUgiNG65H0N8" 
            alt={currentUser.name} 
            className="w-full h-full object-cover grayscale contrast-125"
          />
          <div className="absolute bottom-0 right-0 bg-[var(--primary-gold)] text-black px-2 py-0.5 font-['Archivo_Narrow'] text-[11px] font-black border border-black rounded-tl-lg">
            LVL {currentUser.level}
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 w-full min-w-0">
          <div className="font-['Montserrat'] text-[10px] sm:text-xs text-[var(--primary-gold)] tracking-[0.2em] mb-1 font-mono">
            ID: {currentUser.id} // SECTOR: {currentUser.district.toUpperCase()}
          </div>
          <h2 className="font-['Outfit'] text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white mb-2 truncate max-w-full">
            {currentUser.name}
          </h2>
          <div className="bg-[var(--bg-main)] text-[var(--primary-gold)] px-3 py-1 border border-[var(--primary-gold)] inline-flex items-center gap-2 mb-4 rounded-full">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <span className="font-['Archivo_Narrow'] text-xs font-bold uppercase">{t.profile.guardian}</span>
          </div>

          {/* Stats Bar */}
          <div className="flex w-full gap-3 justify-center md:justify-start max-w-md">
            <div className="bg-[var(--bg-main)] p-3 sm:p-4 border border-white/10 flex-1 text-center rounded-xl">
              <div className="font-['Archivo_Narrow'] text-xl sm:text-2xl font-black text-[var(--primary-gold)]">{totalPoints}</div>
              <div className="font-['Montserrat'] text-[9px] sm:text-[10px] text-gray-300 uppercase mt-1">{t.profile.totalPoints}</div>
            </div>
            <div className="bg-[var(--bg-main)] p-3 sm:p-4 border border-white/10 flex-1 text-center rounded-xl">
              <div className="font-['Archivo_Narrow'] text-xl sm:text-2xl font-black text-white">{totalCleaned}</div>
              <div className="font-['Montserrat'] text-[9px] sm:text-[10px] text-gray-300 uppercase mt-1">{t.profile.cleanedCount}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Level Progress Bar */}
      <div className="bg-[var(--surface-1)] p-3.5 sm:p-4 border border-white/10 space-y-2 rounded-xl">
        <div className="flex justify-between text-xs font-['Archivo_Narrow'] font-bold">
          <span className="text-[var(--primary-gold)]">LEVEL 4 ➔ LEVEL 5 (NEXT RANK)</span>
          <span className="text-gray-300">{totalPoints} / 1500 PTS</span>
        </div>
        <div className="w-full bg-[var(--bg-main)] h-3 border border-white/10 p-0.5 rounded-full overflow-hidden">
          <div className="bg-[var(--primary-gold)] h-full transition-all duration-500 rounded-full" style={{ width: `${Math.min(100, Math.round((totalPoints / 1500) * 100))}%` }}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Achievements Badges Column */}
        <section className="md:col-span-5 bg-[var(--surface-1)] p-4 sm:p-5 border border-white/10 rounded-xl flex flex-col gap-4">
          <div className="flex justify-between items-end border-b border-white/10 pb-2">
            <h3 className="font-['Outfit'] text-lg font-bold text-white uppercase">{t.profile.achievements}</h3>
            <span className="font-['Montserrat'] text-xs text-gray-400 font-mono uppercase">BADGES</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {achievements.map((badge) => (
              <div 
                key={badge.id}
                onClick={() => {
                  soundFX.playBadgeUnlock();
                  setSelectedBadgeModal(badge);
                }}
                className={`p-2.5 flex flex-col items-center justify-center gap-1.5 aspect-square transition-all cursor-pointer group border rounded-xl ${
                  badge.unlocked 
                    ? 'bg-[var(--bg-main)] border-[var(--primary-gold)] hover:border-white shadow-[0_0_10px_var(--primary-gold-glow)]' 
                    : 'bg-[var(--bg-main)]/50 border-white/10 opacity-40 grayscale'
                }`}
              >
                <span className={`material-symbols-outlined text-3xl sm:text-4xl group-hover:scale-110 transition-transform ${badge.unlocked ? 'text-[var(--primary-gold)]' : 'text-gray-500'}`}>
                  {badge.icon}
                </span>
                <span className="font-['Archivo_Narrow'] text-[10px] sm:text-[11px] text-center font-bold text-gray-200 leading-tight truncate w-full">
                  {currentLang === 'en' ? badge.titleEn : badge.title}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Action Log History */}
        <section className="md:col-span-7 bg-[var(--surface-1)] p-4 sm:p-5 border border-white/10 rounded-xl flex flex-col gap-4">
          <div className="flex justify-between items-end border-b border-white/10 pb-2">
            <h3 className="font-['Outfit'] text-lg font-bold text-white uppercase">{t.profile.actionLog}</h3>
            <span className="font-['Montserrat'] text-xs text-gray-400 font-mono uppercase">HISTORY</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {actionLogs.slice(0, logLimit).map((log) => (
              <div 
                key={log.id} 
                className={`bg-[var(--bg-main)] p-3.5 flex items-center justify-between hover:bg-white/5 transition-colors group border rounded-xl ${
                  log.type === 'resolved' ? 'border-l-4 border-l-[#10b981] border-white/10' : 'border-l-4 border-l-[var(--primary-gold)] border-white/10'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 bg-white/5 flex items-center justify-center rounded-lg text-[var(--primary-gold)] shrink-0">
                    <span className="material-symbols-outlined text-lg">{log.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-['Montserrat'] text-xs sm:text-sm font-bold text-white group-hover:text-[var(--primary-gold)] transition-colors truncate">
                      {log.title}
                    </div>
                    <div className="font-['Montserrat'] text-[11px] text-gray-300 flex items-center gap-2 mt-0.5 truncate">
                      <span>📍 {log.location}</span>
                      <span>•</span>
                      <span className="font-mono text-[9px] text-gray-400">{log.date}</span>
                    </div>
                  </div>
                </div>
                <div className="font-['Archivo_Narrow'] text-sm sm:text-base font-bold text-[#10b981] shrink-0">
                  +{log.points} PTS
                </div>
              </div>
            ))}
          </div>

          {logLimit < actionLogs.length && (
            <button 
              onClick={() => {
                soundFX.playClick();
                setLogLimit(actionLogs.length);
              }}
              className="mt-1 w-full bg-[var(--bg-main)] border border-white/10 py-2.5 font-['Archivo_Narrow'] text-xs font-bold text-gray-200 hover:border-[var(--primary-gold)] hover:text-[var(--primary-gold)] transition-all uppercase tracking-wider rounded-xl"
            >
              {t.profile.loadMore}
            </button>
          )}
        </section>
      </div>

      {/* Badge Detail Modal */}
      {selectedBadgeModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[var(--surface-1)] border-2 border-[var(--primary-gold)] p-5 max-w-sm w-full relative text-center space-y-3 shadow-2xl rounded-2xl">
            <button
              onClick={() => setSelectedBadgeModal(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-[var(--primary-gold)] p-1"
            >
              ✕
            </button>

            <span className="material-symbols-outlined text-5xl sm:text-6xl text-[var(--primary-gold)] animate-bounce">
              {selectedBadgeModal.icon}
            </span>

            <h3 className="font-['Outfit'] text-xl sm:text-2xl font-black text-[var(--primary-gold)] uppercase">
              {currentLang === 'en' ? selectedBadgeModal.titleEn : selectedBadgeModal.title}
            </h3>

            <p className="text-xs text-gray-300">
              {selectedBadgeModal.desc}
            </p>

            <div className={`p-2 font-['Archivo_Narrow'] text-xs font-bold uppercase border rounded-lg ${
              selectedBadgeModal.unlocked ? 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]' : 'bg-amber-500/20 text-amber-400 border-amber-500'
            }`}>
              {selectedBadgeModal.unlocked ? '✓ UNLOCKED BADGE' : '🔒 LOCKED'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
