import React, { useState } from 'react';
import { soundFX } from '../utils/audioFX';
import { translations } from '../data/translations';

export default function CleanVerificationModal({
  exhibit,
  isOpen,
  onClose,
  onSubmitProof,
  currentLang = 'hy'
}) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = translations[currentLang] || translations.hy;
  const tc = t.cleanVerification;

  if (!isOpen || !exhibit) return null;

  const sampleProofs = [
    { label: '🧹 Cleaned Alley Photo', url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80' },
    { label: '♻️ Recycled Bottles Photo', url: 'https://images.unsplash.com/photo-1604186837056-8e7c286766f2?w=600&auto=format&fit=crop&q=80' },
    { label: '✨ Clean Street Photo', url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&auto=format&fit=crop&q=80' }
  ];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      soundFX.playClick();
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!photoUrl) {
      alert(currentLang === 'hy' ? 'Խնդրում ենք կցել մաքրման լուսանկարը:' : 'Please upload or select a proof photo!');
      return;
    }

    soundFX.playScanChirp();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitProof({
        exhibitId: exhibit.id,
        photoUrl: photoUrl,
        notes: notes.trim()
      });
      setPhotoUrl(null);
      setNotes('');
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0b0e14] border-2 border-[#ffc700] p-5 sm:p-6 max-w-lg w-full relative shadow-[0_0_50px_rgba(255,199,0,0.3)] rounded-xl space-y-4 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Close Button */}
        <button
          onClick={() => {
            soundFX.playClick();
            onClose();
          }}
          className="absolute top-3 right-3 text-gray-400 hover:text-[#ffc700] p-1 text-xl font-bold transition-colors"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#ffc700]/10 border border-[#ffc700]/40 rounded text-[10px] font-mono text-[#ffc700] uppercase">
            <span>EXHIBIT #{exhibit.code}</span>
            <span>•</span>
            <span>+{exhibit.points} PTS</span>
          </div>
          <h2 className="font-['Outfit'] text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            {tc.modalTitle}
          </h2>
          <p className="font-['Montserrat'] text-xs text-gray-300">
            {tc.subtitle}
          </p>
        </div>

        {/* Selected Exhibit Summary */}
        <div className="bg-[#121620] p-3 border border-white/10 rounded flex items-center gap-3">
          <span className="text-3xl">{exhibit.icon}</span>
          <div className="flex-1 min-w-0">
            <h4 className="font-['Outfit'] text-sm font-bold text-white uppercase truncate">
              {currentLang === 'en' && exhibit.titleEn ? exhibit.titleEn : exhibit.title}
            </h4>
            <p className="font-['Montserrat'] text-xs text-gray-400 truncate">
              📍 {currentLang === 'en' && exhibit.locationEn ? exhibit.locationEn : exhibit.location} ({exhibit.district})
            </p>
          </div>
        </div>

        {/* Photo Upload / Camera Input Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-['Space_Grotesk'] font-bold text-[#ffc700] uppercase">
              {currentLang === 'hy' ? '📷 ՄԱՔՐՎԱԾ ՏԱՐԱԾՔԻ ԼՈՒՍԱՆԿԱՐԸ (PROOF PHOTO)' : '📷 CLEANED SITE PROOF PHOTO'}
            </label>

            {photoUrl ? (
              <div className="relative border-2 border-[#00f5d4] rounded-lg overflow-hidden h-48 bg-black flex items-center justify-center group shadow-xl">
                <img src={photoUrl} alt="Proof" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPhotoUrl(null)}
                    className="bg-rose-600 text-white px-3 py-1.5 text-xs font-bold uppercase rounded border border-white"
                  >
                    {tc.changePhoto}
                  </button>
                </div>
                <div className="absolute bottom-2 left-2 bg-[#00f5d4] text-black font-mono text-[10px] px-2 py-0.5 font-bold uppercase rounded">
                  ✓ PHOTO ATTACHED
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-[#ffc700]/60 hover:border-[#ffc700] bg-[#121620] p-6 rounded-lg text-center space-y-3 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <span className="material-symbols-outlined text-4xl text-[#ffc700] animate-bounce">
                  add_a_photo
                </span>
                <div>
                  <p className="font-['Outfit'] text-sm font-bold text-white uppercase">
                    {tc.uploadPhoto}
                  </p>
                  <p className="font-['Montserrat'] text-[11px] text-gray-400 mt-0.5">
                    {currentLang === 'hy' ? 'Սեղմեք այստեղ կամ քաշեք նկարը' : 'Click here or drag photo file'}
                  </p>
                </div>
              </div>
            )}

            {/* Quick Demo Sample Photos selection */}
            {!photoUrl && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-mono text-gray-400 uppercase block">
                  {currentLang === 'hy' ? '⚡ ԿԱՄ ԸՆՏՐԵՔ ՓՈՐՁՆԱԿԱՆ ԼՈՒՍԱՆԿԱՐ (QUICK DEMO):' : '⚡ OR SELECT SAMPLE DEMO PHOTO:'}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {sampleProofs.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        setPhotoUrl(sample.url);
                      }}
                      className="p-1.5 bg-[#121620] border border-gray-700 hover:border-[#ffc700] text-[10px] font-mono text-gray-300 hover:text-white rounded truncate text-center"
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notes Input */}
          <div className="space-y-1">
            <label className="block text-xs font-['Space_Grotesk'] font-bold text-gray-300 uppercase">
              {tc.addNote}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={tc.notePlaceholder}
              className="w-full bg-[#121620] border border-gray-700 focus:border-[#ffc700] p-2.5 text-xs text-white outline-none rounded font-['Montserrat'] resize-none"
            />
          </div>

          {/* Verification Notice */}
          <div className="p-3 bg-[#ffc700]/10 border border-[#ffc700]/40 rounded text-xs text-gray-300 flex items-start gap-2">
            <span className="material-symbols-outlined text-base text-[#ffc700] shrink-0 mt-0.5">info</span>
            <p className="leading-tight">
              {tc.pendingNotice}
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !photoUrl}
            className={`w-full py-3.5 px-4 font-['Archivo_Narrow'] text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 rounded shadow-xl ${
              photoUrl && !isSubmitting
                ? 'btn-primary-glow text-[#0b0e14]'
                : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-lg animate-spin">sync</span>
                <span>{currentLang === 'hy' ? 'ՈՒՂԱՐԿՎՈՒՄ Է...' : 'SUBMITTING...'}</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-xl">send</span>
                <span>{tc.submitBtn}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
