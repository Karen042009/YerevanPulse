import React, { useState } from 'react';
import { soundFX } from '../utils/audioFX';
import { translations } from '../data/translations';

export default function ProfileView({ userPoints, cleanedCount, currentLang = 'hy' }) {
  const [logLimit, setLogLimit] = useState(4);
  const [selectedBadgeModal, setSelectedBadgeModal] = useState(null);

  const t = translations[currentLang] || translations.hy;

  const totalPoints = 850 + userPoints;
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
    <div className="space-y-6 px-2 md:px-0 py-4">
      {/* Profile Header Card */}
      <section className="museum-label-active p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:12px_12px]" />
        
        {/* Avatar with LVL 4 Badge */}
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-none border-4 border-[#ffd700] relative z-10 shrink-0 shadow-xl">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJSdFTmOPkvDaEO4Ay292rWxM574-584MJGI6BJRBkCjytZUExR3P9IdCqTxqWHH2T-r4brj_93V_c4vtZsNqNFYRE1tdd1MKa2V7lNLpbsQ-anh2iWquqgXSiaW47JWLQUeFEsIqWIsOCzg3SkrXYxPABAd4bUCBA-B8jVHcq73-5GYHFj7r8-GTj3hiySNpEvkkkrth4k8hrrQ-nw1vCmrwg3iyTgYOCtKQZCAMBUUgiNG65H0N8" 
            alt="Անի Սարգսյան" 
            className="w-full h-full object-cover grayscale contrast-125"
          />
          <div className="absolute bottom-0 right-0 bg-[#ffd700] text-[#1A1A1A] px-2 py-0.5 font-['Archivo_Narrow'] text-xs font-black border border-[#121414]">
            LVL 4
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 w-full">
          <div className="font-['Montserrat'] text-xs text-[#ffd700] tracking-[0.2em] mb-1 font-mono">
            ID: YR-USR-0924 // SECTOR: ԿԵՆՏՐՈՆ
          </div>
          <h2 className="font-['Archivo_Narrow'] text-3xl md:text-4xl font-extrabold uppercase text-[#e2e2e2] mb-2">
            Անի Սարգսյան
          </h2>
          <div className="bg-[#121414] text-[#ffd700] px-4 py-1.5 border border-[#ffd700] inline-flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <span className="font-['Archivo_Narrow'] text-xs font-bold uppercase">{t.profile.guardian}</span>
          </div>

          {/* Stats Bar */}
          <div className="flex w-full gap-4 justify-center md:justify-start max-w-md">
            <div className="bg-[#121414] p-4 border border-[#4d4732] flex-1 text-center">
              <div className="font-['Archivo_Narrow'] text-2xl font-black text-[#ffd700]">{totalPoints}</div>
              <div className="font-['Montserrat'] text-[10px] text-[#d0c6ab] uppercase mt-1">{t.profile.totalPoints}</div>
            </div>
            <div className="bg-[#121414] p-4 border border-[#4d4732] flex-1 text-center">
              <div className="font-['Archivo_Narrow'] text-2xl font-black text-[#e2e2e2]">{totalCleaned}</div>
              <div className="font-['Montserrat'] text-[10px] text-[#d0c6ab] uppercase mt-1">{t.profile.cleanedCount}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Level Progress Bar */}
      <div className="bg-[#1e2020] p-4 border border-[#4d4732] space-y-2">
        <div className="flex justify-between text-xs font-['Archivo_Narrow'] font-bold">
          <span className="text-[#ffd700]">LEVEL 4 ➔ LEVEL 5 (NEXT RANK)</span>
          <span className="text-[#d0c6ab]">{totalPoints} / 1500 PTS</span>
        </div>
        <div className="w-full bg-[#121414] h-3 border border-[#4d4732] p-0.5">
          <div className="bg-[#ffd700] h-full transition-all duration-500" style={{ width: `${Math.min(100, Math.round((totalPoints / 1500) * 100))}%` }}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Achievements Badges Column */}
        <section className="md:col-span-5 museum-label p-6 flex flex-col gap-6">
          <div className="flex justify-between items-end border-b border-[#4d4732] pb-2">
            <h3 className="font-['Archivo_Narrow'] text-xl font-bold text-[#e2e2e2] uppercase">{t.profile.achievements}</h3>
            <span className="font-['Montserrat'] text-xs text-[#d0c6ab] font-mono uppercase">BADGES</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {achievements.map((badge) => (
              <div 
                key={badge.id}
                onClick={() => {
                  soundFX.playBadgeUnlock();
                  setSelectedBadgeModal(badge);
                }}
                className={`p-3 flex flex-col items-center justify-center gap-2 aspect-square transition-all cursor-pointer group border ${
                  badge.unlocked 
                    ? 'bg-[#121414] border-[#ffd700] hover:bg-[#333535]' 
                    : 'bg-[#121414]/50 border-[#4d4732] opacity-40 grayscale'
                }`}
              >
                <span className={`material-symbols-outlined text-4xl group-hover:scale-110 transition-transform ${badge.unlocked ? 'text-[#ffd700]' : 'text-gray-500'}`}>
                  {badge.icon}
                </span>
                <span className="font-['Archivo_Narrow'] text-[11px] text-center font-bold text-[#e2e2e2] leading-tight">
                  {currentLang === 'en' ? badge.titleEn : badge.title}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Action Log History */}
        <section className="md:col-span-7 museum-label p-6 flex flex-col gap-6">
          <div className="flex justify-between items-end border-b border-[#4d4732] pb-2">
            <h3 className="font-['Archivo_Narrow'] text-xl font-bold text-[#e2e2e2] uppercase">{t.profile.actionLog}</h3>
            <span className="font-['Montserrat'] text-xs text-[#d0c6ab] font-mono uppercase">HISTORY</span>
          </div>

          <div className="flex flex-col gap-3">
            {actionLogs.slice(0, logLimit).map((log) => (
              <div 
                key={log.id} 
                className={`bg-[#121414] p-4 flex items-center justify-between hover:bg-[#333535] transition-colors group border border-[#4d4732] ${
                  log.type === 'resolved' ? 'border-l-4 border-l-[#78dc77]' : 'border-l-4 border-l-[#ffd700]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#282a2b] flex items-center justify-center rounded-sm text-[#ffd700]">
                    <span className="material-symbols-outlined text-xl">{log.icon}</span>
                  </div>
                  <div>
                    <div className="font-['Montserrat'] text-sm font-bold text-[#e2e2e2] group-hover:text-[#ffd700] transition-colors">
                      {log.title}
                    </div>
                    <div className="font-['Montserrat'] text-xs text-[#d0c6ab] flex items-center gap-2 mt-0.5">
                      <span>📍 {log.location}</span>
                      <span>•</span>
                      <span className="font-mono text-[10px] text-[#999077]">{log.date}</span>
                    </div>
                  </div>
                </div>
                <div className="font-['Archivo_Narrow'] text-base font-bold text-[#78dc77]">
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
              className="mt-2 w-full bg-[#333535] border border-[#4d4732] py-3 font-['Archivo_Narrow'] text-xs font-bold text-[#e2e2e2] hover:bg-[#ffd700] hover:text-[#1a1a1a] hover:border-[#ffd700] transition-all uppercase tracking-wider"
            >
              {t.profile.loadMore}
            </button>
          )}
        </section>
      </div>

      {/* Badge Detail Modal */}
      {selectedBadgeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#121414] border-2 border-[#ffd700] p-6 max-w-sm w-full relative text-center space-y-4 shadow-2xl">
            <button
              onClick={() => setSelectedBadgeModal(null)}
              className="absolute top-3 right-3 text-[#999077] hover:text-[#ffd700] p-1"
            >
              ✕
            </button>

            <span className="material-symbols-outlined text-6xl text-[#ffd700] animate-bounce">
              {selectedBadgeModal.icon}
            </span>

            <h3 className="font-['Archivo_Narrow'] text-2xl font-black text-[#ffd700] uppercase">
              {currentLang === 'en' ? selectedBadgeModal.titleEn : selectedBadgeModal.title}
            </h3>

            <p className="text-xs text-[#d0c6ab]">
              {selectedBadgeModal.desc}
            </p>

            <div className={`p-2 font-['Archivo_Narrow'] text-xs font-bold uppercase border ${
              selectedBadgeModal.unlocked ? 'bg-[#78dc77]/20 text-[#78dc77] border-[#78dc77]' : 'bg-amber-500/20 text-amber-400 border-amber-500'
            }`}>
              {selectedBadgeModal.unlocked ? '✓ UNLOCKED BADGE' : '🔒 LOCKED'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
