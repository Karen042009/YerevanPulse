import React from 'react';
import { soundFX } from '../utils/audioFX';

export default function ProfileView({ userPoints, cleanedCount }) {
  const [logLimit, setLogLimit] = React.useState(3);

  const totalPoints = 850 + userPoints;
  const totalCleaned = 12 + cleanedCount;

  const actionLogs = [
    { id: 1, title: 'Պլաստիկ շիշ', location: 'Մաշտոցի պողոտա', points: 50, icon: 'delete_outline', type: 'active' },
    { id: 2, title: 'Ապօրինի գովազդ', location: 'Տերյան փողոց', points: 120, icon: 'check_circle', type: 'resolved' },
    { id: 3, title: 'Բաց դիտահոր', location: 'Աբովյան փողոց', points: 80, icon: 'warning', type: 'active' },
    { id: 4, title: 'Կոտրված Ապակի', location: 'Բարեկամություն', points: 100, icon: 'delete_outline', type: 'active' },
    { id: 5, title: 'Ծխախոտի Ֆիլտրեր', location: 'Կասկադ', points: 30, icon: 'check_circle', type: 'resolved' },
  ];

  return (
    <div className="space-y-6 px-2 md:px-0 py-4">
      {/* Profile Header - Bento Box 1 */}
      <section className="museum-label-active p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        {/* Abstract graphic overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:12px_12px]"></div>
        
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
            ID: YR-USR-0924
          </div>
          <h2 className="font-['Archivo_Narrow'] text-3xl md:text-4xl font-extrabold uppercase text-[#e2e2e2] mb-2">
            Անի Սարգսյան
          </h2>
          <div className="bg-[#121414] text-[#ffd700] px-4 py-1.5 border border-[#ffd700] inline-flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <span className="font-['Archivo_Narrow'] text-xs font-bold uppercase">Քաղաքի Պահապան</span>
          </div>

          <div className="flex w-full gap-4 justify-center md:justify-start max-w-md">
            <div className="bg-[#121414] p-4 border border-[#4d4732] flex-1 text-center">
              <div className="font-['Archivo_Narrow'] text-2xl font-black text-[#ffd700]">{totalPoints}</div>
              <div className="font-['Montserrat'] text-[10px] text-[#d0c6ab] uppercase mt-1">ՄԻԱՎՈՐ</div>
            </div>
            <div className="bg-[#121414] p-4 border border-[#4d4732] flex-1 text-center">
              <div className="font-['Archivo_Narrow'] text-2xl font-black text-[#e2e2e2]">{totalCleaned}</div>
              <div className="font-['Montserrat'] text-[10px] text-[#d0c6ab] uppercase mt-1">ՄԱՔՐՎԱԾ ՑՈՒՑԱՆՄՈՒՇ</div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Badges - Bento Box 2 */}
        <section className="md:col-span-5 museum-label p-6 flex flex-col gap-6">
          <div className="flex justify-between items-end border-b border-[#4d4732] pb-2">
            <h3 className="font-['Archivo_Narrow'] text-xl font-bold text-[#e2e2e2] uppercase">Աչքի ընկնող</h3>
            <span className="font-['Montserrat'] text-xs text-[#d0c6ab] font-mono uppercase">ACHIEVEMENTS</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="sticker-effect bg-[#121414] p-3 flex flex-col items-center justify-center gap-2 aspect-square hover:bg-[#333535] transition-all cursor-pointer group">
              <span className="material-symbols-outlined text-4xl text-[#ffd700] group-hover:scale-110 transition-transform">
                footprint
              </span>
              <span className="font-['Archivo_Narrow'] text-xs text-center font-bold text-[#e2e2e2]">Առաջին քայլ</span>
            </div>

            <div className="sticker-effect bg-[#121414] p-3 flex flex-col items-center justify-center gap-2 aspect-square hover:bg-[#333535] transition-all cursor-pointer group">
              <span className="material-symbols-outlined text-4xl text-[#78dc77] group-hover:scale-110 transition-transform">
                eco
              </span>
              <span className="font-['Archivo_Narrow'] text-xs text-center font-bold text-[#e2e2e2]">Էկո-հերոս</span>
            </div>

            <div className="sticker-yellow bg-[#121414] p-3 flex flex-col items-center justify-center gap-2 aspect-square hover:bg-[#333535] transition-all cursor-pointer group">
              <span className="material-symbols-outlined text-4xl text-[#ffd700] group-hover:scale-110 transition-transform">
                workspace_premium
              </span>
              <span className="font-['Archivo_Narrow'] text-xs text-center font-bold text-[#e2e2e2]">Շաբաթվա լավագույն</span>
            </div>
          </div>
        </section>

        {/* History Action Log - Bento Box 3 */}
        <section className="md:col-span-7 museum-label p-6 flex flex-col gap-6">
          <div className="flex justify-between items-end border-b border-[#4d4732] pb-2">
            <h3 className="font-['Archivo_Narrow'] text-xl font-bold text-[#e2e2e2] uppercase">Գործողությունների Մատյան</h3>
            <span className="font-['Montserrat'] text-xs text-[#d0c6ab] font-mono uppercase">ACTION LOG</span>
          </div>

          <div className="flex flex-col gap-3">
            {actionLogs.slice(0, logLimit).map((log) => (
              <div 
                key={log.id} 
                className={`bg-[#121414] p-4 flex items-center justify-between hover:bg-[#333535] transition-colors group border border-[#4d4732] ${
                  log.type === 'resolved' ? 'border-l-4 border-l-[#78dc77] opacity-85' : 'border-l-4 border-l-[#ffd700]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#282a2b] flex items-center justify-center rounded-sm text-[#e2e2e2]">
                    <span className="material-symbols-outlined text-xl">{log.icon}</span>
                  </div>
                  <div>
                    <div className={`font-['Montserrat'] text-sm font-bold text-[#e2e2e2] group-hover:text-[#ffd700] transition-colors ${log.type === 'resolved' ? 'line-through decoration-[#4d4732]' : ''}`}>
                      {log.title}
                    </div>
                    <div className="font-['Montserrat'] text-xs text-[#d0c6ab] flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <span>{log.location}</span>
                    </div>
                  </div>
                </div>
                <div className="font-['Archivo_Narrow'] text-base font-bold text-[#78dc77]">
                  +{log.points} միավոր
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
              ԲԵՌՆԵԼ ԱՎԵԼԻՆ
            </button>
          )}
        </section>
      </div>
    </div>
  );
}
