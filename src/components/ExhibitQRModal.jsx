import React from 'react';
import { soundFX } from '../utils/audioFX';

export default function ExhibitQRModal({ exhibit, isOpen, onClose }) {
  if (!isOpen || !exhibit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#121414] border-2 border-[#ffd700] p-6 max-w-sm w-full relative shadow-[0_0_50px_rgba(255,215,0,0.3)] space-y-4 text-center">
        {/* Close Button */}
        <button
          onClick={() => {
            soundFX.playClick();
            onClose();
          }}
          className="absolute top-3 right-3 text-[#999077] hover:text-[#ffd700] p-1"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Printable Museum Label Plaque Preview */}
        <div className="border-2 border-[#ffd700] bg-[#1a1c1c] p-5 space-y-3 sticker-effect relative">
          <div className="flex justify-between items-center border-b border-[#4d4732] pb-2">
            <span className="font-['Archivo_Narrow'] text-xs font-black text-[#ffd700] uppercase tracking-wider">
              YEREVAN PULSE #EXHIBIT
            </span>
            <span className="text-[10px] font-mono text-[#d0c6ab]">
              #{exhibit.code}
            </span>
          </div>

          {/* SVG QR Code Simulation */}
          <div className="bg-white p-3 inline-block rounded border-2 border-black shadow-inner">
            <svg viewBox="0 0 100 100" className="w-40 h-40">
              {/* Corner Position Detection Squares */}
              <rect x="5" y="5" width="25" height="25" fill="#000" />
              <rect x="9" y="9" width="17" height="17" fill="#fff" />
              <rect x="13" y="13" width="9" height="9" fill="#000" />

              <rect x="70" y="5" width="25" height="25" fill="#000" />
              <rect x="74" y="9" width="17" height="17" fill="#fff" />
              <rect x="78" y="13" width="9" height="9" fill="#000" />

              <rect x="5" y="70" width="25" height="25" fill="#000" />
              <rect x="9" y="74" width="17" height="17" fill="#fff" />
              <rect x="13" y="78" width="9" height="9" fill="#000" />

              {/* Data Pattern Simulation */}
              <rect x="35" y="10" width="5" height="5" fill="#000" />
              <rect x="45" y="10" width="10" height="5" fill="#000" />
              <rect x="60" y="10" width="5" height="5" fill="#000" />
              
              <rect x="35" y="20" width="10" height="5" fill="#000" />
              <rect x="50" y="20" width="5" height="5" fill="#000" />
              <rect x="60" y="20" width="5" height="5" fill="#000" />

              <rect x="10" y="35" width="5" height="10" fill="#000" />
              <rect x="20" y="35" width="10" height="5" fill="#000" />
              <rect x="35" y="35" width="15" height="15" fill="#000" />
              <rect x="55" y="35" width="10" height="5" fill="#000" />
              <rect x="70" y="35" width="15" height="5" fill="#000" />

              <rect x="10" y="50" width="15" height="5" fill="#000" />
              <rect x="30" y="50" width="5" height="10" fill="#000" />
              <rect x="55" y="50" width="15" height="15" fill="#000" />
              <rect x="75" y="50" width="10" height="10" fill="#000" />

              <rect x="35" y="70" width="10" height="10" fill="#000" />
              <rect x="50" y="70" width="15" height="5" fill="#000" />
              <rect x="70" y="70" width="5" height="15" fill="#000" />
              <rect x="80" y="70" width="10" height="10" fill="#000" />

              <rect x="35" y="85" width="25" height="5" fill="#000" />
              <rect x="65" y="85" width="15" height="5" fill="#000" />

              {/* Logo Badge in Center */}
              <rect x="40" y="40" width="20" height="20" fill="#ffd700" stroke="#000" strokeWidth="2" />
              <text x="50" y="53" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#000">YP</text>
            </svg>
          </div>

          <div className="text-left space-y-1">
            <h3 className="font-['Archivo_Narrow'] text-base font-black text-[#ffd700] uppercase">
              {exhibit.title}
            </h3>
            <p className="text-[11px] font-['Montserrat'] text-[#e2e2e2]">
              📍 {exhibit.location} ({exhibit.district})
            </p>
            <p className="text-[10px] font-mono text-[#d0c6ab]">
              ՔԱՅՔԱՅՄԱՆ ԺԱՄԿԵՏ՝ {exhibit.lifespanYears >= 1000000 ? '1,000,000 ՏԱՐԻ' : `${exhibit.lifespanYears} ՏԱՐԻ`}
            </p>
          </div>
        </div>

        <p className="text-[11px] text-[#d0c6ab]">
          Տպեք այս ցուցանակը և տեղադրեք աղբի կողքին՝ քաղաքային ինտերվենցիա իրականացնելու համար։
        </p>

        <button
          onClick={() => {
            soundFX.playSuccess();
            alert('Ցուցանակի ֆայլը պատրաստ է տպագրության (Print Ready)!');
          }}
          className="w-full bg-[#ffd700] text-[#1a1a1a] py-3 font-['Archivo_Narrow'] text-xs font-black uppercase tracking-wider hover:bg-[#e9c400] transition-all border border-white"
        >
          🖨️ ՏՊԵԼ ԹԱՆԳԱՐԱՆԱՅԻՆ ՑՈՒՑԱՆԱԿԸ
        </button>
      </div>
    </div>
  );
}
