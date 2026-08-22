import React from 'react';
import { X, Sparkles, Target, Zap, Award, Layers, Globe, ShieldCheck } from 'lucide-react';

export default function PitchGuideModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex flex-col justify-between p-4 overflow-y-auto animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-xl shadow-lg">
            🏛️
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white font-['Outfit']">
              Yerevan Pulse․ Երևանը ցուցասրահ չէ
            </h2>
            <p className="text-xs text-rose-400 font-mono">Քաղաքային Ինտերվենցիա & Գեյմիֆիկացիա</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-white/20 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Pitch Content */}
      <div className="space-y-4 text-xs text-gray-300 leading-relaxed pr-1">
        {/* Concept Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-500/20 via-amber-500/20 to-emerald-500/20 border border-rose-500/30">
          <span className="font-mono text-amber-300 font-bold text-[11px] block mb-1">
            💡 ՀԻՄՆԱԿԱՆ ԳԱՂԱՓԱՐԸ․
          </span>
          <p className="text-white font-medium">
            «Աղբը դարձնել տեսանելի, իսկ մաքրությունը՝ մասնակցային»։ Փողոցում հայտնված աղբը ներկայացվում է որպես յուրօրինակ «ցուցանմուշ»՝ հատուկ ցուցանակով, որտեղ նշվում է դրա քայքայման հավերժական ժամկետը։
          </p>
        </div>

        {/* 5 Core Pillars */}
        <div className="grid grid-cols-1 gap-2.5">
          <div className="glass-panel p-3 border-amber-500/30">
            <h4 className="font-bold text-amber-300 flex items-center gap-1.5 mb-1 text-xs">
              <Target className="w-4 h-4 text-amber-400" />
              1. Խնդիրը
            </h4>
            <p className="text-gray-400">
              «Աղբ չթափել» սովորական ցուցանակներն այլևս ազդեցություն չունեն, իսկ աղբը դառնում է աննկատ։ Քաղաքացին չի տեսնում իր ճիշտ վարքագծի արդյունքը։
            </p>
          </div>

          <div className="glass-panel p-3 border-emerald-500/30">
            <h4 className="font-bold text-emerald-300 flex items-center gap-1.5 mb-1 text-xs">
              <Zap className="w-4 h-4 text-emerald-400" />
              2. Առաջարկվող Լուծումը
            </h4>
            <p className="text-gray-400">
              Քաղաքային սարկազմ, ցուցանակների QR կոդեր և ինտերակտիվ թվային հարթակ, որտեղ մաքրման գործողությունները վերածվում են միավորների և վարկանիշի։
            </p>
          </div>

          <div className="glass-panel p-3 border-rose-500/30">
            <h4 className="font-bold text-rose-300 flex items-center gap-1.5 mb-1 text-xs">
              <Award className="w-4 h-4 text-rose-400" />
              3. Թաղամասերի Մրցակցություն
            </h4>
            <p className="text-gray-400">
              Թաղամասերը (Կենտրոն, Արաբկիր, Աջափնյակ և այլն) մրցում են «Ամենամաքուր թաղամաս» կոչման համար՝ ձևավորելով թիմային պատասխանատվություն։
            </p>
          </div>

          <div className="glass-panel p-3 border-indigo-500/30">
            <h4 className="font-bold text-indigo-300 flex items-center gap-1.5 mb-1 text-xs">
              <Globe className="w-4 h-4 text-indigo-400" />
              4. Տվյալների Հավաքագրում (Data Hotspots)
            </h4>
            <p className="text-gray-400">
              Թվային հարթակը հավաքագրում է տվյալներ աղտոտվածության «թեժ կետերի» մասին, որոնք կարող են փոխանցվել քաղաքապետարանին և աղբահանության ծառայություններին։
            </p>
          </div>
        </div>

        {/* How to test in demo */}
        <div className="bg-black/50 p-3.5 rounded-xl border border-white/10">
          <span className="font-mono text-emerald-400 font-bold block mb-1">
            📱 Ինչպես Ցուցադրել Հեռախոսով (Pitch Steps)․
          </span>
          <ol className="list-decimal list-inside space-y-1 text-gray-300">
            <li>Սեղմեք <strong className="text-white">«QR»</strong> կոճակը և փորձարկեք ցուցանմուշի սկանավորումը:</li>
            <li>Սեղմեք <strong className="text-white">«Մաքրել»</strong> կոճակը՝ վաստակելով Eco-Pulse միավորներ:</li>
            <li>Բացեք <strong className="text-white">«Թաղամասեր»</strong> բաժինը և տեսեք, թե ինչպես է բարձրանում ռեյտինգը:</li>
          </ol>
        </div>
      </div>

      {/* Footer Close */}
      <button 
        onClick={onClose}
        className="btn-primary w-full mt-4 py-2.5 text-xs font-bold"
      >
        <Sparkles className="w-4 h-4" />
        <span>Հասկանալի է, Սկսել Փորձարկումը</span>
      </button>
    </div>
  );
}
