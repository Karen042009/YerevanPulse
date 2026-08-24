import React from 'react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audioFX';

export default function QuestsWidget({ quests, onClaimReward, currentLang = 'hy' }) {
  const isArmenian = currentLang === 'hy';

  const completedCount = quests.filter(q => q.completed).length;

  return (
    <div className="museum-label p-5 space-y-4 shadow-xl border-l-4 border-l-[#ffc700] relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-[#ffc700]/10 border border-[#ffc700]/40 rounded-lg flex items-center justify-center text-[#ffc700]">
            <span className="material-symbols-outlined text-xl">emoji_events</span>
          </div>
          <div>
            <h3 className="font-['Outfit'] text-base font-black text-white uppercase tracking-wider">
              {isArmenian ? '🏆 ՕՐԱԿԱՆ ԷԿՈ-ԱՌԱՋԱԴՐԱՆՔՆԵՐ' : '🏆 DAILY ECO QUESTS'}
            </h3>
            <p className="text-[10px] font-mono text-gray-400">
              {isArmenian ? 'ԿԱՏԱՐԻՐ ԱՌԱՋԱԴՐԱՆՔՆԵՐԸ ԵՎ ՍՏԱՑԻՐ PTS' : 'COMPLETE MISSIONS FOR BONUS PTS'}
            </p>
          </div>
        </div>
        <span className="text-xs font-mono text-[#ffc700] bg-[#ffc700]/10 border border-[#ffc700]/30 px-2.5 py-1 rounded font-bold">
          {completedCount}/{quests.length} {isArmenian ? 'ԱՎԱՐՏՎԱԾ' : 'DONE'}
        </span>
      </div>

      <div className="space-y-3">
        {quests.map(quest => {
          const title = isArmenian ? quest.titleHy : quest.titleEn;
          const desc = isArmenian ? quest.descHy : quest.descEn;
          const progressPercent = Math.min(100, Math.round((quest.current / quest.target) * 100));

          return (
            <div
              key={quest.id}
              className={`p-3.5 bg-[#0b0e14] border rounded-lg transition-all space-y-2.5 ${
                quest.claimed
                  ? 'border-emerald-500/40 opacity-80'
                  : quest.completed
                  ? 'border-[#ffc700] bg-[#ffc700]/5 shadow-[0_0_15px_rgba(255,199,0,0.15)]'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-xl text-[#ffc700]">
                    {quest.icon || 'military_tech'}
                  </span>
                  <div>
                    <h4 className="font-['Outfit'] text-sm font-bold text-white uppercase leading-tight">
                      {title}
                    </h4>
                    <p className="text-[11px] font-['Montserrat'] text-gray-400 mt-0.5">
                      {desc}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#00f5d4] bg-[#00f5d4]/10 border border-[#00f5d4]/30 px-2 py-0.5 rounded shrink-0">
                  +{quest.rewardPts} PTS
                </span>
              </div>

              {/* Progress Bar & Claim Button */}
              <div className="flex items-center justify-between gap-3 pt-1 border-t border-white/10">
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-gray-400">
                    <span>PROGRESS</span>
                    <span>{quest.current}/{quest.target}</span>
                  </div>
                  <div className="w-full bg-[#121620] h-1.5 rounded-full overflow-hidden border border-white/10">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        quest.completed ? 'bg-[#00f5d4]' : 'bg-[#ffc700]'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {quest.claimed ? (
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded">
                    ✓ {isArmenian ? 'ՍՏԱՑՎԱԾ Է' : 'CLAIMED'}
                  </span>
                ) : quest.completed ? (
                  <button
                    onClick={() => {
                      soundFX.playVictoryJingle();
                      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
                      onClaimReward(quest.id, quest.rewardPts);
                    }}
                    className="btn-primary-glow px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-black rounded"
                  >
                    🎁 {isArmenian ? 'ՍՏԱՆԱԼ (+PTS)' : 'CLAIM (+PTS)'}
                  </button>
                ) : (
                  <span className="text-[10px] font-mono text-gray-500 uppercase">
                    {isArmenian ? 'ԸՆԹԱՑՔԻ ՄԵՋ' : 'IN PROGRESS'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
