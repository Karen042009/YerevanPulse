import React, { useEffect, useRef, useState } from 'react';
import { soundFX } from '../utils/audioFX';

export default function ScannerModal({ isOpen, onClose, onScanSuccess, exhibits = [] }) {
  const [scannedCode, setScannedCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const scanTimerRef = useRef(null);

  useEffect(() => () => clearTimeout(scanTimerRef.current), []);

  if (!isOpen) return null;

  const handleSimulatedScan = (code) => {
    soundFX.playScanChirp();
    setIsScanning(true);
    setFeedbackMsg(`Սկանավորվում է #${code}...`);

    clearTimeout(scanTimerRef.current);
    scanTimerRef.current = setTimeout(() => {
      setIsScanning(false);
      const normalizedCode = code.trim().toLowerCase();
      const exhibit = exhibits.find((item) => item.code.toLowerCase() === normalizedCode);

      if (!exhibit) {
        setFeedbackMsg("Չգտնվեց ցուցանմուշ՝ #" + code);
        return;
      }

      if (exhibit.cleaned) {
        setFeedbackMsg("Այս ցուցանմուշն արդեն մաքրված է");
        return;
      }

      onScanSuccess(exhibit.code);
    }, 1200);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!scannedCode.trim()) return;
    handleSimulatedScan(scannedCode.trim());
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#1a1c1c] border-2 border-[#ffd700] p-6 max-w-md w-full relative shadow-[0_0_50px_rgba(255,215,0,0.3)]">
        {/* Close button */}
        <button
          onClick={() => {
            soundFX.playClick();
            onClose();
          }}
          className="absolute top-3 right-3 text-[#999077] hover:text-[#ffd700] p-1"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6 space-y-2">
          <img src="/logo.png" alt="Yerevan Pulse Logo" className="h-14 w-auto mx-auto border border-[#ffd700] p-0.5 bg-black" />
          <h2 className="font-['Archivo_Narrow'] text-xl font-black uppercase text-[#ffd700] tracking-wider">
            QR-ԿՈԴԻ ՍԿԱՆԱՎՈՐՈՒՄ
          </h2>
          <p className="text-xs font-['Montserrat'] text-[#d0c6ab]">
            Պահեք տեսախցիկը փողոցային ցուցանակի QR կոդի վրա կամ ընտրեք ցուցանմուշը
          </p>
        </div>

        {/* Simulated Camera Scanner Box */}
        <div className="relative w-full h-48 bg-[#121414] border-2 border-dashed border-[#ffd700] flex flex-col items-center justify-center overflow-hidden mb-6">
          {/* Scanning Laser Beam Line */}
          <div className="absolute inset-x-0 h-1 bg-[#ffd700] shadow-[0_0_15px_#ffd700] animate-bounce top-1/2" />
          
          <span className="material-symbols-outlined text-5xl text-[#ffd700] animate-pulse mb-2">
            qr_code_scanner
          </span>

          <p className="text-xs font-['Archivo_Narrow'] text-[#e2e2e2] uppercase font-bold tracking-widest">
            {feedbackMsg || 'ՏԵՍԱԽՑԻԿՆ ԱԿՏԻՎ Է...'}
          </p>
        </div>

        {/* Preset Exhibits Buttons for Quick Demo Testing */}
        <div className="space-y-3 mb-5">
          <label className="block font-['Archivo_Narrow'] text-xs font-bold text-[#ffd700] uppercase">
            ⚡ ԴԵՄՈ ՓՈՐՁԱՐԿՈՒՄ (ԱՐԱԳ ԸՆՏՐՈՒԹՅՈՒՆ)․
          </label>
          <div className="grid grid-cols-2 gap-2">
            {exhibits.slice(0, 4).map((exhibit) => (
              <button key={exhibit.id} onClick={() => handleSimulatedScan(exhibit.code)} disabled={isScanning || exhibit.cleaned} className="p-2 bg-[#282a2b] border border-[#ffd700]/50 hover:border-[#ffd700] text-xs font-['Archivo_Narrow'] font-bold text-left text-white flex items-center justify-between">
                <span>{exhibit.icon} {exhibit.code}</span>
                <span className="text-[10px] text-[#ffd700] font-mono">+{exhibit.points} pt</span>
              </button>
            ))}
          </div>
        </div>

        {/* Manual Code Input Form */}
        <form onSubmit={handleManualSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Գրեք Կոդը (օր. YVN-042)..."
            value={scannedCode}
            onChange={(e) => setScannedCode(e.target.value)}
            className="flex-1 bg-[#121414] border border-[#4d4732] focus:border-[#ffd700] text-[#e2e2e2] px-3 py-2 text-xs outline-none font-mono"
          />
          <button
            type="submit"
            disabled={isScanning || !scannedCode.trim()}
            className="bg-[#ffd700] text-[#1a1a1a] px-4 py-2 font-['Archivo_Narrow'] text-xs font-black uppercase hover:bg-[#e9c400] disabled:opacity-50"
          >
            ՍԿԱՆ
          </button>
        </form>
      </div>
    </div>
  );
}
