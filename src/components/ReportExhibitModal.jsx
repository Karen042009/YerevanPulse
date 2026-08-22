import React, { useState } from 'react';
import { soundFX } from '../utils/audioFX';

export default function ReportExhibitModal({ isOpen, onClose, onAddExhibit, districts }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Պլաստիկ');
  const [district, setDistrict] = useState(districts[0]?.name || 'Կենտրոն');
  const [location, setLocation] = useState('');
  const [quote, setQuote] = useState('');
  const [severity, setSeverity] = useState('high');
  const [selectedPhotoPreset, setSelectedPhotoPreset] = useState('https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80');

  if (!isOpen) return null;

  const photoPresets = [
    { label: '🍾 Շիշ', url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80' },
    { label: '🚬 Ծխախոտ', url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80' },
    { label: '🛍️ Տոպրակ', url: 'https://images.unsplash.com/photo-1526951521990-620dc14c214b?w=800&auto=format&fit=crop&q=80' },
    { label: '🥤 Տարա', url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80' },
    { label: '☕ Բաժակ', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80' },
    { label: '📱 Վեյփ', url: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?w=800&auto=format&fit=crop&q=80' }
  ];

  const categoryIcons = {
    'Պլաստիկ': '🍾',
    'Ծխախոտ': '🚬',
    'Մետաղ': '🥤',
    'Ապակի': '🍾',
    'Թուղթ/Պլաստիկ': '☕',
    'Էլեկտրոնիկա': '📱',
  };

  const categoryLifespans = {
    'Պլաստիկ': 450,
    'Ծխախոտ': 12,
    'Մետաղ': 200,
    'Ապակի': 1000000,
    'Թուղթ/Պլաստիկ': 30,
    'Էլեկտրոնիկա': 500,
  };

  const categoryPoints = {
    'Պլաստիկ': 50,
    'Ծխախոտ': 30,
    'Մետաղ': 60,
    'Ապակի': 100,
    'Թուղթ/Պլաստիկ': 40,
    'Էլեկտրոնիկա': 80,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !location.trim()) return;

    soundFX.playSuccess();

    const randomCodeNum = Math.floor(100 + Math.random() * 900);
    const newExhibit = {
      id: `ex-${Date.now()}`,
      code: `YVN-${randomCodeNum}`,
      title: title.trim(),
      category: category,
      location: location.trim(),
      district: district,
      lifespanYears: categoryLifespans[category] || 100,
      curator: 'Քաղաքացիական Ակտիվիստ',
      points: categoryPoints[category] || 50,
      quote: quote.trim() || `XXI դարի ${category.toLowerCase()} արտեֆակտ Երևանի փողոցում:`,
      audioText: `Նոր ֆիքսված ցուցանմուշ ${district} թաղամասում՝ ${location.trim()} հասցեում։`,
      cleaned: false,
      cleanedBy: null,
      cleanedAt: null,
      coordinates: { 
        x: Math.floor(25 + Math.random() * 50), 
        y: Math.floor(25 + Math.random() * 50) 
      },
      icon: categoryIcons[category] || '🗑️',
      severity: severity,
      imageUrl: selectedPhotoPreset
    };

    onAddExhibit(newExhibit);
    onClose();

    // Reset form
    setTitle('');
    setLocation('');
    setQuote('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#121414] border-2 border-[#ffd700] p-6 max-w-lg w-full shadow-[0_0_50px_rgba(255,215,0,0.2)] space-y-6 relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-[#4d4732] pb-4">
          <div>
            <span className="text-[10px] font-mono text-[#ffd700] uppercase tracking-widest bg-black px-2 py-0.5 border border-[#ffd700]">
              + CIVIC REPORTING
            </span>
            <h2 className="font-['Archivo_Narrow'] text-2xl font-black uppercase text-[#e2e2e2] mt-1">
              ԱՎԵԼԱՑՆԵԼ ՆՈՐ ՑՈՒՑԱՆՄՈՒՇ
            </h2>
            <p className="text-xs text-[#d0c6ab] mt-0.5">
              Արձանագրեք Երևանի փողոցներում գտնված «հավերժական արտեֆակտը»
            </p>
          </div>
          <button
            onClick={() => { soundFX.playClick(); onClose(); }}
            className="text-[#d0c6ab] hover:text-[#ffd700] text-xl font-bold p-1"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-['Archivo_Narrow'] font-bold text-[#ffd700] uppercase mb-1">
              Ցուցանմուշի Անվանումը *
            </label>
            <input
              type="text"
              required
              placeholder="օր. Պլաստիկ Ջրի Շիշ #109"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#1a1c1c] border border-[#4d4732] focus:border-[#ffd700] px-3 py-2 text-xs text-[#e2e2e2] outline-none"
            />
          </div>

          {/* Photo Preset Selector */}
          <div>
            <label className="block text-xs font-['Archivo_Narrow'] font-bold text-[#ffd700] uppercase mb-1">
              Ընտրեք Լուսանկար / Photo Preset
            </label>
            <div className="grid grid-cols-3 gap-2">
              {photoPresets.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setSelectedPhotoPreset(preset.url)}
                  className={`p-1.5 border text-xs font-['Archivo_Narrow'] font-bold flex items-center gap-1 transition-all ${
                    selectedPhotoPreset === preset.url ? 'bg-[#ffd700] text-black border-white' : 'bg-[#1a1c1c] text-[#e2e2e2] border-[#4d4732]'
                  }`}
                >
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-['Archivo_Narrow'] font-bold text-[#ffd700] uppercase mb-1">
                Աղբի Կատեգորիա
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#1a1c1c] border border-[#4d4732] focus:border-[#ffd700] px-3 py-2 text-xs text-[#e2e2e2] outline-none"
              >
                <option value="Պլաստիկ">🍾 Պլաստիկ (450 տարի)</option>
                <option value="Ծխախոտ">🚬 Ծխախոտ (12 տարի)</option>
                <option value="Մետաղ">🥤 Մետաղ (200 տարի)</option>
                <option value="Ապակի">🍾 Ապակի (1,000,000 տարի)</option>
                <option value="Թուղթ/Պլաստիկ">☕ Թուղթ/Պլաստիկ (30 տարի)</option>
                <option value="Էլեկտրոնիկա">📱 Էլեկտրոնիկա (500 տարի)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-['Archivo_Narrow'] font-bold text-[#ffd700] uppercase mb-1">
                Թաղամաս
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-[#1a1c1c] border border-[#4d4732] focus:border-[#ffd700] px-3 py-2 text-xs text-[#e2e2e2] outline-none"
              >
                {districts.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-['Archivo_Narrow'] font-bold text-[#ffd700] uppercase mb-1">
              Տեղակայում / Հասցե *
            </label>
            <input
              type="text"
              required
              placeholder="օր. Սարյան փողոց, Սուրճի կրպակի մոտ"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#1a1c1c] border border-[#4d4732] focus:border-[#ffd700] px-3 py-2 text-xs text-[#e2e2e2] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-['Archivo_Narrow'] font-bold text-[#ffd700] uppercase mb-1">
              Վտանգավորության Աստիճան
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'medium', label: 'ՄԻՋԻՆ', color: 'border-amber-500 text-amber-400' },
                { id: 'high', label: 'ԲԱՐՁՐ', color: 'border-rose-500 text-rose-400' },
                { id: 'critical', label: 'ԿՐԻՏԻԿԱԿԱՆ', color: 'border-purple-500 text-purple-400' }
              ].map((sev) => (
                <button
                  type="button"
                  key={sev.id}
                  onClick={() => setSeverity(sev.id)}
                  className={`py-2 text-[10px] font-['Archivo_Narrow'] font-bold uppercase border transition-all ${
                    severity === sev.id ? 'bg-[#ffd700] text-[#1a1a1a] border-[#ffd700]' : `bg-[#1a1c1c] ${sev.color}`
                  }`}
                >
                  {sev.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-['Archivo_Narrow'] font-bold text-[#ffd700] uppercase mb-1">
              «Թանգարանային» Նկարագրություն / Quote
            </label>
            <textarea
              rows="2"
              placeholder="օր. Քաղաքային անփութության և հավերժական պլաստիկի սիմվոլ..."
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="w-full bg-[#1a1c1c] border border-[#4d4732] focus:border-[#ffd700] px-3 py-2 text-xs text-[#e2e2e2] outline-none resize-none"
            />
          </div>

          <div className="bg-[#1a1c1c] p-3 border border-[#4d4732] flex justify-between items-center text-xs">
            <span className="text-[#d0c6ab]">ՊԱՐԳԵՎԱՏՐՈՒՄ ՄԱՔՐԵԼՈՒ ՀԱՄԱՐ:</span>
            <span className="font-['Archivo_Narrow'] font-black text-[#ffd700]">
              +{categoryPoints[category] || 50} PTS
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#ffd700] text-[#1a1a1a] py-3 font-['Archivo_Narrow'] text-sm font-black uppercase tracking-wider hover:bg-[#e9c400] transition-all border border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]"
          >
            + ԱՎԵԼԱՑՆԵԼ ՑՈՒՑԱՆՄՈՒՇԸ ՏՎՅԱԼՆԵՐԻ ԲԱԶԱ
          </button>
        </form>
      </div>
    </div>
  );
}
