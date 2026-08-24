import React, { useEffect, useRef, useState } from 'react';
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
import CleanVerificationModal from './components/CleanVerificationModal';
import PendingVerificationsModal from './components/PendingVerificationsModal';
import RewardsStoreModal from './components/RewardsStoreModal';
import ThemeSelectorModal from './components/ThemeSelectorModal';
import { initialExhibits, initialDistricts } from './data/exhibits';
import { initialQuests } from './data/quests';
import { applyTheme, getStoredTheme } from './utils/themes';
import { soundFX } from './utils/audioFX';
import { readJson, readNumber, readString, writeJson, writeStorage } from './utils/storage';


const defaultUser = {
  name: 'Անի Սարգսյան',
  id: 'YR-USR-0924',
  email: 'demo@yerevanpulse.am',
  district: 'Կենտրոն',
  level: 4,
  points: 850,
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJSdFTmOPkvDaEO4y292rWxM574-584MJGI6BJRBkCjytZUExR3P9IdCqTxqWHH2T-r4brj_93V_c4vtZsNqNFYRE1tdd1MKa2V7lNLpbsQ-anh2iWquqgXSiaW47JWLQUeFEsIqWIsOCzg3SkrXYxPABAd4bUCBA-B8jVHcq73-5GYHFj7r8-GTj3hiySNpEvkkkrth4k8hrrQ-nw1vCmrwg3iyTgYOCtKQZCAMBUUgiNG65H0N8'
};
const guestUser = {  name: 'Հյուր',  id: 'guest',  email: '',  district: 'Կենտրոն',  level: 1,  points: 0,  isGuest: true,  avatar: '/logo.png'};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentLang, setCurrentLang] = useState(() => {
    return readString('yp_lang', 'hy');
  });

  const [exhibits, setExhibits] = useState(() => {
    return readJson('yp_exhibits', initialExhibits);
  });

  const [districts, setDistricts] = useState(() => {
    return readJson('yp_districts', initialDistricts);
  });

  const [userPoints, setUserPoints] = useState(() => {
    return readNumber('yp_points', 0);
  });

  const [currentUser, setCurrentUser] = useState(() => {
    return { ...defaultUser, ...readJson('yp_current_user', {}) };
  });

  const [quests, setQuests] = useState(() => {
    return readJson('yp_quests', initialQuests);
  });

  const [currentTheme, setCurrentTheme] = useState(() => {
    return getStoredTheme();
  });

  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isRewardsStoreOpen, setIsRewardsStoreOpen] = useState(false);

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const cleaningIdsRef = useRef(new Set());

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPitchOpen, setIsPitchOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  useEffect(() => {
    writeJson('yp_exhibits', exhibits);
  }, [exhibits]);

  useEffect(() => {
    writeJson('yp_districts', districts);
  }, [districts]);

  useEffect(() => {
    writeJson('yp_quests', quests);
  }, [quests]);

  useEffect(() => {
    writeStorage('yp_points_' + currentUser.id, userPoints.toString());
  }, [userPoints, currentUser.id]);

  useEffect(() => {
    writeStorage('yp_lang', currentLang);
  }, [currentLang]);

  useEffect(() => {
    writeJson('yp_current_user', currentUser);
  }, [currentUser]);

  // Quest progress increment helper
  const incrementQuestProgress = (questId) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id !== questId) return q;
        const nextCurrent = q.current + 1;
        const isNowCompleted = nextCurrent >= q.target;
        return {
          ...q,
          current: nextCurrent,
          completed: isNowCompleted
        };
      })
    );
  };

  const handleClaimQuestReward = (questId, rewardPts) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === questId ? { ...q, claimed: true } : q))
    );
    setUserPoints((prev) => prev + rewardPts);
  };

  const handleDeductPoints = (pts) => {
    setUserPoints((prev) => Math.max(0, prev - pts));
  };

  const [cleanModalExhibit, setCleanModalExhibit] = useState(null);
  const [isPendingAdminModalOpen, setIsPendingAdminModalOpen] = useState(false);
  const [submissionToast, setSubmissionToast] = useState(null);

  const toggleLanguage = () => {
    setCurrentLang((prev) => (prev === 'hy' ? 'en' : 'hy'));
  };

  // Called when user clicks "Clean / ՄԱՔՐԵԼ" on any exhibit -> Opens photo upload modal
  const handleCleanExhibit = (exhibitId) => {
    const target = exhibits.find((e) => e.id === exhibitId);
    if (!target) return;

    if (target.cleaned) return;

    soundFX.playClick();
    setCleanModalExhibit(target);
  };

  // Called when user submits proof photo & notes from CleanVerificationModal
  const handleSubmitCleanProof = ({ exhibitId, photoUrl, notes }) => {
    setExhibits((prev) =>
      prev.map((e) =>
        e.id === exhibitId
          ? {
              ...e,
              pendingVerification: true,
              proofImage: photoUrl,
              proofNotes: notes,
              submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          : e
      )
    );

    incrementQuestProgress('q1');

    setSubmissionToast(
      currentLang === 'hy'
        ? '⏳ Լուսանկարն ուղարկված է հաստատման: Ադմինիստրատորի ստուգումից հետո կստանաք միավորները:'
        : '⏳ Photo proof submitted for verification! Points will be awarded upon approval.'
    );

    setTimeout(() => {
      setSubmissionToast(null);
    }, 4500);
  };

  // Called when Admin / Curator approves the clean submission -> Grants points & triggers victory animation
  const handleApproveClean = (exhibitId) => {
    if (cleaningIdsRef.current.has(exhibitId)) return;

    const target = exhibits.find((e) => e.id === exhibitId);
    if (!target) return;

    cleaningIdsRef.current.add(exhibitId);

    setExhibits((prev) =>
      prev.map((e) =>
        e.id === exhibitId
          ? {
              ...e,
              cleaned: true,
              pendingVerification: false,
              cleanedBy: currentUser.name,
              cleanedAt: new Date().toISOString()
            }
          : e
      )
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

    soundFX.playSuccess();

    // Confetti celebration
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#00f5d4', '#ffc700', '#ffffff', '#78dc77', '#ff007a'],
    });
  };

  // Called when Admin rejects a clean submission
  const handleRejectClean = (exhibitId) => {
    setExhibits((prev) =>
      prev.map((e) =>
        e.id === exhibitId
          ? {
              ...e,
              pendingVerification: false,
              proofImage: null,
              proofNotes: ''
            }
          : e
      )
    );
  };

  const handleAddExhibit = (newExhibit) => {
    setExhibits((prev) => [newExhibit, ...prev]);
    incrementQuestProgress('q2');

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
    const normalizedCode = exhibitCode.trim().toLowerCase();
    const target = exhibits.find((e) => e.code.toLowerCase() === normalizedCode);

    if (target) {
      handleCleanExhibit(target.id);
      setActiveTab('exhibits');
    }
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setUserPoints(readNumber("yp_points_" + user.id, 0));
  };

  const handleLogout = () => {
    setUserPoints(0);
    setCurrentUser(guestUser);
    setIsAuthOpen(false);
  };

  const cleanedCount = exhibits.filter((e) => e.cleaned).length;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col font-['Montserrat'] selection:bg-[var(--primary-gold)] selection:text-black transition-colors duration-300">
      {/* Universal Top Navigation Bar */}
      <Header
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenRewards={() => setIsRewardsStoreOpen(true)}
        onOpenTheme={() => setIsThemeModalOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
        currentLang={currentLang}
        onToggleLang={toggleLanguage}
      />

      {/* Main Content Layout Wrapper (Desktop Full Screen Grid vs Mobile Viewport) */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto px-3 sm:px-6 lg:px-10 xl:px-12 py-4 pb-24 lg:py-6 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Active Tab Content Column (Full width on Mobile, 8 cols on Laptop, 9 cols on Desktop) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {activeTab === 'home' && (
              <HomeView
                onOpenScanner={() => setIsScannerOpen(true)}
                onOpenReport={() => setIsReportOpen(true)}
                onCleanExhibit={handleCleanExhibit}
                onChangeTab={setActiveTab}
                exhibits={exhibits}
                districts={districts}
                quests={quests}
                onClaimQuestReward={handleClaimQuestReward}
                currentLang={currentLang}
              />
            )}

            {activeTab === 'exhibits' && (
              <ExhibitsView
                exhibits={exhibits}
                onCleanExhibit={handleCleanExhibit}
                onOpenScanner={() => setIsScannerOpen(true)}
                onOpenReport={() => setIsReportOpen(true)}
                currentLang={currentLang}
              />
            )}

            {activeTab === 'map' && (
              <MapView
                exhibits={exhibits}
                districts={districts}
                onSelectExhibit={() => setActiveTab('exhibits')}
                onCleanExhibit={handleCleanExhibit}
                currentLang={currentLang}
              />
            )}

            {activeTab === 'ranks' && (
              <RanksView
                districts={districts}
                userPoints={userPoints}
                currentUser={currentUser}
                onOpenScanner={() => setIsScannerOpen(true)}
                currentLang={currentLang}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileView
                userPoints={userPoints}
                cleanedCount={cleanedCount}
                currentUser={currentUser}
                currentLang={currentLang}
              />
            )}
          </div>

          {/* Desktop Right Sidebar Widget Column (Sticky Sidebar, 4 cols on Laptop, 3 cols on Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 space-y-6 sticky top-20">
            {/* User Profile Card Widget */}
            <div className="museum-label-active p-5 space-y-4 shadow-2xl border-2 border-[#ffc700]">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Yerevan Pulse" className="h-10 w-auto border border-[#ffc700] p-0.5 bg-black rounded" />
                <div>
                  <h3 className="font-['Outfit'] text-sm font-black text-[#ffc700] uppercase tracking-wide">
                    YEREVAN PULSE DASHBOARD
                  </h3>
                  <span className="text-[10px] font-mono text-gray-300">
                    {currentUser.name} ({currentUser.district})
                  </span>
                </div>
              </div>

              <div className="bg-[#121620] p-3 border border-[#ffc700]/30 flex justify-between items-center text-xs rounded">
                <span className="text-gray-300">
                  {currentLang === 'hy' ? 'ՎԱՍՏԱԿԱԾ ՄԻԱՎՈՐՆԵՐ․' : 'EARNED POINTS:'}
                </span>
                <span className="font-['Outfit'] font-black text-[#ffc700] text-sm">
                  {currentUser.points + userPoints} PTS
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => { soundFX.playScanChirp(); setIsScannerOpen(true); }}
                  className="w-full btn-primary-glow py-3 text-xs flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">qr_code_scanner</span>
                  <span>{currentLang === 'hy' ? '⚡ ՍԿԱՆԱՎՈՐԵԼ ՑՈՒՑԱՆՄՈՒՇ' : '⚡ SCAN EXHIBIT'}</span>
                </button>

                <button
                  onClick={() => { soundFX.playClick(); setIsReportOpen(true); }}
                  className="w-full bg-[#121620] text-[#00f5d4] border border-[#00f5d4]/60 hover:bg-[#00f5d4] hover:text-[#0b0e14] py-2.5 font-['Archivo_Narrow'] text-xs font-bold uppercase transition-all rounded"
                >
                  {currentLang === 'hy' ? '+ ԱՎԵԼԱՑՆԵԼ ՆՈՐ ՑՈՒՑԱՆՄՈՒՇ' : '+ REPORT NEW EXHIBIT'}
                </button>
              </div>
            </div>

            {/* Live Pollution Map Mini Preview */}
            <div className="museum-label p-4 space-y-3 shadow-xl">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <h4 className="font-['Archivo_Narrow'] text-xs font-bold text-[#e2e2e2] uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>{currentLang === 'hy' ? 'ԵՐԵՎԱՆԻ ՔԱՐՏԵԶ (LIVE)' : 'YEREVAN MAP (LIVE)'}</span>
                </h4>
                <button 
                  onClick={() => { soundFX.playClick(); setActiveTab('map'); }} 
                  className="text-[10px] text-[#ffc700] font-bold uppercase hover:underline"
                >
                  {currentLang === 'hy' ? 'ԲԱՑԵԼ ՔԱՐՏԵԶԸ ➔' : 'OPEN MAP ➔'}
                </button>
              </div>
              <div 
                onClick={() => { soundFX.playClick(); setActiveTab('map'); }}
                className="bg-[#0b0e14] h-48 border border-[#ffc700]/30 rounded flex items-center justify-center p-3 text-center cursor-pointer hover:border-[#ffc700] transition-all relative overflow-hidden group"
              >
                <div className="z-10">
                  <span className="material-symbols-outlined text-4xl text-[#ffc700] mb-1 animate-pulse">map</span>
                  <p className="font-['Outfit'] text-sm font-black text-white uppercase tracking-wider">
                    12,450 ԿԳ ՄԱՔՐՎԱԾ ԱՂԲ
                  </p>
                  <p className="text-[10px] font-mono text-[#00f5d4] mt-1">12 ԱԿՏԻՎ ԹԱՂԱՄԱՍԵՐՈՒՄ</p>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(#ffc700_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity" />
              </div>
            </div>

            {/* Quick Live Civic Activity Feed */}
            <div className="museum-label p-4 space-y-3 shadow-xl">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <h4 className="font-['Archivo_Narrow'] text-xs font-bold text-[#e2e2e2] uppercase">
                  {currentLang === 'hy' ? '⚡ LIVE ԳՈՐԾՈՂՈՒԹՅՈՒՆՆԵՐ' : '⚡ LIVE CIVIC FEED'}
                </h4>
                <span className="text-[10px] font-mono text-[#00f5d4]">REAL-TIME</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-[#0b0e14] border border-white/10 rounded flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🍾</span>
                    <div>
                      <div className="font-bold text-white text-[11px]">YVN-501 Մաքրվեց</div>
                      <div className="text-[9px] font-mono text-gray-400">Կենտրոն • 50 PTS</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400">✓ DONE</span>
                </div>

                <div className="p-2.5 bg-[#0b0e14] border border-white/10 rounded flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">📱</span>
                    <div>
                      <div className="font-bold text-white text-[11px]">YVN-102 Ավելացվեց</div>
                      <div className="text-[9px] font-mono text-gray-400">Արաբկիր • 80 PTS</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-[#ff007a]">NEW</span>
                </div>
              </div>
            </div>

            {/* Admin Curator Pending Verification Button */}
            <div className="museum-label p-4 space-y-3 shadow-xl border-l-4 border-l-[#00f5d4]">
              <div className="flex justify-between items-center">
                <span className="font-['Outfit'] text-xs font-bold text-white uppercase flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#00f5d4]">verified</span>
                  <span>{currentLang === 'hy' ? '⏳ ՀԱՍՏԱՏՄԱՆ ՍՊԱՍՈՂ ՄԱՔՐՈՒՄՆԵՐ' : '⏳ PENDING CLEANUPS'}</span>
                </span>
                <span className="bg-[#00f5d4] text-black font-bold text-[10px] px-2 py-0.5 rounded-full font-mono">
                  {exhibits.filter(e => e.pendingVerification).length}
                </span>
              </div>

              <button
                onClick={() => { soundFX.playClick(); setIsPendingAdminModalOpen(true); }}
                className="w-full bg-[#121620] border border-[#00f5d4] text-[#00f5d4] hover:bg-[#00f5d4] hover:text-black py-2 text-xs font-['Archivo_Narrow'] font-bold uppercase transition-all rounded flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">admin_panel_settings</span>
                <span>{currentLang === 'hy' ? 'ԲԱՑԵԼ ԱԴՄԻՆ ՎԱՀԱՆԱԿԸ' : 'OPEN CURATOR PANEL'}</span>
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* Submission Toast Banner */}
      {submissionToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#0b0e14] text-[#00f5d4] border-2 border-[#00f5d4] px-5 py-3 rounded-lg font-['Outfit'] font-bold text-xs sm:text-sm uppercase shadow-[0_0_30px_rgba(0,245,212,0.4)] animate-bounce flex items-center gap-2 max-w-md text-center">
          <span className="material-symbols-outlined text-xl text-[#00f5d4]">task_alt</span>
          <span>{submissionToast}</span>
        </div>
      )}

      {/* Floating Pitch Presentation Button */}
      <button
        onClick={() => {
          soundFX.playClick();
          setIsPitchOpen(true);
        }}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 bg-[#ffd700] text-[#1a1a1a] p-3.5 rounded-full border-2 border-white shadow-[0_0_25px_rgba(255,215,0,0.5)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        title="Նախագծի Պրեզենտացիա (Pitch Deck)"
      >
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          lightbulb
        </span>
      </button>

      {/* Modals */}
      <ScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
        exhibits={exhibits}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLogout={handleLogout}
        onLoginSuccess={handleAuthSuccess}
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
        exhibits={exhibits}
        currentUser={currentUser}
      />

      <CleanVerificationModal
        exhibit={cleanModalExhibit}
        isOpen={!!cleanModalExhibit}
        onClose={() => setCleanModalExhibit(null)}
        onSubmitProof={handleSubmitCleanProof}
        currentLang={currentLang}
      />

      <PendingVerificationsModal
        isOpen={isPendingAdminModalOpen}
        onClose={() => setIsPendingAdminModalOpen(false)}
        exhibits={exhibits}
        onApproveClean={handleApproveClean}
        onRejectClean={handleRejectClean}
        currentLang={currentLang}
      />

      <RewardsStoreModal
        isOpen={isRewardsStoreOpen}
        onClose={() => setIsRewardsStoreOpen(false)}
        userPoints={currentUser.points + userPoints}
        onDeductPoints={handleDeductPoints}
        currentLang={currentLang}
      />

      <ThemeSelectorModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
        currentLang={currentLang}
      />

      {/* Mobile Bottom Navigation Bar (Hidden on Desktop md:hidden) */}
      <div className="lg:hidden">
        <BottomNav
          activeTab={activeTab}
          onChangeTab={setActiveTab}
        />
      </div>
    </div>
  );
}
