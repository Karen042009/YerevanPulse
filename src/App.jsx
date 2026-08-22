import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Header from './components/Header';
import HomeView from './components/HomeView';
import ExhibitsView from './components/ExhibitsView';
import RanksView from './components/RanksView';
import ProfileView from './components/ProfileView';
import MapView from './components/MapView';
import BottomNav from './components/BottomNav';
import ScannerModal from './components/ScannerModal';
import AuthModal from './components/AuthModal';
import PitchGuideModal from './components/PitchGuideModal';
import ReportExhibitModal from './components/ReportExhibitModal';
import { initialExhibits, initialDistricts } from './data/exhibits';
import { soundFX } from './utils/audioFX';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [exhibits, setExhibits] = useState(() => {
    const saved = localStorage.getItem('yp_exhibits');
    return saved ? JSON.parse(saved) : initialExhibits;
  });
  const [districts, setDistricts] = useState(() => {
    const saved = localStorage.getItem('yp_districts');
    return saved ? JSON.parse(saved) : initialDistricts;
  });
  const [userPoints, setUserPoints] = useState(() => {
    const saved = localStorage.getItem('yp_points');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('yp_current_user');
    return saved ? JSON.parse(saved) : {
      name: 'Անի Սարգսյան',
      id: 'YR-USR-0924',
      district: 'Կենտրոն',
      level: 4,
      points: 850,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJSdFTmOPkvDaEO4Ay292rWxM574-584MJGI6BJRBkCjytZUExR3P9IdCqTxqWHH2T-r4brj_93V_c4vtZsNqNFYRE1tdd1MKa2V7lNLpbsQ-anh2iWquqgXSiaW47JWLQUeFEsIqWIsOCzg3SkrXYxPABAd4bUCBA-B8jVHcq73-5GYHFj7r8-GTj3hiySNpEvkkkrth4k8hrrQ-nw1vCmrwg3iyTgYOCtKQZCAMBUUgiNG65H0N8'
    };
  });

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPitchOpen, setIsPitchOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('yp_exhibits', JSON.stringify(exhibits));
  }, [exhibits]);

  useEffect(() => {
    localStorage.setItem('yp_districts', JSON.stringify(districts));
  }, [districts]);

  useEffect(() => {
    localStorage.setItem('yp_points', userPoints.toString());
  }, [userPoints]);

  const handleCleanExhibit = (exhibitId) => {
    const target = exhibits.find((e) => e.id === exhibitId);
    if (!target || target.cleaned) return;

    setExhibits((prev) =>
      prev.map((e) => (e.id === exhibitId ? { ...e, cleaned: true } : e))
    );

    setUserPoints((prev) => prev + target.points);

    setDistricts((prev) =>
      prev.map((d) =>
        d.name === target.district
          ? {
              ...d,
              points: d.points + target.points,
              cleanedExhibits: d.cleanedExhibits + 1,
              hotspots: Math.max(0, d.hotspots - 1),
            }
          : d
      )
    );

    // Confetti celebration
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ffd700', '#ffffff', '#78dc77'],
    });
  };

  const handleAddExhibit = (newExhibit) => {
    setExhibits((prev) => [newExhibit, ...prev]);

    setDistricts((prev) =>
      prev.map((d) =>
        d.name === newExhibit.district
          ? {
              ...d,
              hotspots: d.hotspots + 1,
            }
          : d
      )
    );

    setActiveTab('exhibits');
  };

  const handleScanSuccess = (exhibitCode) => {
    setIsScannerOpen(false);
    const target = exhibits.find((e) => e.code.toLowerCase() === exhibitCode.toLowerCase());

    if (target) {
      handleCleanExhibit(target.id);
      setActiveTab('exhibits');
    } else {
      soundFX.playSuccess();
      const firstUncleaned = exhibits.find((e) => !e.cleaned);
      if (firstUncleaned) {
        handleCleanExhibit(firstUncleaned.id);
        setActiveTab('exhibits');
      }
    }
  };

  const cleanedCount = exhibits.filter((e) => e.cleaned).length;

  return (
    <div className="min-h-screen bg-[#121414] text-[#e2e2e2] flex flex-col font-['Montserrat']">
      {/* Universal Top Navigation Bar */}
      <Header
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
      />

      {/* Main Content Layout Wrapper (Desktop Grid vs Mobile Viewport) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 pb-24 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Active Tab Content Column (Full width on Mobile, 8 cols on Desktop) */}
          <div className="md:col-span-8 space-y-6">
            {activeTab === 'home' && (
              <HomeView
                onOpenScanner={() => setIsScannerOpen(true)}
                onChangeTab={setActiveTab}
              />
            )}

            {activeTab === 'exhibits' && (
              <ExhibitsView
                exhibits={exhibits}
                onCleanExhibit={handleCleanExhibit}
                onOpenScanner={() => setIsScannerOpen(true)}
                onOpenReport={() => setIsReportOpen(true)}
              />
            )}

            {activeTab === 'map' && (
              <MapView
                exhibits={exhibits}
                districts={districts}
                onSelectExhibit={() => setActiveTab('exhibits')}
              />
            )}

            {activeTab === 'ranks' && (
              <RanksView
                districts={districts}
                userPoints={userPoints}
                onOpenScanner={() => setIsScannerOpen(true)}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileView
                userPoints={userPoints}
                cleanedCount={cleanedCount}
              />
            )}
          </div>

          {/* Desktop Right Sidebar Widget Column (Hidden on Mobile, 4 cols on Desktop) */}
          <aside className="hidden md:block md:col-span-4 space-y-6">
            {/* User Profile Card Widget */}
            <div className="museum-label-active p-5 space-y-4">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Yerevan Pulse" className="h-10 w-auto border border-[#ffd700] p-0.5 bg-black" />
                <div>
                  <h3 className="font-['Archivo_Narrow'] text-lg font-bold text-[#ffd700] uppercase">
                    YEREVAN PULSE DASHBOARD
                  </h3>
                  <span className="text-[10px] font-mono text-[#d0c6ab]">
                    {currentUser.name} ({currentUser.district})
                  </span>
                </div>
              </div>

              <div className="bg-[#121414] p-3 border border-[#4d4732] flex justify-between items-center text-xs">
                <span>ՎԱՍՏԱԿԱԾ ՄԻԱՎՈՐՆԵՐ․</span>
                <span className="font-['Archivo_Narrow'] font-black text-[#ffd700] text-sm">
                  {850 + userPoints} PTS
                </span>
              </div>

              <button
                onClick={() => { soundFX.playScanChirp(); setIsScannerOpen(true); }}
                className="w-full bg-[#ffd700] text-[#1a1a1a] py-3 font-['Archivo_Narrow'] text-xs font-black uppercase tracking-wider hover:bg-[#e9c400] transition-all border border-white"
              >
                + ԳՏՆԵԼ/ՍԿԱՆԱՎՈՐԵԼ ՑՈՒՑԱՆՄՈՒՇ
              </button>
            </div>

            {/* Live Pollution Map Mini Preview */}
            <div className="museum-label p-4 space-y-3">
              <div className="flex justify-between items-center border-b border-[#4d4732] pb-2">
                <h4 className="font-['Archivo_Narrow'] text-xs font-bold text-[#e2e2e2] uppercase">
                  ԵՐԵՎԱՆԻ ՔԱՐՏԵԶ (LIVE)
                </h4>
                <button 
                  onClick={() => setActiveTab('map')} 
                  className="text-[10px] text-[#ffd700] font-bold uppercase hover:underline"
                >
                  ԲԱՑԵԼ ՔԱՐՏԵԶԸ ➔
                </button>
              </div>
              <div className="bg-[#121414] h-44 border border-[#4d4732] flex items-center justify-center p-3 text-center">
                <div>
                  <span className="material-symbols-outlined text-4xl text-[#ffd700] mb-1">map</span>
                  <p className="font-['Archivo_Narrow'] text-xs font-bold uppercase text-[#e2e2e2]">
                    12,450 ԿԳ ՄԱՔՐՎԱԾ ԱՂԲ
                  </p>
                  <p className="text-[10px] text-[#d0c6ab] mt-1">7 ԱԿՏԻՎ ԹԱՂԱՄԱՍԵՐՈՒՄ</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Floating Pitch Presentation Button */}
      <button
        onClick={() => {
          soundFX.playClick();
          setIsPitchOpen(true);
        }}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 bg-[#ffd700] text-[#1a1a1a] p-3 rounded-full border-2 border-white shadow-[0_0_20px_rgba(255,215,0,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
        title="Նախագծի Պրեզենտացիա"
      >
        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          lightbulb
        </span>
      </button>

      {/* Modals */}
      <ScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />

      <PitchGuideModal
        isOpen={isPitchOpen}
        onClose={() => setIsPitchOpen(false)}
      />

      <ReportExhibitModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onAddExhibit={handleAddExhibit}
        districts={districts}
      />

      {/* Mobile Bottom Navigation Bar (Hidden on Desktop md:hidden) */}
      <div className="md:hidden">
        <BottomNav
          activeTab={activeTab}
          onChangeTab={setActiveTab}
        />
      </div>
    </div>
  );
}
