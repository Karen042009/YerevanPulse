import React, { useState } from 'react';
import { soundFX } from '../utils/audioFX';

export default function PitchGuideModal({ isOpen, onClose }) {
  const [slide, setSlide] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      title: "💡 1. ԳԱՂԱՓԱՐԸ (THE CONCEPT)",
      badge: "VISION",
      content: "«Աղբը դարձնել տեսանելի, իսկ մաքրությունը՝ մասնակցային»։ Yerevan Pulse-ը քաղաքային ինտերվենցիոն հարթակ է, որը փողոցում լքված աղբը ներկայացնում է որպես «թանգարանային ցուցանմուշ»՝ հատուկ ցուցանակով և քայքայման հավերժական ժամկետով:"
    },
    {
      title: "🚨 2. ԽՆԴԻՐԸ ԵՎ ԼՈՒԾՈՒՄԸ",
      badge: "URBAN REMEDY",
      content: "«Աղբ չթափել» սովորական ցուցանակներն այլևս ազդեցություն չունեն։ Yerevan Pulse-ը կիրառում է քաղաքային սարկազմ, QR կոդեր և գեյմիֆիկացիա՝ աղբը մաքրող քաղաքացիներին վարձատրելով Eco-Pulse միավորներով:"
    },
    {
      title: "🏆 3. ԹԱՂԱՄԱՍԵՐԻ ՄՐՑԱԿՑՈՒԹՅՈՒՆ",
      badge: "CIVIC GAMIFICATION",
      content: "Երևանի 12 թաղամասերը (Կենտրոն, Արաբկիր, Աջափնյակ, Շենգավիթ և այլն) մրցում են «Ամենամաքուր Թաղամաս» տիտղոսի համար: Յուրաքանչյուր մաքրված ցուցանմուշ բարձրացնում է թաղամասի ռեյտինգը:"
    },
    {
      title: "📊 4. Real-time Data Map",
      badge: "DATA INSIGHTS",
      content: "Հարթակը հավաքագրում է տվյալներ աղտոտվածության «թեժ կետերի» (Hotspots) մասին, որոնք կարող են օգտագործվել քաղաքապետարանի և աղբահանության ծառայությունների կողմից:"
    }
  ];

  return (
    <div className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#121414] border-2 border-[#ffd700] p-6 max-w-lg w-full relative shadow-[0_0_50px_rgba(255,215,0,0.3)] space-y-6">
        {/* Close button */}
        <button
          onClick={() => {
            soundFX.playClick();
            onClose();
          }}
          className="absolute top-3 right-3 text-[#999077] hover:text-[#ffd700] p-1"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-[#4d4732] pb-3">
          <img src="/logo.png" alt="Yerevan Pulse Logo" className="h-10 w-auto border border-[#ffd700] p-0.5 bg-black" />
          <div>
            <span className="text-[10px] font-mono text-[#ffd700] bg-black px-2 py-0.5 border border-[#ffd700] uppercase">
              PRESENTATION SLIDE {slide + 1}/4
            </span>
            <h2 className="font-['Archivo_Narrow'] text-xl font-black uppercase text-[#e2e2e2] mt-0.5">
              YEREVAN PULSE PITCH
            </h2>
          </div>
        </div>

        {/* Active Slide Box */}
        <div className="bg-[#1e2020] p-5 border border-[#ffd700] space-y-3 min-h-[160px] flex flex-col justify-center">
          <div className="flex justify-between items-center">
            <h3 className="font-['Archivo_Narrow'] text-lg font-black text-[#ffd700] uppercase">
              {slides[slide].title}
            </h3>
            <span className="text-[10px] font-mono text-[#78dc77] bg-black px-2 py-0.5 border border-[#78dc77]">
              {slides[slide].badge}
            </span>
          </div>

          <p className="font-['Montserrat'] text-xs text-[#d0c6ab] leading-relaxed">
            {slides[slide].content}
          </p>
        </div>

        {/* Interactive Navigation controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => {
              soundFX.playClick();
              setSlide(prev => Math.max(0, prev - 1));
            }}
            disabled={slide === 0}
            className="px-4 py-2 bg-[#1e2020] border border-[#4d4732] text-xs font-['Archivo_Narrow'] font-bold text-[#e2e2e2] hover:border-[#ffd700] disabled:opacity-30"
          >
            ◄ ՆԱԽՈՐԴԸ
          </button>

          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <span 
                key={i} 
                onClick={() => setSlide(i)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                  slide === i ? 'bg-[#ffd700] scale-110' : 'bg-[#4d4732]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              soundFX.playClick();
              setSlide(prev => Math.min(slides.length - 1, prev + 1));
            }}
            disabled={slide === slides.length - 1}
            className="px-4 py-2 bg-[#ffd700] text-[#1a1a1a] text-xs font-['Archivo_Narrow'] font-black uppercase hover:bg-[#e9c400] disabled:opacity-30"
          >
            ՀԱՋՈՐԴԸ ►
          </button>
        </div>
      </div>
    </div>
  );
}
