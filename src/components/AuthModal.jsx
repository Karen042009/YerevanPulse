import React, { useState } from 'react';
import { soundFX } from '../utils/audioFX';
import { readJson, writeJson } from '../utils/storage';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, onLogout, currentUser }) {
  const [mode, setMode] = useState('register'); // 'register' | 'login'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [district, setDistrict] = useState('Կենտրոն');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    const accounts = readJson("yp_accounts", []);

    if (mode === "login") {
      const account = accounts.find((item) => item.email === normalizedEmail && item.password === password);
      if (!account) {
        setError("Սխալ email կամ գաղտնաբառ։");
        return;
      }

      const publicUser = { ...account };
      delete publicUser.password;
      soundFX.playSuccess();
      onLoginSuccess(publicUser);
      onClose();
      return;
    }

    if (!name.trim() || password.length < 6) {
      setError("Անունը լրացրեք և օգտագործեք առնվազն 6 նիշանոց գաղտնաբառ։");
      return;
    }

    if (accounts.some((item) => item.email === normalizedEmail)) {
      setError("Այս email-ով հաշիվ արդեն գոյություն ունի։");
      return;
    }

    const userData = {
      id: "usr-" + Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      district,
      level: 1,
      points: 0,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJSdFTmOPkvDaEO4y292rWxM574-584MJGI6BJRBkCjytZUExR3P9IdCqTxqWHH2T-r4brj_93V_c4vtZsNqNFYRE1tdd1MKa2V7lNLpbsQ-anh2iWquqgXSiaW47JWLQUeFEsIqWIsOCzg3SkrXYxPABAd4bUCBA-B8jVHcq73-5GYHFj7r8-GTj3hiySNpEvkkkrth4k8hrrQ-nw1vCmrwg3iyTgYOCtKQZCAMBUUgiNG65H0N8"
    };

    writeJson("yp_accounts", [...accounts, { ...userData, password }]);
    soundFX.playSuccess();
    onLoginSuccess(userData);
    onClose();
  };


  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[var(--surface-1)] border-2 border-[var(--primary-gold)] p-6 max-w-md w-full relative shadow-[0_0_60px_var(--primary-gold-glow)] rounded-lg">
        {/* Close Button */}
        <button
          onClick={() => {
            soundFX.playClick();
            onClose();
          }}
          className="absolute top-3 right-3 text-gray-500 hover:text-[var(--primary-gold)] transition-colors p-1"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Modal Branding Header */}
        <div className="text-center mb-6 space-y-2">
          <div className="inline-block p-1 bg-black border-2 border-[var(--primary-gold)] shadow-[4px_4px_0px_0px_var(--primary-gold-glow)] rounded-md mb-2">
            <img src="/logo.png" alt="Yerevan Pulse Logo" className="h-14 w-auto object-contain" />
          </div>
          <h2 className="font-['Outfit'] text-2xl font-black uppercase text-gradient-gold tracking-wider">
            {mode === 'register' ? 'ՄԻԱՑԻՐ ԻՆՏԵՐՎԵՆՑԻԱՅԻՆ' : 'ՄՈՒՏՔ ՀԱՄԱԿԱՐԳ'}
          </h2>
          <p className="text-xs font-['Montserrat'] text-gray-300">
            {mode === 'register' 
              ? 'Գրանցվիր, ստացիր քաղաքացու ID և հավաքիր միավորներ քո թաղամասի համար:'
              : 'Մուտք գործիր քո անձնական էկո-պրոֆիլ:'}
          </p>
        </div>

        {currentUser && !currentUser.isGuest && (
          <div className="mb-4 flex items-center justify-between border border-[var(--primary-gold)]/40 bg-[var(--bg-main)] px-3 py-2 text-xs text-gray-300">
            <span>Մուտք գործած եք՝ <strong className="text-[var(--primary-gold)]">{currentUser.email}</strong></span>
            <button type="button" onClick={onLogout} className="text-rose-400 hover:text-rose-300 font-bold uppercase">Դուրս գալ</button>
          </div>
        )}

        {error && <p className="mb-4 border border-rose-500/50 bg-rose-500/10 px-3 py-2 text-xs text-rose-300">{error}</p>}

        {/* Auth Tab Switcher */}
        <div className="flex border-2 border-[var(--primary-gold)]/30 mb-6 bg-[var(--bg-main)] rounded overflow-hidden">
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setError('');
              setMode('register');
            }}
            className={`flex-1 py-2.5 font-['Archivo_Narrow'] text-sm font-bold uppercase transition-all ${
              mode === 'register' ? 'bg-[var(--primary-gold)] text-[var(--bg-main)] shadow-[0_0_15px_var(--primary-gold-glow)]' : 'text-gray-400 hover:text-[var(--primary-gold)]'
            }`}
          >
            ԳՐԱՆՑՈՒՄ
          </button>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setError('');
              setMode('login');
            }}
            className={`flex-1 py-2.5 font-['Archivo_Narrow'] text-sm font-bold uppercase transition-all ${
              mode === 'login' ? 'bg-[var(--primary-gold)] text-[var(--bg-main)] shadow-[0_0_15px_var(--primary-gold-glow)]' : 'text-gray-400 hover:text-[var(--primary-gold)]'
            }`}
          >
            ՄՈՒՏՔ
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block font-['Space_Grotesk'] text-xs font-bold text-[var(--primary-gold)] uppercase mb-1.5">
                Անուն Ընտանուն / Մականուն
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="օր․ Անի Սարգսյան"
                className="w-full bg-[var(--bg-main)] border border-gray-700 focus:border-[var(--primary-gold)] text-white p-3 text-sm outline-none transition-colors rounded"
              />
            </div>
          )}

          <div>
            <label className="block font-['Space_Grotesk'] text-xs font-bold text-[var(--primary-gold)] uppercase mb-1.5">
              Էլ. Փոստ (Email)
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ani@yerevanpulse.am"
              className="w-full bg-[var(--bg-main)] border border-gray-700 focus:border-[var(--primary-gold)] text-white p-3 text-sm outline-none transition-colors rounded"
            />
          </div>

          {mode === 'register' && (
            <div>
              <label className="block font-['Space_Grotesk'] text-xs font-bold text-[var(--primary-gold)] uppercase mb-1.5">
                Ընտրիր Քո Թաղամասը (District)
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-[var(--bg-main)] border border-gray-700 focus:border-[var(--primary-gold)] text-white p-3 text-sm outline-none transition-colors rounded"
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
            <label className="block font-['Space_Grotesk'] text-xs font-bold text-[var(--primary-gold)] uppercase mb-1.5">
              Գաղտնաբառ
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[var(--bg-main)] border border-gray-700 focus:border-[var(--primary-gold)] text-white p-3 text-sm outline-none transition-colors rounded"
            />
          </div>

          <button
            type="submit"
            className="btn-primary-glow w-full py-4 mt-6 text-sm font-black uppercase tracking-wider rounded"
          >
            {mode === 'register' ? 'ՀԱՍՏԱՏԵԼ ԳՐԱՆՑՈՒՄԸ' : 'ՄՈՒՏՔ ԳՈՐԾԵԼ'}
          </button>
        </form>
      </div>
    </div>
  );
}
