import React, { useState } from 'react';
import { Clock, MapPin, CheckCircle2, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/audioFX';

export default function ExhibitCard({ exhibit, onCleanExhibit }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleAudio = () => {
    soundFX.playClick();
    setIsPlayingAudio(!isPlayingAudio);
  };

  const handleClean = () => {
    soundFX.playSuccess();
    onCleanExhibit(exhibit.id);
  };

  const getLifespanBadgeColor = (years) => {
    if (years >= 500) return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    if (years >= 100) return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
  };

  return (
    <div className={`museum-plaque p-4 mb-4 transition-all duration-300 ${exhibit.cleaned ? 'opacity-85 border-emerald-500/50 bg-[#0C1717]' : 'hover:border-amber-500/70 hover:scale-[1.01]'}`}>
      {/* Plaque Header */}
      <div className="flex items-start justify-between mb-3 pr-16">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
              #{exhibit.code}
            </span>
            <span className="text-xs text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">
              {exhibit.category}
            </span>
          </div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="text-xl">{exhibit.icon}</span>
            <span>{exhibit.title}</span>
          </h2>
        </div>
      </div>

      {/* Location & District */}
      <div className="flex items-center gap-3 text-xs text-gray-300 mb-3 bg-black/40 p-2.5 rounded-xl border border-white/10">
        <div className="flex items-center gap-1 text-rose-400 font-medium">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>{exhibit.location}</span>
        </div>
        <span className="text-gray-600">•</span>
        <span className="text-gray-400 font-mono">Թաղամաս՝ {exhibit.district}</span>
      </div>

      {/* Sarcastic Curator Quote */}
      <div className="relative pl-3 border-l-2 border-amber-500/60 my-3 py-1 bg-white/[0.02] rounded-r-lg">
        <p className="text-xs italic text-gray-200 leading-relaxed">
          "{exhibit.quote}"
        </p>
        <p className="text-[10px] text-amber-400/90 font-mono mt-1">
          — Կուրատոր՝ {exhibit.curator}
        </p>
      </div>

      {/* Lifespan & Decomposition Stats */}
      <div className="bg-black/50 p-3 rounded-xl border border-white/10 mb-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-gray-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            Քայքայման Ժամկետ Բնության Մեջ․
          </span>
          <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs border ${getLifespanBadgeColor(exhibit.lifespanYears)}`}>
            {exhibit.lifespanYears >= 1000000 ? '1 Միլիոն+ Տարի' : `${exhibit.lifespanYears} Տարի`}
          </span>
        </div>
        
        {/* Visual Progress Bar */}
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-red-600 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(15, (exhibit.lifespanYears / 450) * 100))}%` }}
          />
        </div>
      </div>

      {/* Audio Guide Wave Visualizer */}
      {isPlayingAudio && (
        <div className="mb-3 p-3 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-xs text-indigo-200 flex items-center gap-3 animate-fadeIn">
          {/* Animated Audio Equalizer Waveform */}
          <div className="flex items-center gap-0.5 shrink-0 px-1 py-1 rounded bg-black/40">
            <div className="audio-bar" />
            <div className="audio-bar" />
            <div className="audio-bar" />
            <div className="audio-bar" />
            <div className="audio-bar" />
          </div>
          <div>
            <span className="font-bold text-indigo-300 block text-[11px] mb-0.5">🎙️ Աուդիո-Կուրատորի Ձայնագրություն․</span>
            <p className="text-[11px] leading-snug">{exhibit.audioText}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
        <button 
          onClick={toggleAudio}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-all"
        >
          {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-indigo-400" />}
          <span>{isPlayingAudio ? 'Անջատել' : 'Աուդիո Գիդ 🎧'}</span>
        </button>

        {exhibit.cleaned ? (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>ՄԱՔՐՎԱԾ Է (+{exhibit.points} pt)</span>
          </div>
        ) : (
          <button 
            onClick={handleClean}
            className="btn-primary py-2 px-4 text-xs font-bold"
          >
            <Sparkles className="w-4 h-4" />
            <span>Մաքրել (+{exhibit.points} pt)</span>
          </button>
        )}
      </div>
    </div>
  );
}
