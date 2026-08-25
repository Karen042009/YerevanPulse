import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/audioFX';

export default function AudioGuidePlayer({ text, audioUrl, lang = 'hy', title = 'Թանգարանային Աուդիո-Գիդ' }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      soundFX.stopSpeech();
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      soundFX.stopSpeech();
      setIsPlaying(false);
    } else {
      soundFX.playClick();
      setIsPlaying(true);
      soundFX.playAudioGuide(audioUrl, text, lang, () => {
        setIsPlaying(false);
      });
    }
  };

  return (
    <div className="bg-[var(--surface-2)] border-2 border-[var(--primary-gold)] p-4 relative overflow-hidden shadow-lg space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[var(--primary-gold)] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            graphic_eq
          </span>
          <span className="font-['Archivo_Narrow'] text-xs font-bold text-[var(--primary-gold)] uppercase tracking-wider">
            {title}
          </span>
        </div>

        {/* Animated Equalizer Sound Bars */}
        {isPlaying && (
          <div className="flex items-end gap-1 h-5">
            <span className="audio-bar" />
            <span className="audio-bar" />
            <span className="audio-bar" />
            <span className="audio-bar" />
            <span className="audio-bar" />
          </div>
        )}
      </div>

      <p className="text-xs font-['Montserrat'] text-[#d0c6ab] italic leading-relaxed">
        "{text}"
      </p>

      <button
        type="button"
        onClick={handleTogglePlay}
        className={`w-full py-2.5 px-4 font-['Archivo_Narrow'] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all border ${
          isPlaying
            ? 'bg-[var(--surface-1)] text-[var(--primary-gold)] border-[var(--primary-gold)]'
            : 'bg-[var(--primary-gold)] text-[var(--surface-2)] border-white hover:bg-[var(--primary-gold-bright)]'
        }`}
      >
        <span className="material-symbols-outlined text-lg">
          {isPlaying ? 'pause_circle' : 'play_circle'}
        </span>
        <span>
          {isPlaying ? 'ԿԱՆԳՆԵՑՆԵԼ ԱՈՒԴԻՈՆ' : '🔊 ԼՍԵԼ ԱՈՒԴԻՈ-ԳԻԴԸ'}
        </span>
      </button>
    </div>
  );
}
