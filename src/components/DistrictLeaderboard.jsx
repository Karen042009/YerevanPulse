import React from 'react';
import { Flame } from 'lucide-react';
import { soundFX } from '../utils/audioFX';

export default function DistrictLeaderboard({ districts }) {
  const sortedDistricts = [...districts].sort((a, b) => b.points - a.points);
  const maxPoints = sortedDistricts[0]?.points || 3000;

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/20 border border-amber-500/40 flex items-center gap-3 shadow-xl">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 border border-amber-300 flex items-center justify-center text-black font-extrabold text-2xl shrink-0 shadow-lg shadow-amber-500/30">
          🏆
        </div>
        <div>
          <h3 className="font-extrabold text-sm text-white font-['Outfit'] flex items-center gap-1.5">
            <span>«Ամենամաքուր Թաղամաս» Մրցույթ</span>
            <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-mono font-bold animate-pulse">
              LIVE
            </span>
          </h3>
          <p className="text-xs text-gray-300 leading-snug mt-0.5">
            Թաղամասերը մրցում են «Ամենամաքուր Թաղամաս» տիտղոսի համար: Մաքրեք ցուցանմուշները և բարձրացրեք դիրքերը:
          </p>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-2.5">
        {sortedDistricts.map((d, index) => {
          const percentage = Math.round((d.points / maxPoints) * 100);

          let rankBadgeClass = 'bg-white/10 text-gray-300';
          if (index === 0) rankBadgeClass = 'rank-gold';
          if (index === 1) rankBadgeClass = 'rank-silver';
          if (index === 2) rankBadgeClass = 'rank-bronze';

          return (
            <div 
              key={d.id} 
              onClick={() => soundFX.playClick()}
              className={`glass-panel p-3.5 transition-all duration-300 glass-panel-hover cursor-pointer ${
                index === 0 
                  ? 'border-amber-500/60 bg-gradient-to-r from-amber-500/15 via-transparent to-transparent' 
                  : index === 1 
                  ? 'border-gray-300/40' 
                  : index === 2 
                  ? 'border-amber-700/40' 
                  : 'border-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {/* Metallic Rank Badge */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm font-mono shrink-0 ${rankBadgeClass}`}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                      <span>Թաղամաս {d.name}</span>
                      <span className="text-[10px] text-gray-400 font-normal">({d.nameEn})</span>
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                      <span>🌱 {d.cleanedExhibits} մաքրված</span>
                      <span>•</span>
                      <span className="text-rose-400 flex items-center gap-0.5">
                        <Flame className="w-3 h-3 text-rose-500" />
                        {d.hotspots} hot-spot
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div className="text-right">
                  <span className="text-sm font-extrabold text-amber-300 font-mono block">
                    {d.points.toLocaleString()} pt
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300 font-mono">
                    {d.badge}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/5">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${
                    index === 0 ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400' :
                    index === 1 ? 'bg-gradient-to-r from-gray-300 to-indigo-400' :
                    index === 2 ? 'bg-gradient-to-r from-amber-600 to-rose-400' :
                    'bg-gradient-to-r from-emerald-500 to-teal-400'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
