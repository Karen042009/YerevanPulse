import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import { soundFX } from '../utils/audioFX';

export default function ScannerModal({ isOpen, onClose, onScanSuccess, exhibits = [] }) {
  const [scannedCode, setScannedCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);
  const scanTimerRef = useRef(null);

  const stopCamera = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    if (!isOpen) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      clearTimeout(scanTimerRef.current);
    }
  }, [isOpen]);

  const startCamera = async () => {
    soundFX.playClick();
    setCameraError('');
    setFeedbackMsg('📷 Միացվում է տեսախցիկը...');

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Ձեր բրաուզերը չի աջակցում տեսախցիկի ուղիղ հեռարձակում:');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });

      streamRef.current = stream;
      setCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        setFeedbackMsg('🎥 Տեսախցիկն ակտիվ է: Պահեք QR կոդը կադրում...');
        requestAnimationFrame(tick);
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraActive(false);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Տեսախցիկի թույլտվությունը մերժված է:');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('Տեսախցիկ չի գտնվել:');
      } else {
        setCameraError('Չհաջողվեց միացնել տեսախցիկը:');
      }
    }
  };

  const tick = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && video.readyState === video.HAVE_ENOUGH_DATA && canvas) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });

      if (code && code.data && code.data.trim()) {
        const detectedText = code.data.trim();
        stopCamera();
        handleSimulatedScan(detectedText);
        return;
      }
    }

    animFrameRef.current = requestAnimationFrame(tick);
  };

  const handleSimulatedScan = (code) => {
    soundFX.playScanChirp();
    setIsScanning(true);
    setFeedbackMsg(`⚡ Սկանավորվում է #${code}...`);

    clearTimeout(scanTimerRef.current);
    scanTimerRef.current = setTimeout(() => {
      setIsScanning(false);
      const normalizedCode = code.trim().toLowerCase();
      const exhibit = exhibits.find((item) => item.code.toLowerCase() === normalizedCode);

      if (!exhibit) {
        setFeedbackMsg(`❌ Չգտնվեց ցուցանմուշ՝ #${code}`);
        return;
      }

      if (exhibit.cleaned) {
        setFeedbackMsg(`✓ Այս ցուցանմուշն (${exhibit.code}) արդեն մաքրված է`);
        return;
      }

      setFeedbackMsg(`✓ Ցուցանմուշը ճանաչված է՝ #${exhibit.code}`);
      stopCamera();
      onScanSuccess(exhibit.code);
    }, 1000);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!scannedCode.trim()) return;
    handleSimulatedScan(scannedCode.trim());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Hidden canvas element for frame grabbing */}
      <canvas ref={canvasRef} className="hidden" />

      <div className="bg-[var(--surface-1)] border-2 border-[var(--primary-gold)] p-5 sm:p-6 max-w-md w-full relative shadow-[0_0_50px_var(--primary-gold-glow)] rounded-lg transition-colors">
        {/* Close button */}
        <button
          onClick={() => {
            soundFX.playClick();
            stopCamera();
            onClose();
          }}
          className="absolute top-3 right-3 text-gray-400 hover:text-[var(--primary-gold)] transition-colors p-1 z-20"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Modal Header */}
        <div className="text-center mb-4 space-y-1.5">
          <div className="w-12 h-12 mx-auto border border-[var(--primary-gold)] p-1 bg-black rounded shadow-[2px_2px_0px_0px_var(--primary-gold)] flex items-center justify-center">
            <img src="/logo.png" alt="Yerevan Pulse Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="font-['Archivo_Narrow'] text-xl font-black uppercase text-[var(--primary-gold)] tracking-wider">
            QR-ԿՈԴԻ ՍԿԱՆԱՎՈՐՈՒՄ
          </h2>
          <p className="text-xs font-['Montserrat'] text-gray-300">
            Պահեք տեսախցիկը փողոցային ցուցանակի QR կոդի վրա կամ ընտրեք ցուցանմուշը
          </p>
        </div>

        {/* Main Camera / Scanner HUD Box */}
        <div className="relative w-full h-52 bg-[var(--bg-main)] border-2 border-dashed border-[var(--primary-gold)] rounded-md flex flex-col items-center justify-center overflow-hidden mb-4 transition-colors">
          {/* Live Video Feed */}
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              cameraActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />

          {/* HUD Corner Crosshairs */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--primary-gold)] z-10 pointer-events-none" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[var(--primary-gold)] z-10 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[var(--primary-gold)] z-10 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--primary-gold)] z-10 pointer-events-none" />

          {/* Scanning Laser Beam Line */}
          <div className="absolute inset-x-0 h-1 bg-[var(--primary-gold)] shadow-[0_0_15px_var(--primary-gold)] animate-bounce top-1/2 z-10 pointer-events-none" />

          {!cameraActive && (
            <span className="material-symbols-outlined text-5xl text-[var(--primary-gold)] animate-pulse mb-2 z-10" style={{ fontVariationSettings: "'FILL' 1" }}>
              qr_code_scanner
            </span>
          )}

          {/* Status HUD / Feedback Message */}
          <div className="z-10 bg-[var(--surface-1)]/90 px-3 py-1.5 border border-[var(--primary-gold)]/50 rounded backdrop-blur max-w-[90%] text-center shadow-md">
            <p className="text-xs font-['Archivo_Narrow'] text-[var(--primary-gold)] uppercase font-bold tracking-wide truncate">
              {feedbackMsg || (cameraActive ? '🎥 ՏԵՍԱԽՑԻԿՆ ԱԿՏԻՎ Է...' : 'ՏԵՍԱԽՑԻԿՆ ԱՆՋԱՏՎԱԾ Է')}
            </p>
          </div>
        </div>

        {/* Camera Toggle Button & Camera Error Display */}
        <div className="mb-4">
          {!cameraActive ? (
            <button
              type="button"
              onClick={startCamera}
              className="w-full py-2.5 bg-[var(--primary-gold)] text-[var(--bg-deep)] font-['Archivo_Narrow'] text-xs font-black uppercase tracking-wider rounded shadow-[2px_2px_0px_0px_var(--primary-gold-glow)] hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">videocam</span>
              <span>📷 ՄԻԱՑՆԵԼ ՏԵՍԱԽՑԻԿԸ (REAL CAMERA)</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                stopCamera();
              }}
              className="w-full py-2 bg-rose-600/20 border border-rose-500 text-rose-300 font-['Archivo_Narrow'] text-xs font-bold uppercase tracking-wider rounded hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">videocam_off</span>
              <span>⏹ ԱՆՋԱՏԵԼ ՏԵՍԱԽՑԻԿԸ</span>
            </button>
          )}

          {cameraError && (
            <p className="mt-2 text-center text-xs text-rose-400 font-mono bg-rose-950/40 p-2 border border-rose-500/30 rounded">
              ⚠️ {cameraError}
            </p>
          )}
        </div>

        {/* Preset Exhibits Buttons for Quick Demo Testing */}
        <div className="space-y-2 mb-4">
          <label className="block font-['Archivo_Narrow'] text-xs font-bold text-[var(--primary-gold)] uppercase tracking-wide">
            ⚡ ԴԵՄՈ ՓՈՐՁԱՐԿՈՒՄ (ԱՐԱԳ ԸՆՏՐՈՒԹՅՈՒՆ)․
          </label>
          <div className="grid grid-cols-2 gap-2">
            {exhibits.slice(0, 4).map((exhibit) => (
              <button 
                key={exhibit.id} 
                onClick={() => {
                  stopCamera();
                  handleSimulatedScan(exhibit.code);
                }} 
                disabled={isScanning || exhibit.cleaned} 
                className="p-2 bg-[var(--surface-2)] border border-[var(--primary-gold)]/40 hover:border-[var(--primary-gold)] text-xs font-['Archivo_Narrow'] font-bold text-left text-white flex items-center justify-between rounded transition-all disabled:opacity-40"
              >
                <span className="truncate">{exhibit.icon} {exhibit.code}</span>
                <span className="text-[10px] text-[var(--primary-gold)] font-mono shrink-0 ml-1">+{exhibit.points} pt</span>
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
            className="flex-1 bg-[var(--bg-main)] border border-[var(--primary-gold)]/40 focus:border-[var(--primary-gold)] text-[var(--text-main)] px-3 py-2 text-xs outline-none font-mono rounded transition-colors"
          />
          <button
            type="submit"
            disabled={isScanning || !scannedCode.trim()}
            className="bg-[var(--primary-gold)] text-[var(--bg-deep)] px-4 py-2 font-['Archivo_Narrow'] text-xs font-black uppercase hover:opacity-90 disabled:opacity-50 rounded transition-all shadow-[2px_2px_0px_0px_var(--primary-gold-glow)]"
          >
            ՍԿԱՆ
          </button>
        </form>
      </div>
    </div>
  );
}
