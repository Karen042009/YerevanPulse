import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/audioFX';
import { translations } from '../data/translations';
import QuestsWidget from './QuestsWidget';

export default function HomeView({
  onOpenScanner,
  onOpenReport,
  onCleanExhibit,
  onChangeTab,
  exhibits = [],
  districts = [],
  quests = [],
  onClaimQuestReward,
  currentLang = 'hy'
}) {
  const t = translations[currentLang] || translations.hy;
  const isArmenian = currentLang === 'hy';

  // Live Yerevan time clock
  const [timeString, setTimeString] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString(isArmenian ? 'hy-AM' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isArmenian]);

  // Radar Pulse interaction state
  const [pulseCount, setPulseCount] = useState(72);
  const [pulseActive, setPulseActive] = useState(false);

  const handlePulseClick = () => {
    soundFX.playScanChirp();
    setPulseActive(true);
    setPulseCount((prev) => prev + 1);
    setTimeout(() => setPulseActive(false), 800);
  };

  // Interactive Waste Decomposition Matrix state
  const decayItems = [
    {
      id: 'glass',
      name: isArmenian ? 'Ապակե Շիշ' : 'Glass Bottle',
      icon: '🍾',
      years: 1000000,
      yearsLabel: isArmenian ? '1,000,000 ՏԱՐԻ' : '1,000,000 YEARS',
      severity: 'critical',
      color: '#ff007a',
      desc: isArmenian
        ? 'Ապակին գրեթե չի քայքայվում բնության մեջ։ Ջարդված բեկորները վտանգ են ներկայացնում քաղաքացիների և կենդանիների համար։'
        : 'Glass barely decomposes in nature. Shattered shards pose acute safety hazards to citizens and fauna.'
    },
    {
      id: 'vape',
      name: isArmenian ? 'Էլեկտրոնային Սիգարետ' : 'Disposable Vape',
      icon: '📱',
      years: 500,
      yearsLabel: isArmenian ? '500 ՏԱՐԻ' : '500 YEARS',
      severity: 'critical',
      color: '#ffc700',
      desc: isArmenian
        ? 'Լիթիում-իոնային մարտկոցը և պլաստիկ կորպուսը հողի մեջ արտանետում են ծանր մետաղներ և թունավոր քիմիկատներ։'
        : 'Lithium-ion batteries and plastic casing leak heavy metals and toxic chemicals into urban soil.'
    },
    {
      id: 'plastic',
      name: isArmenian ? 'Պլաստիկ Շիշ' : 'Plastic Bottle',
      icon: '🧴',
      years: 450,
      yearsLabel: isArmenian ? '450 ՏԱՐԻ' : '450 YEARS',
      severity: 'high',
      color: '#ffc700',
      desc: isArmenian
        ? 'Փոշիացման ընթացքում վերածվում է միկրոպլաստիկի՝ աղտոտելով Երևանի ջրային ռեսուրսները և հողը։'
        : 'Breaks down into hazardous microplastics, contaminating Yerevan water channels and urban soil.'
    },
    {
      id: 'cup',
      name: isArmenian ? 'Սուրճի Բաժակ' : 'Paper Coffee Cup',
      icon: '☕',
      years: 30,
      yearsLabel: isArmenian ? '30 ՏԱՐԻ' : '30 YEARS',
      severity: 'medium',
      color: '#00f5d4',
      desc: isArmenian
        ? 'Պոլիէթիլենային ներքին պաշտպանիչ շերտի պատճառով սովորական թղթի պես արագ չի քայքայվում։'
        : 'Internal polyethylene lining prevents normal paper degradation, remaining in landfills for decades.'
    },
    {
      id: 'butt',
      name: isArmenian ? 'Ծխախոտի Ֆիլտր' : 'Cigarette Butt',
      icon: '🚬',
      years: 12,
      yearsLabel: isArmenian ? '12 ՏԱՐԻ' : '12 YEARS',
      severity: 'medium',
      color: '#00f5d4',
      desc: isArmenian
        ? 'Յուրաքանչյուր ֆիլտր պարունակում է ացետատային ցելյուլոզ և թունավոր նյութեր, որոնք աղտոտում են անձրևաջրերը։'
        : 'Contains cellulose acetate and hazardous toxins that pollute city rainwater runoff.'
    }
  ];

  const [selectedDecay, setSelectedDecay] = useState(decayItems[0]);

  // Derived metrics from exhibits & districts props
  const totalExhibitsCount = exhibits.length;
  const activeExhibits = exhibits.filter((e) => !e.cleaned);
  const activeCount = activeExhibits.length;
  const cleanedCount = exhibits.filter((e) => e.cleaned).length;
  const cleanRate = totalExhibitsCount > 0 ? Math.round((cleanedCount / totalExhibitsCount) * 100) : 75;

  // Urgent exhibits for featured list
  const urgentExhibits = activeExhibits.slice(0, 3);

  // Top 3 districts
  const topDistricts = [...districts].sort((a, b) => b.points - a.points).slice(0, 3);

  return (
    <div className="space-y-10 px-2 md:px-0 py-4 animate-fadeIn">
      {/* Live System Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-[var(--surface-1)]/90 border border-[var(--primary-gold)]/40 rounded-lg backdrop-blur-md shadow-[0_0_20px_var(--primary-gold-glow)] transition-colors">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-[var(--primary-gold)] animate-ping absolute" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary-gold)] relative z-10" />
          </div>
          <span className="font-['Space_Grotesk'] text-xs font-extrabold tracking-widest text-[var(--primary-gold)] uppercase">
            LIVE CIVIC MONITORING V2.5
          </span>
          <span className="hidden sm:inline text-[var(--primary-gold)]/40">|</span>
          <span className="hidden sm:inline font-mono text-xs text-gray-400">
            {isArmenian ? 'ԵՐԵՎԱՆԻ ԺԱՄԱՆԱԿ՝' : 'YEREVAN TIME:'} <span className="text-[var(--accent-cyan)] font-bold">{timeString || '14:10 EVN'}</span>
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-gray-300">
            {isArmenian ? 'ԱԿՏԻՎ HOTSPOT-ՆԵՐ՝' : 'ACTIVE HOTSPOTS:'}{' '}
            <span className="text-[var(--accent-magenta)] font-bold">{activeCount}</span>
          </span>
          <span className="hidden md:inline text-gray-300">
            {isArmenian ? 'ՄԱՔՐՈՒԹՅԱՆ ԻՆԴԵՔՍ՝' : 'CLEAN INDEX:'}{' '}
            <span className="text-[var(--accent-cyan)] font-bold">{cleanRate}%</span>
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[var(--surface-2)] border border-[var(--primary-gold)]/60 rounded-full shadow-[0_0_15px_var(--primary-gold-glow)]">
            <span className="material-symbols-outlined text-[var(--primary-gold)] text-sm animate-pulse">
              sensors
            </span>
            <span className="font-['Space_Grotesk'] text-xs font-bold tracking-widest text-[var(--primary-gold)] uppercase">
              {isArmenian ? 'ՔԱՂԱՔԱՅԻՆ ԷԿՈ-ԱԿՏԻՎԻԶՄ' : 'CIVIC ECO-ACTION PLATFORM'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-['Outfit'] font-black text-white leading-none uppercase tracking-tight break-words">
            {t.hero.title1} <br />
            <span className="text-gradient-gold bg-[var(--surface-1)] px-3 sm:px-4 py-1 sm:py-1.5 border-2 border-[var(--primary-gold)] inline-block mt-2 sm:mt-3 shadow-[0_0_30px_var(--primary-gold-glow)] rounded-sm max-w-full overflow-hidden text-ellipsis">
              {t.hero.title2}
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg font-['Montserrat'] text-gray-300 leading-relaxed max-w-xl border-l-4 border-[var(--primary-gold)] pl-3 sm:pl-4 italic bg-[var(--surface-1)]/60 py-2 rounded-r-md">
            {t.subtitle}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-4">
            <button
              onClick={() => {
                soundFX.playScanChirp();
                onOpenScanner();
              }}
              className="btn-primary-glow px-7 py-4.5 flex items-center justify-center gap-3 group w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-[28px] group-hover:rotate-12 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                qr_code_2
              </span>
              <span className="font-['Archivo_Narrow'] text-lg font-extrabold uppercase tracking-wide">
                {t.hero.findExhibit}
              </span>
            </button>

            {onOpenReport && (
              <button
                onClick={() => {
                  soundFX.playClick();
                  onOpenReport();
                }}
                className="bg-[#10141e] text-[#00f5d4] border-2 border-[#00f5d4] hover:bg-[#00f5d4] hover:text-[#0b0e14] px-6 py-4.5 flex items-center justify-center gap-3 transition-all font-['Archivo_Narrow'] text-lg font-extrabold uppercase tracking-wide shadow-[0_0_20px_rgba(0,245,212,0.2)] rounded-sm w-full sm:w-auto"
              >
                <span className="material-symbols-outlined text-2xl">add_location_alt</span>
                <span>{isArmenian ? '+ ԱՎԵԼԱՑՆԵԼ' : '+ ADD EXHIBIT'}</span>
              </button>
            )}

            <button
              onClick={() => {
                soundFX.playClick();
                onChangeTab('exhibits');
              }}
              className="border-2 border-[#ffc700]/70 text-[#ffc700] hover:bg-[#ffc700] hover:text-[#0b0e14] px-6 py-4.5 flex items-center justify-center gap-3 transition-all font-['Archivo_Narrow'] text-lg font-extrabold uppercase tracking-wide shadow-[0_0_15px_rgba(255,199,0,0.15)] rounded-sm w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-2xl">museum</span>
              <span>{t.nav.exhibits}</span>
            </button>
          </div>
        </div>

        {/* Visual Cyber Pulse Interactive Graphic Box */}
        <div className="lg:col-span-5 relative h-80 lg:h-96 w-full bg-gradient-to-br from-[#121620] via-[#0f131c] to-[#0b0e14] border-2 border-[#ffc700] flex flex-col items-center justify-between p-6 overflow-hidden group shadow-[0_0_40px_rgba(255,199,0,0.2)] rounded-lg">
          <div className="w-full flex items-center justify-between z-10">
            <div className="text-[11px] font-mono text-[#ffc700] bg-[#06080c]/90 px-3 py-1 border border-[#ffc700]/60 rounded">
              SYS-ID: YR-2026-PULSE
            </div>
            <div className="text-[11px] font-mono text-[#00f5d4] bg-[#06080c]/90 px-3 py-1 border border-[#00f5d4]/60 rounded flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00f5d4] animate-ping" />
              <span>{pulseCount} BPM</span>
            </div>
          </div>

          <div className="text-center space-y-4 z-10 my-auto">
            <div
              className={`relative inline-block cursor-pointer group-hover:scale-105 transition-transform ${
                pulseActive ? 'scale-110' : ''
              }`}
              onClick={handlePulseClick}
              title={isArmenian ? 'Սեղմեք իմպուլսը ստուգելու համար' : 'Click to test eco pulse'}
            >
              <div className="w-28 h-28 rounded-full border-2 border-[#ffc700] flex items-center justify-center pulse-radar bg-[#ffc700]/10 hover:bg-[#ffc700]/20 transition-all">
                <span className="material-symbols-outlined text-6xl text-[#ffc700] animate-pulse">
                  ecg
                </span>
              </div>
              {pulseActive && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ffc700] text-black font-mono text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider animate-bounce">
                  PULSE DETECTED
                </div>
              )}
            </div>

            <div>
              <h3 className="font-['Outfit'] text-2xl font-black uppercase text-gradient-gold tracking-wider">
                YEREVAN ECOLOGICAL PULSE
              </h3>
              <p className="font-['Montserrat'] text-xs text-gray-300 max-w-xs mx-auto mt-1">
                {isArmenian
                  ? 'ՔԱՂԱՔԱՅԻՆ ԻՐԱՎԻՃԱԿԻ ՌԵԱԼ-ԺԱՄԱՆԱԿՅԱ ՄՈՆԻՏՈՐԻՆԳ'
                  : 'REAL-TIME URBAN ECOLOGICAL MONITORING'}
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar at bottom of cyber box */}
          <div className="w-full grid grid-cols-3 gap-2 z-10 pt-2 border-t border-[#ffc700]/30 text-center">
            <div>
              <div className="text-[10px] font-mono text-gray-400">CLEAN RATE</div>
              <div className="font-['Outfit'] text-sm font-bold text-[#00f5d4]">{cleanRate}%</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-gray-400">HOTSPOTS</div>
              <div className="font-['Outfit'] text-sm font-bold text-[#ff007a]">{activeCount}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-gray-400">DISTRICTS</div>
              <div className="font-['Outfit'] text-sm font-bold text-[#ffc700]">12/12</div>
            </div>
          </div>

          {/* Cyber Grid Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffc700_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
        </div>
      </section>

      {/* Dynamic Impact Stats Bento Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="museum-label p-5 relative flex flex-col justify-between h-56 group cursor-pointer border-l-4 border-l-[#ffc700]">
          <div className="absolute top-4 right-4 w-12 h-12 bg-[#ffc700]/10 border border-[#ffc700]/40 rounded-xl flex items-center justify-center text-[#ffc700] group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">delete_sweep</span>
          </div>
          <div className="text-xs font-mono text-[#ffc700] uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffc700]" />
            METRIC-01
          </div>
          <div>
            <h3 className="font-['Outfit'] text-3xl lg:text-4xl font-black text-gradient-gold">12,450 ԿԳ</h3>
            <p className="font-['Archivo_Narrow'] text-sm font-bold text-gray-200 mt-1 tracking-wider uppercase">
              {t.stats.cleanedTrash}
            </p>
            <div className="w-full bg-[#0b0e14] h-2 rounded-full mt-3 overflow-hidden border border-[#ffc700]/30">
              <div className="bg-[#ffc700] h-full rounded-full" style={{ width: '83%' }} />
            </div>
            <div className="text-[10px] font-mono text-gray-400 mt-1 text-right">83% OF 15,000 KG TARGET</div>
          </div>
        </div>

        <div className="museum-label p-5 relative flex flex-col justify-between h-56 group cursor-pointer border-l-4 border-l-[#00f5d4]">
          <div className="absolute top-4 right-4 w-12 h-12 bg-[#00f5d4]/10 border border-[#00f5d4]/40 rounded-xl flex items-center justify-center text-[#00f5d4] group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">groups</span>
          </div>
          <div className="text-xs font-mono text-[#00f5d4] uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f5d4]" />
            METRIC-02
          </div>
          <div>
            <h3 className="font-['Outfit'] text-3xl lg:text-4xl font-black text-gradient-cyan">3,200+</h3>
            <p className="font-['Archivo_Narrow'] text-sm font-bold text-gray-200 mt-1 tracking-wider uppercase">
              {t.stats.activeCitizens}
            </p>
            <div className="flex items-center gap-2 mt-3 text-xs text-gray-300 font-mono">
              <span className="px-2 py-0.5 bg-[#00f5d4]/10 text-[#00f5d4] rounded border border-[#00f5d4]/30">
                +145 THIS WEEK
              </span>
            </div>
          </div>
        </div>

        <div className="museum-label p-5 relative flex flex-col justify-between h-56 group cursor-pointer border-l-4 border-l-[#ff007a]">
          <div className="absolute top-4 right-4 w-12 h-12 bg-[#ff007a]/10 border border-[#ff007a]/40 rounded-xl flex items-center justify-center text-[#ff007a] group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">warning</span>
          </div>
          <div className="text-xs font-mono text-[#ff007a] uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff007a]" />
            METRIC-03
          </div>
          <div>
            <h3 className="font-['Outfit'] text-3xl lg:text-4xl font-black text-gradient-magenta">
              {activeCount} / {totalExhibitsCount}
            </h3>
            <p className="font-['Archivo_Narrow'] text-sm font-bold text-gray-200 mt-1 tracking-wider uppercase">
              {t.stats.activeHotspots}
            </p>
            <div className="w-full bg-[#0b0e14] h-2 rounded-full mt-3 overflow-hidden border border-[#ff007a]/30">
              <div
                className="bg-[#ff007a] h-full rounded-full"
                style={{ width: `${totalExhibitsCount > 0 ? (activeCount / totalExhibitsCount) * 100 : 50}%` }}
              />
            </div>
            <div className="text-[10px] font-mono text-gray-400 mt-1 text-right">UNRESOLVED HOTSPOTS</div>
          </div>
        </div>

        <div className="museum-label p-5 relative flex flex-col justify-between h-56 group cursor-pointer border-l-4 border-l-[#10b981]">
          <div className="absolute top-4 right-4 w-12 h-12 bg-[#10b981]/10 border border-[#10b981]/40 rounded-xl flex items-center justify-center text-[#10b981] group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">health_metrics</span>
          </div>
          <div className="text-xs font-mono text-[#10b981] uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
            METRIC-04
          </div>
          <div>
            <h3 className="font-['Outfit'] text-3xl lg:text-4xl font-black text-emerald-400">78 / 100</h3>
            <p className="font-['Archivo_Narrow'] text-sm font-bold text-gray-200 mt-1 tracking-wider uppercase">
              {t.stats.cleanlinessRate}
            </p>
            <div className="w-full bg-[#0b0e14] h-2 rounded-full mt-3 overflow-hidden border border-[#10b981]/30">
              <div className="bg-[#10b981] h-full rounded-full" style={{ width: '78%' }} />
            </div>
            <div className="text-[10px] font-mono text-emerald-400 mt-1 text-right">HIGH IMPACT ZONE</div>
          </div>
        </div>
      </section>

      {/* Daily Eco Quests Section */}
      <section className="pt-2">
        <QuestsWidget
          quests={quests}
          onClaimReward={onClaimQuestReward}
          currentLang={currentLang}
        />
      </section>

      {/* Urgent Exhibits Showcase Section */}
      {urgentExhibits.length > 0 && (
        <section className="space-y-6 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#ff007a] pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#ff007a]/10 rounded flex items-center justify-center border border-[#ff007a]/40">
                <span className="material-symbols-outlined text-[#ff007a] text-2xl animate-pulse">
                  priority_high
                </span>
              </div>
              <div>
                <h2 className="font-['Outfit'] text-2xl md:text-3xl font-black text-white uppercase tracking-wider text-gradient-magenta">
                  {isArmenian ? '🔥 ԱՄԵՆԱՍՈՒՐ ՑՈՒՑԱՆՄՈՒՇՆԵՐԸ' : '🔥 URGENT EXHIBITS'}
                </h2>
                <p className="text-xs font-mono text-gray-400">
                  {isArmenian
                    ? 'Երևանի փողոցներում գտնվող ամենաբարձր քայքայման տևողություն ունեցող աղբը'
                    : 'Litter on Yerevan streets with highest decomposition lifespan'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundFX.playClick();
                onChangeTab('exhibits');
              }}
              className="text-xs font-['Archivo_Narrow'] font-bold text-[#ff007a] uppercase hover:underline flex items-center gap-1 bg-[#ff007a]/10 px-3 py-1.5 border border-[#ff007a]/40 rounded"
            >
              <span>{isArmenian ? 'ՏԵՍՆԵԼ ԲՈԼՈՐԸ' : 'VIEW ALL EXHIBITS'}</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {urgentExhibits.map((exhibit) => (
              <div
                key={exhibit.id}
                className="museum-label p-5 border-l-4 border-l-[#ff007a] flex flex-col justify-between group hover:border-[#ff007a] transition-all relative overflow-hidden"
              >
                <div className="absolute top-3 right-3 text-[10px] font-mono text-[#ff007a] bg-[#05070a] px-2 py-0.5 border border-[#ff007a]/40 rounded">
                  #{exhibit.code}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 bg-[#ff007a]/10 border border-[#ff007a]/30 rounded-lg">
                      {exhibit.icon || '🍾'}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono text-gray-400 uppercase">
                        {isArmenian ? exhibit.district : exhibit.districtEn || exhibit.district}
                      </span>
                      <h4 className="font-['Outfit'] text-lg font-bold text-white leading-tight">
                        {isArmenian ? exhibit.title : exhibit.titleEn || exhibit.title}
                      </h4>
                    </div>
                  </div>

                  <div className="bg-[#090c12] p-3 rounded border border-white/10 text-xs space-y-1.5">
                    <div className="flex justify-between items-center text-gray-300">
                      <span className="font-mono text-[11px] text-gray-400">
                        {isArmenian ? 'ՔԱՅՔԱՅՈՒՄ՝' : 'LIFESPAN:'}
                      </span>
                      <span className="font-bold text-[#ffc700]">
                        {exhibit.lifespanYears >= 1000000
                          ? isArmenian ? '1 ՄԻԼԻՈՆ ՏԱՐԻ' : '1 MILLION YEARS'
                          : `${exhibit.lifespanYears} ${isArmenian ? 'ՏԱՐԻ' : 'YEARS'}`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-gray-300">
                      <span className="font-mono text-[11px] text-gray-400">
                        {isArmenian ? 'ՀԱՍՑԵ՝' : 'LOCATION:'}
                      </span>
                      <span className="truncate max-w-[150px] font-mono text-[11px] text-gray-200">
                        {isArmenian ? exhibit.location : exhibit.locationEn || exhibit.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-['Montserrat'] text-gray-300 italic line-clamp-2 border-l-2 border-[#ff007a]/50 pl-2">
                    "{isArmenian ? exhibit.quote : exhibit.quoteEn || exhibit.quote}"
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between gap-2">
                  {exhibit.pendingVerification ? (
                    <div className="bg-[#00f5d4]/10 text-[#00f5d4] border border-[#00f5d4]/40 py-2 px-3 text-xs flex-1 flex items-center justify-center gap-1.5 font-bold font-mono rounded animate-pulse">
                      <span className="material-symbols-outlined text-base">schedule</span>
                      <span>{isArmenian ? '⏳ ԳՆԱՑ ՀԱՍՏԱՏՄԱՆ' : '⏳ PENDING'}</span>
                    </div>
                  ) : onCleanExhibit && (
                    <button
                      onClick={() => onCleanExhibit(exhibit.id)}
                      className="btn-primary-glow py-2 px-3 text-xs flex-1 flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-base">cleaning_services</span>
                      <span>
                        {isArmenian ? `ՄԱՔՐԵԼ (+${exhibit.points})` : `CLEAN (+${exhibit.points})`}
                      </span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      soundFX.playClick();
                      onChangeTab('exhibits');
                    }}
                    className="p-2 border border-white/20 text-gray-300 hover:text-white hover:border-[#ffc700] rounded transition-colors"
                    title={isArmenian ? 'Դիտել ցուցանմուշը' : 'View Exhibit'}
                  >
                    <span className="material-symbols-outlined text-base">visibility</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interactive Waste Decomposition Matrix / Calculator */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b-2 border-[#00f5d4] pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00f5d4]/10 rounded flex items-center justify-center border border-[#00f5d4]/40">
              <span className="material-symbols-outlined text-[#00f5d4] text-2xl">
                hourglass_bottom
              </span>
            </div>
            <div>
              <h2 className="font-['Outfit'] text-2xl md:text-3xl font-black text-white uppercase tracking-wider text-gradient-cyan">
                {isArmenian ? '⏳ ՔԱՅՔԱՅՄԱՆ ԺԱՄԱՆԱԿԱՑՈՒՅՑ (DECOMPOSITION MATRIX)' : '⏳ DECOMPOSITION MATRIX'}
              </h2>
              <p className="text-xs font-mono text-gray-400">
                {isArmenian
                  ? 'Ինչքա՞ն ժամանակ է աղբը մնում Երևանի փողոցներում, եթե չմաքրենք'
                  : 'How long waste stays on Yerevan streets if left uncleaned'}
              </p>
            </div>
          </div>
        </div>

        {/* Matrix Item Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {decayItems.map((item) => {
            const isSelected = selectedDecay.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundFX.playClick();
                  setSelectedDecay(item);
                }}
                className={`p-3 rounded-lg border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#181e2b] border-[#ffc700] shadow-[0_0_20px_rgba(255,199,0,0.3)] scale-105'
                    : 'bg-[#10141e] border-white/10 hover:border-white/30 text-gray-400 hover:text-white'
                }`}
              >
                <span className="text-3xl">{item.icon}</span>
                <span className="font-['Outfit'] text-xs font-bold text-white truncate w-full">
                  {item.name}
                </span>
                <span className="font-mono text-[10px] font-extrabold text-[#ffc700]">
                  {item.yearsLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Decomposition Detail Panel */}
        <div className="museum-label p-6 border-l-4 border-l-[#ffc700] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl p-3 bg-[#ffc700]/10 border border-[#ffc700]/30 rounded-xl">
                {selectedDecay.icon}
              </span>
              <div>
                <span className="text-xs font-mono text-[#ffc700] uppercase tracking-widest">
                  {isArmenian ? 'ԱՂՏՈՏՎԱԾՈՒԹՅԱՆ ԱՐՏԵՖԱԿՏ' : 'POLLUTION ARTIFACT'}
                </span>
                <h3 className="font-['Outfit'] text-2xl font-black text-white">
                  {selectedDecay.name}
                </h3>
              </div>
            </div>

            <div className="bg-[#090c12] px-5 py-3 border border-[#ffc700]/40 rounded-lg text-right">
              <div className="text-[10px] font-mono text-gray-400 uppercase">
                {isArmenian ? 'ՔԱՅՔԱՅՄԱՆ ՏԵՎՈՂՈՒԹՅՈՒՆ' : 'DECOMPOSITION DURATION'}
              </div>
              <div className="font-['Outfit'] text-3xl font-black text-gradient-gold">
                {selectedDecay.yearsLabel}
              </div>
            </div>
          </div>

          <p className="font-['Montserrat'] text-sm text-gray-300 leading-relaxed bg-[#0b0e14] p-4 rounded-lg border border-white/10">
            {selectedDecay.desc}
          </p>

          {/* Comparison Scale */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-mono text-gray-400">
              <span>{isArmenian ? 'ՄԱՐԴՈՒ ՄԻՋԻՆ ԿՅԱՆՔ (80 ՏԱՐԻ)' : 'HUMAN LIFESPAN (80 YRS)'}</span>
              <span>{isArmenian ? 'ԵՐԵՎԱՆԻ ՊԱՏՄՈՒԹՅՈՒՆ (2808 ՏԱՐԻ)' : 'YEREVAN AGE (2808 YRS)'}</span>
              <span className="text-[#ff007a] font-bold">{selectedDecay.yearsLabel}</span>
            </div>
            <div className="w-full bg-[#0b0e14] h-3 rounded-full overflow-hidden border border-white/20 flex">
              <div className="bg-[#00f5d4] h-full" style={{ width: '5%' }} title="Human lifespan" />
              <div className="bg-[#ffc700] h-full" style={{ width: '15%' }} title="Yerevan history" />
              <div className="bg-[#ff007a] h-full flex-1" title="Waste lifespan" />
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Interactive Methodology */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center gap-3 border-b-2 border-[#ffc700] pb-3 shadow-[0_4px_15px_-5px_rgba(255,199,0,0.1)]">
          <div className="w-10 h-10 bg-[#ffc700]/10 rounded flex items-center justify-center border border-[#ffc700]/40">
            <span className="material-symbols-outlined text-[#ffc700] text-2xl">model_training</span>
          </div>
          <div>
            <h2 className="font-['Outfit'] text-2xl md:text-3xl font-black text-white uppercase tracking-wider text-gradient-gold">
              {isArmenian ? '⚡ ԻՆՉՊԵՍ Է ԱՇԽԱՏՈՒՄ (CONCEPT)' : '⚡ HOW IT WORKS'}
            </h2>
            <p className="text-xs font-mono text-gray-400">
              {isArmenian
                ? 'Քաղաքացիական ակտիվության 3 քայլերը՝ աղբը թանգարանային ցուցանմուշ դարձնելու համար'
                : '3-step civic protocol for turning litter into museum exhibits'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => {
              soundFX.playClick();
              onOpenScanner();
            }}
            className="museum-label p-6 border-l-4 border-l-[#ffc700] cursor-pointer group hover:bg-[#ffc700]/5 transition-all h-full flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-[#ffc700]/10 border border-[#ffc700] rounded-xl flex items-center justify-center text-[#ffc700] mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,199,0,0.2)]">
                <span className="material-symbols-outlined text-3xl">my_location</span>
              </div>
              <h4 className="font-['Outfit'] text-xl font-bold text-white mb-2 uppercase group-hover:text-[#ffc700] transition-colors">
                {isArmenian ? '1. ՖԻՔՍԵԼ' : '1. DOCUMENT'}
              </h4>
              <p className="font-['Montserrat'] text-sm text-gray-300 leading-relaxed">
                {isArmenian
                  ? 'Գտեք քաղաքային աղբ (օր.՝ պլաստիկ շիշ): Սկանավորեք և գրանցեք այն որպես թանգարանային ցուցանմուշ՝ ավելացնելով բազայում:'
                  : 'Find an urban friction point. Scan and log it into the public record as an official museum exhibit.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-2 text-xs font-['Archivo_Narrow'] font-bold text-[#ffc700] uppercase">
              <span>{isArmenian ? 'ՍԿԱՆԱՎՈՐԵԼ QR ➔' : 'SCAN QR NOW ➔'}</span>
            </div>
          </div>

          <div
            onClick={() => {
              soundFX.playClick();
              onChangeTab('exhibits');
            }}
            className="museum-label p-6 border-l-4 border-l-[#00f5d4] cursor-pointer group hover:bg-[#00f5d4]/5 transition-all h-full flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-[#00f5d4]/10 border border-[#00f5d4] rounded-xl flex items-center justify-center text-[#00f5d4] mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,245,212,0.2)]">
                <span className="material-symbols-outlined text-3xl">campaign</span>
              </div>
              <h4 className="font-['Outfit'] text-xl font-bold text-white mb-2 uppercase group-hover:text-[#00f5d4] transition-colors">
                {isArmenian ? '2. ՑՈՒՑԱԴՐԵԼ' : '2. EXPOSE'}
              </h4>
              <p className="font-['Montserrat'] text-sm text-gray-300 leading-relaxed">
                {isArmenian
                  ? 'Առարկան ստանում է թանգարանային ցուցանակ՝ իր քայքայման տևողությամբ: Անփութությունը դրվում է ցուցադրության բոլորի համար:'
                  : 'The object is framed in a museum label with its decomposition lifespan plaque. Neglect is put on display.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-2 text-xs font-['Archivo_Narrow'] font-bold text-[#00f5d4] uppercase">
              <span>{isArmenian ? 'ՑՈՒՑԱՍՐԱՀԻ ՑՈՒՑԱՆՄՈՒՇՆԵՐԸ ➔' : 'VIEW EXHIBITS ➔'}</span>
            </div>
          </div>

          <div
            onClick={() => {
              soundFX.playClick();
              onChangeTab('ranks');
            }}
            className="museum-label p-6 border-l-4 border-l-[#ff007a] cursor-pointer group hover:bg-[#ff007a]/5 transition-all h-full flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-[#ff007a]/10 border border-[#ff007a] rounded-xl flex items-center justify-center text-[#ff007a] mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,0,122,0.2)]">
                <span className="material-symbols-outlined text-3xl">build</span>
              </div>
              <h4 className="font-['Outfit'] text-xl font-bold text-white mb-2 uppercase group-hover:text-[#ff007a] transition-colors">
                {isArmenian ? '3. ՄԱՔՐԵԼ' : '3. RESOLVE'}
              </h4>
              <p className="font-['Montserrat'] text-sm text-gray-300 leading-relaxed">
                {isArmenian
                  ? 'Ակտիվացրեք քաղաքացիական ուժը: Մաքրեք ցուցանմուշները, վաստակեք միավորներ և բարձրացրեք ձեր թաղամասի վարկանիշը:'
                  : 'Mobilize civic action. Clean exhibits, earn Eco-Pulse points, and elevate your district leaderboard position.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-2 text-xs font-['Archivo_Narrow'] font-bold text-[#ff007a] uppercase">
              <span>{isArmenian ? 'ԹԱՂԱՄԱՍԵՐԻ ՎԱՐԿԱՆԻՇՆԵՐԸ ➔' : 'CHECK RANKS ➔'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Top Districts Leaderboard Snapshot */}
      {topDistricts.length > 0 && (
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b-2 border-[#ffc700] pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#ffc700]/10 rounded flex items-center justify-center border border-[#ffc700]/40">
                <span className="material-symbols-outlined text-[#ffc700] text-2xl">
                  leaderboard
                </span>
              </div>
              <div>
                <h2 className="font-['Outfit'] text-2xl md:text-3xl font-black text-white uppercase tracking-wider text-gradient-gold">
                  {isArmenian ? '🏆 ԱՌԱՋԱՏԱՐ ԹԱՂԱՄԱՍԵՐԸ' : '🏆 TOP DISTRICT STANDINGS'}
                </h2>
                <p className="text-xs font-mono text-gray-400">
                  {isArmenian
                    ? 'Երևանի ամենաակտիվ էկո-թաղամասերը'
                    : 'Most active eco districts in Yerevan'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundFX.playClick();
                onChangeTab('ranks');
              }}
              className="text-xs font-['Archivo_Narrow'] font-bold text-[#ffc700] uppercase hover:underline flex items-center gap-1 bg-[#ffc700]/10 px-3 py-1.5 border border-[#ffc700]/40 rounded"
            >
              <span>{isArmenian ? 'ԱՄԲՈՂՋ ՎԱՐԿԱՆԻՇՆԵՐԸ' : 'ALL LEADERBOARDS'}</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topDistricts.map((district, idx) => {
              const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉';
              const rankColor = idx === 0 ? '#ffc700' : idx === 1 ? '#00f5d4' : '#ff007a';
              return (
                <div
                  key={district.id}
                  className="museum-label p-5 flex flex-col justify-between group hover:scale-[1.02] transition-transform"
                  style={{ borderLeftColor: rankColor }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{medal}</span>
                      <div>
                        <span className="text-[10px] font-mono text-gray-400">
                          RANK #{idx + 1}
                        </span>
                        <h4 className="font-['Outfit'] text-xl font-bold text-white">
                          {isArmenian ? district.name : district.nameEn || district.name}
                        </h4>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-['Outfit'] text-lg font-black text-white">
                        {district.points.toLocaleString()}
                      </div>
                      <div className="text-[10px] font-mono text-gray-400">PTS</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                    <div className="flex justify-between text-xs font-mono text-gray-300">
                      <span>{isArmenian ? 'Մաքրված ցուցանմուշներ․' : 'Cleaned exhibits:'}</span>
                      <span className="font-bold text-white">{district.cleanedExhibits}</span>
                    </div>
                    <div className="w-full bg-[#0b0e14] h-2 rounded-full overflow-hidden border border-white/10">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min(100, (district.points / 5000) * 100)}%`,
                          backgroundColor: rankColor
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Civic Bottom Action Callout Banner */}
      <section className="bg-gradient-to-r from-[#121620] via-[#1a202c] to-[#0f131c] p-6 sm:p-8 rounded-xl border-2 border-[#ffc700] shadow-[0_0_35px_rgba(255,199,0,0.2)] relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left flex-1 min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffc700]/10 border border-[#ffc700]/40 rounded text-xs font-mono text-[#ffc700] uppercase">
              <span className="material-symbols-outlined text-sm">campaign</span>
              <span>{isArmenian ? 'ՔԱՂԱՔԱՑԻԱԿԱՆ ԿՈՉ' : 'CIVIC CALL TO ACTION'}</span>
            </div>
            <h3 className="font-['Outfit'] text-xl sm:text-2xl lg:text-3xl font-black text-white uppercase tracking-tight break-words">
              {isArmenian ? '🚨 ՏԵՍԵ՞Լ ԵՍ ՆՈՐ ԱՂՏՈՏՎԱԾՈՒԹՅՈՒՆ ՔՈ ԹԱՂԱՄԱՍՈՒՄ' : '🚨 SPOTTED NEW URBAN LITTER IN YOUR AREA?'}
            </h3>
            <p className="font-['Montserrat'] text-xs sm:text-sm text-gray-300 max-w-2xl">
              {isArmenian
                ? 'Ավելացրու նոր ցուցանմուշ, գեներացրու թանգարանային ցուցանակը և ստիպիր ուշադրություն դարձնել քաղաքային անփութությանը։'
                : 'Log a new exhibit, generate its museum plaque, and mobilize citizens to clean it up.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full lg:w-auto shrink-0">
            {onOpenReport && (
              <button
                onClick={() => {
                  soundFX.playClick();
                  onOpenReport();
                }}
                className="btn-primary-glow px-5 py-3.5 flex items-center justify-center gap-2 uppercase tracking-wider font-['Archivo_Narrow'] text-sm font-bold whitespace-nowrap w-full sm:w-auto"
              >
                <span className="material-symbols-outlined text-xl">add_circle</span>
                <span>{isArmenian ? '+ ԱՎԵԼԱՑՆԵԼ ՑՈՒՑԱՆՄՈՒՇ' : '+ ADD EXHIBIT'}</span>
              </button>
            )}
            <button
              onClick={() => {
                soundFX.playScanChirp();
                onOpenScanner();
              }}
              className="border-2 border-white text-white hover:bg-white hover:text-black px-5 py-3.5 flex items-center justify-center gap-2 font-['Archivo_Narrow'] text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-xl">qr_code_scanner</span>
              <span>{isArmenian ? 'ՍԿԱՆԱՎՈՐԵԼ QR' : 'SCAN QR'}</span>
            </button>
          </div>
        </div>

        {/* Diagonal Warning Stripe Background */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,199,0,0.03)_25%,transparent_25%,transparent_50%,rgba(255,199,0,0.03)_50%,rgba(255,199,0,0.03)_75%,transparent_75%,transparent)] [background-size:24px_24px] pointer-events-none" />
      </section>
    </div>
  );
}
