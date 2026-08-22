import React, { useState } from 'react';
import { soundFX } from '../utils/audioFX';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [mode, setMode] = useState('register'); // 'register' | 'login'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [district, setDistrict] = useState('Կենտրոն');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    soundFX.playSuccess();

    const userData = {
      id: 'usr-' + Date.now(),
      name: name || (mode === 'register' ? 'Անի Սարգսյան' : 'Ակտիվ Քաղաքացի'),
      email: email || 'user@yerevanpulse.am',
      district: district,
      level: 4,
      points: 850,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJSdFTmOPkvDaEO4Ay292rWxM574-584MJGI6BJRBkCjytZUExR3P9IdCqTxqWHH2T-r4brj_93V_c4vtZsNqNFYRE1tdd1MKa2V7lNLpbsQ-anh2iWquqgXSiaW47JWLQUeFEsIqWIsOCzg3SkrXYxPABAd4bUCBA-B8jVHcq73-5GYHFj7r8-GTj3hiySNpEvkkkrth4k8hrrQ-nw1vCmrwg3iyTgYOCtKQZCAMBUUgiNG65H0N8'
    };

    localStorage.setItem('yp_current_user', JSON.stringify(userData));
    onLoginSuccess(userData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#1a1c1c] border-2 border-[#ffd700] p-6 max-w-md w-full relative shadow-[0_0_50px_rgba(255,215,0,0.2)]">
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

        {/* Modal Branding Header */}
        <div className="text-center mb-6 space-y-2">
          <img src="/logo.png" alt="Yerevan Pulse Logo" className="h-16 w-auto mx-auto border-2 border-[#ffd700] p-1 bg-black" />
          <h2 className="font-['Archivo_Narrow'] text-xl font-black uppercase text-[#ffd700] tracking-wider">
            {mode === 'register' ? 'ՄԻԱՑԻՐ ՔԱՂԱՔԱՅԻՆ ԻՆՏԵՐՎԵՆՑԻԱՅԻՆ' : 'ՄՈՒՏՔ ՀԱՄԱԿԱՐԳ'}
          </h2>
          <p className="text-xs font-['Montserrat'] text-[#d0c6ab]">
            {mode === 'register' 
              ? 'Գրանցվիր, ստացիր քաղաքացու ID և հավաքիր միավորներ քո թաղամասի համար:'
              : 'Մուտք գործիր քո անձնական էկո-պրոֆիլ:'}
          </p>
        </div>

        {/* Auth Tab Switcher */}
        <div className="flex border border-[#4d4732] mb-5 bg-[#121414]">
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setMode('register');
            }}
            className={`flex-1 py-2 font-['Archivo_Narrow'] text-xs font-bold uppercase transition-all ${
              mode === 'register' ? 'bg-[#ffd700] text-[#1a1a1a]' : 'text-[#d0c6ab] hover:text-white'
            }`}
          >
            ԳՐԱՆՑՈՒՄ
          </button>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setMode('login');
            }}
            className={`flex-1 py-2 font-['Archivo_Narrow'] text-xs font-bold uppercase transition-all ${
              mode === 'login' ? 'bg-[#ffd700] text-[#1a1a1a]' : 'text-[#d0c6ab] hover:text-white'
            }`}
          >
            ՄՈՒՏՔ
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block font-['Archivo_Narrow'] text-xs font-bold text-[#e2e2e2] uppercase mb-1">
                Անուն Ընտանուն / Մականուն
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="օր․ Անի Սարգսյան"
                className="w-full bg-[#121414] border border-[#4d4732] focus:border-[#ffd700] text-[#e2e2e2] p-2.5 text-xs outline-none font-['Montserrat']"
              />
            </div>
          )}

          <div>
            <label className="block font-['Archivo_Narrow'] text-xs font-bold text-[#e2e2e2] uppercase mb-1">
              Էլ. Փոստ (Email)
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ani@yerevanpulse.am"
              className="w-full bg-[#121414] border border-[#4d4732] focus:border-[#ffd700] text-[#e2e2e2] p-2.5 text-xs outline-none font-['Montserrat']"
            />
          </div>

          {mode === 'register' && (
            <div>
              <label className="block font-['Archivo_Narrow'] text-xs font-bold text-[#e2e2e2] uppercase mb-1">
                Ընտրիր Քո Թաղամասը (District)
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-[#121414] border border-[#4d4732] focus:border-[#ffd700] text-[#e2e2e2] p-2.5 text-xs outline-none font-['Montserrat']"
              >
                <option value="Կենտրոն">Կենտրոն (Kentron)</option>
                <option value="Արաբկիր">Արաբկիր (Arabkir)</option>
                <option value="Աջափնյակ">Աջափնյակ (Ajapnyak)</option>
                <option value="Շենգավիթ">Շենգավիթ (Shengavit)</option>
                <option value="Նոր Նորք">Նոր Նորք (Nor Nork)</option>
                <option value="Էրեբունի">Էրեբունի (Erebuni)</option>
                <option value="Դավթաշեն">Դավթաշեն (Davtashen)</option>
              </select>
            </div>
          )}

          <div>
            <label className="block font-['Archivo_Narrow'] text-xs font-bold text-[#e2e2e2] uppercase mb-1">
              Գաղտնաբառ
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#121414] border border-[#4d4732] focus:border-[#ffd700] text-[#e2e2e2] p-2.5 text-xs outline-none font-['Montserrat']"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#ffd700] text-[#1a1a1a] py-3 font-['Archivo_Narrow'] text-sm font-black uppercase tracking-wider hover:bg-[#e9c400] transition-all border-2 border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] mt-2"
          >
            {mode === 'register' ? 'ՀԱՍՏԱՏԵԼ ԳՐԱՆՑՈՒՄԸ' : 'ՄՈՒՏՔ ԳՈՐԾԵԼ'}
          </button>
        </form>
      </div>
    </div>
  );
}
