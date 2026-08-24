import React, { useEffect, useState } from 'react';

export default function AiVisionScanner({ isScanning, photoUrl, currentLang = 'hy' }) {
  const [scanStep, setScanStep] = useState(0);

  const isArmenian = currentLang === 'hy';

  const scanStepsHy = [
    '🔍 AI VISION SCANNER INITIALIZED...',
    '⚡ LENS CALIBRATING & MATRIX MAPPING...',
    '🧪 ՄԱՏԵՐԻԱԼ՝ ՊՈԼԻԷԹԻԼԵՆ (PET PLASTIC)',
    '⏳ ՔԱՅՔԱՅՄԱՆ ԺԱՄԿԵՏ՝ ~450 ՏԱՐԻ',
    '✓ AI CONFIDENCE: 98.7% (ՎԵՐԼՈՒԾՎԱԾ Է)'
  ];

  const scanStepsEn = [
    '🔍 AI VISION SCANNER INITIALIZED...',
    '⚡ LENS CALIBRATING & MATRIX MAPPING...',
    '🧪 MATERIAL: POLYETHYLENE (PET PLASTIC)',
    '⏳ ESTIMATED LIFESPAN: ~450 YEARS',
    '✓ AI CONFIDENCE: 98.7% (VERIFIED)'
  ];

  const steps = isArmenian ? scanStepsHy : scanStepsEn;

  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(() => {
      setScanStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 600);

    return () => {
      clearInterval(interval);
      setScanStep(0);
    };
  }, [isScanning, steps.length]);

  if (!isScanning) return null;

  return (
    <div className="relative w-full h-52 bg-[var(--bg-main)] border-2 border-[var(--primary-gold)] rounded-lg overflow-hidden flex flex-col justify-between p-3 shadow-[0_0_30px_var(--primary-gold-glow)]">
      {/* Target Image Background */}
      {photoUrl && (
        <img src={photoUrl} alt="Scanning" className="absolute inset-0 w-full h-full object-cover opacity-40 filter contrast-125" />
      )}

      {/* Cyber Laser Scanner Line Animation */}
      <div className="absolute left-0 right-0 h-1 bg-[var(--primary-gold)] shadow-[0_0_15px_var(--primary-gold)] animate-[pulse_1s_infinite] top-1/2 -translate-y-1/2 z-10" />

      {/* Corner HUD Crosshairs */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--primary-gold)] z-10" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[var(--primary-gold)] z-10" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[var(--primary-gold)] z-10" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--primary-gold)] z-10" />

      {/* Status HUD Header */}
      <div className="z-10 flex justify-between items-center bg-[var(--surface-1)]/90 p-1.5 border border-[var(--primary-gold)]/40 rounded backdrop-blur">
        <span className="text-[10px] font-mono text-[var(--primary-gold)] uppercase font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[var(--primary-gold)] animate-ping" />
          <span>AI VISION SYSTEM 4.2</span>
        </span>
        <span className="text-[9px] font-mono text-gray-300">REC ●</span>
      </div>

      {/* Terminal Output */}
      <div className="z-10 bg-[var(--surface-1)]/95 p-2.5 border border-[var(--primary-gold)]/40 rounded backdrop-blur space-y-1 font-mono text-[11px] text-[var(--primary-gold)]">
        {steps.slice(0, scanStep + 1).map((msg, idx) => (
          <div key={idx} className="leading-tight animate-fadeIn">
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
}
