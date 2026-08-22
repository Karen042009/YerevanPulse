import React, { useState } from 'react';
import { MapPin, CheckCircle2, Sparkles, Navigation } from 'lucide-react';

export default function YerevanMap({ exhibits, onSelectExhibit, onCleanExhibit }) {
  const [filter, setFilter] = useState('all'); // all | active | cleaned
  const [activeExhibit, setActiveExhibit] = useState(exhibits[0]);

  const filteredExhibits = exhibits.filter((ex) => {
    if (filter === 'active') return !ex.cleaned;
    if (filter === 'cleaned') return ex.cleaned;
    return true;
  });

  return (
    <div className="space-y-3">
      {/* Map Header & Filter */}
      <div className="flex items-center justify-between bg-black/40 p-2.5 rounded-xl border border-white/10">
        <div className="flex items-center gap-1.5 text-xs text-gray-300">
          <Navigation className="w-4 h-4 text-rose-400 animate-pulse" />
          <span className="font-bold">Երևանի Աղտոտվածության Քարտեզ</span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
              filter === 'all' ? 'bg-rose-500 text-white' : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            Բոլորը ({exhibits.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
              filter === 'active' ? 'bg-amber-500 text-black font-bold' : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            Թեժ Կետեր ({exhibits.filter(e => !e.cleaned).length})
          </button>
          <button
            onClick={() => setFilter('cleaned')}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
              filter === 'cleaned' ? 'bg-emerald-500 text-black font-bold' : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            Մաքրված ({exhibits.filter(e => e.cleaned).length})
          </button>
        </div>
      </div>

      {/* Styled Interactive Canvas/SVG Map Container */}
      <div className="relative w-full h-[320px] bg-[#09111E] rounded-2xl border border-white/10 overflow-hidden shadow-inner flex items-center justify-center">
        {/* Yerevan City Stylized Grid & Landmarks Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Hrazdan River Vector Representation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
          <path d="M 50,0 Q 150,100 120,200 T 280,320" fill="none" stroke="#06B6D4" strokeWidth="6" strokeDasharray="4 4" />
          <text x="70" y="50" fill="#06B6D4" fontSize="10" fontFamily="sans-serif" opacity="0.7">Հրազդան Գետ</text>
        </svg>

        {/* District Overlay Labels */}
        <div className="absolute top-4 left-6 text-[11px] font-mono text-cyan-400/60 font-bold pointer-events-none">
          Արաբկիր
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-mono text-rose-400/60 font-bold pointer-events-none">
          Կենտրոն (Kentron)
        </div>
        <div className="absolute bottom-6 left-8 text-[11px] font-mono text-emerald-400/60 font-bold pointer-events-none">
          Աջափնյակ
        </div>
        <div className="absolute bottom-6 right-8 text-[11px] font-mono text-amber-400/60 font-bold pointer-events-none">
          Էրեբունի
        </div>

        {/* Map Interactive Pins */}
        {filteredExhibits.map((ex) => {
          const isSelected = activeExhibit?.id === ex.id;

          return (
            <button
              key={ex.id}
              onClick={() => {
                setActiveExhibit(ex);
                if (onSelectExhibit) onSelectExhibit(ex);
              }}
              style={{ top: `${ex.coordinates.y}%`, left: `${ex.coordinates.x}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 ${
                isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
              }`}
            >
              {/* Pulse Halo for Active Items */}
              {!ex.cleaned && (
                <span className="absolute -inset-2 rounded-full bg-rose-500/40 animate-ping" />
              )}

              {/* Marker Icon Pin */}
              <div className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-lg text-sm ${
                ex.cleaned 
                  ? 'bg-emerald-500 border-emerald-300 text-black' 
                  : isSelected 
                  ? 'bg-rose-500 border-white text-white shadow-rose-500/50' 
                  : 'bg-amber-500 border-amber-300 text-black'
              }`}>
                <span>{ex.icon}</span>
              </div>

              {/* Pin Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block whitespace-nowrap bg-black/90 text-white text-[10px] px-2 py-1 rounded border border-white/20 shadow-xl z-40">
                {ex.title} ({ex.district})
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Exhibit Quick Preview Sheet */}
      {activeExhibit && (
        <div className="glass-panel p-3.5 border-rose-500/30 bg-gradient-to-r from-rose-500/10 via-transparent to-transparent flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-2xl p-2 rounded-xl bg-white/5 border border-white/10 shrink-0">
              {activeExhibit.icon}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] text-amber-400 font-bold">#{activeExhibit.code}</span>
                <span className="text-xs font-bold text-white">{activeExhibit.title}</span>
              </div>
              <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-rose-400" />
                {activeExhibit.location} ({activeExhibit.district})
              </p>
            </div>
          </div>

          <div className="shrink-0">
            {activeExhibit.cleaned ? (
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> ՄԱՔՐՎԱԾ
              </span>
            ) : (
              <button 
                onClick={() => onCleanExhibit(activeExhibit.id)}
                className="btn-primary py-1.5 px-3 text-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Մաքրել (+{activeExhibit.points})</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
