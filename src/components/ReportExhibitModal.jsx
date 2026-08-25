import React, { useState } from 'react';
import { soundFX } from '../utils/audioFX';

export default function ReportExhibitModal({ isOpen, onClose, onAddExhibit, districts, exhibits = [], currentUser }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Պլաստիկ');
  const [district, setDistrict] = useState(districts[0]?.name || 'Կենտրոն');
  const [location, setLocation] = useState('');
  const [quote, setQuote] = useState('');
  const [severity, setSeverity] = useState('high');
  const [imagePreview, setImagePreview] = useState('/images/plastic_bottle.jpg');
  const selectedDistrict = districts.find((item) => item.name === district);


  if (!isOpen) return null;

  const photoPresets = [
    { label: '🍾 Շիշ (Bottle)', url: '/images/plastic_bottle.jpg' },
    { label: '🚬 Ծխախոտ (Cigarette)', url: '/images/cigarette_butt.jpg' },
    { label: '📱 Վեյփ (Vape Device)', url: '/images/vape_device.jpg' },
    { label: '☕ Բաժակ (Coffee Cup)', url: '/images/coffee_cup.jpg' },
    { label: '🍾 Ապակի (Glass)', url: '/images/shattered_glass.jpg' }
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

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !location.trim()) return;

    soundFX.playSuccess();

    const usedCodes = new Set(exhibits.map((exhibit) => exhibit.code.toLowerCase()));
    let randomCodeNum;
    do {
      randomCodeNum = Math.floor(100 + Math.random() * 900);
    } while (usedCodes.has(`yvn-${randomCodeNum}`));
    const newExhibit = {
      id: `ex-${Date.now()}`,
      code: `YVN-${randomCodeNum}`,
      title: title.trim(),
      titleEn: title.trim(),
      category: category,
      location: location.trim(),
      locationEn: location.trim(),
      district: district,
      districtEn: selectedDistrict?.nameEn || district,
      lifespanYears: categoryLifespans[category] || 100,
      curator: currentUser?.name || 'Քաղաքացիական Ակտիվիստ',
      points: categoryPoints[category] || 50,
      quote: quote.trim() || `XXI դարի ${category.toLowerCase()} արտեֆակտ Երևանի փողոցում:`,
      quoteEn: quote.trim() || `21st century ${category.toLowerCase()} artifact on Yerevan street.`,
      audioText: `Նոր ֆիքսված ցուցանմուշ ${district} թաղամասում՝ ${location.trim()} հասցեում։`,
      audioTextEn: `New documented exhibit in ${district} district at ${location.trim()}.`,
      cleaned: false,
      cleanedBy: null,
      cleanedAt: null,
      coordinates: { 
        x: Math.floor(25 + Math.random() * 50), 
        y: Math.floor(25 + Math.random() * 50) 
      },
      icon: categoryIcons[category] || '🗑️',
      severity: severity,
      imageUrl: imagePreview
    };

    onAddExhibit(newExhibit);
    onClose();

    // Reset form
    setTitle('');
    setLocation('');
    setQuote('');
    setImagePreview('/images/plastic_bottle.jpg');
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[var(--surface-1)] border-2 border-[var(--primary-gold)] p-6 max-w-lg w-full shadow-[0_0_50px_var(--primary-gold-glow)] space-y-6 relative max-h-[90vh] overflow-y-auto rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-gray-700 pb-4">
          <div>
            <span className="text-[10px] font-mono text-[var(--primary-gold)] uppercase tracking-widest bg-black px-2 py-0.5 border border-[var(--primary-gold)] rounded">
              + CIVIC REPORTING
            </span>
            <h2 className="font-['Outfit'] text-2xl font-black uppercase text-white mt-1">
              ԱՎԵԼԱՑՆԵԼ ՆՈՐ ՑՈՒՑԱՆՄՈՒՇ
            </h2>
            <p className="text-xs text-gray-300 mt-0.5">
              Արձանագրեք Երևանի փողոցում գտնված «հավերժական արտեֆակտը» ({currentUser?.name})
            </p>
          </div>
          <button
            onClick={() => { soundFX.playClick(); onClose(); }}
            className="text-gray-400 hover:text-[var(--primary-gold)] text-xl font-bold p-1"
          >
            ✕
          </button>
        </div>

        {/* Image Preview & Upload Box */}
        <div className="space-y-2">
          <label className="block text-xs font-['Space_Grotesk'] font-bold text-[var(--primary-gold)] uppercase">
            Ցուցանմուշի Լուսանկար / Image Upload
          </label>
          
          <div className="relative h-48 w-full bg-black border-2 border-[var(--primary-gold)] overflow-hidden rounded flex items-center justify-center group">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity" 
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <label className="bg-[var(--primary-gold)] text-[var(--bg-main)] px-4 py-2 text-xs font-bold uppercase cursor-pointer rounded shadow-lg">
                📷 Բեռնել Նկար (Upload Photo)
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
            {photoPresets.map((preset, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => setImagePreview(preset.url)}
                className={`p-2 border text-xs font-['Archivo_Narrow'] font-bold flex items-center justify-center gap-1 transition-all rounded ${
                  imagePreview === preset.url ? 'bg-[var(--primary-gold)] text-black border-white shadow-md' : 'bg-[var(--surface-2)] text-gray-200 border-gray-700 hover:border-[var(--primary-gold)]'
                }`}
              >
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-['Space_Grotesk'] font-bold text-[var(--primary-gold)] uppercase mb-1">
              Ցուցանմուշի Անվանումը *
            </label>
            <input
              type="text"
              required
              placeholder="օր. Պլաստիկ Ջրի Շիշ #109"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[var(--bg-main)] border border-gray-700 focus:border-[var(--primary-gold)] px-3 py-2 text-xs text-white outline-none rounded"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-['Space_Grotesk'] font-bold text-[var(--primary-gold)] uppercase mb-1">
                Աղբի Կատեգորիա
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[var(--bg-main)] border border-gray-700 focus:border-[var(--primary-gold)] px-3 py-2 text-xs text-white outline-none rounded"
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
              <label className="block text-xs font-['Space_Grotesk'] font-bold text-[var(--primary-gold)] uppercase mb-1">
                Թաղամաս
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-[var(--bg-main)] border border-gray-700 focus:border-[var(--primary-gold)] px-3 py-2 text-xs text-white outline-none rounded"
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
            <label className="block text-xs font-['Space_Grotesk'] font-bold text-[var(--primary-gold)] uppercase mb-1">
              Տեղակայում / Հասցե *
            </label>
            <input
              type="text"
              required
              placeholder="օր. Սարյան փողոց, Սուրճի կրպակի մոտ"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[var(--bg-main)] border border-gray-700 focus:border-[var(--primary-gold)] px-3 py-2 text-xs text-white outline-none rounded"
            />
          </div>

          <div>
            <label className="block text-xs font-['Space_Grotesk'] font-bold text-[var(--primary-gold)] uppercase mb-1">
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
                  className={`py-2 text-[10px] font-['Space_Grotesk'] font-bold uppercase border transition-all rounded ${
                    severity === sev.id ? 'bg-[var(--primary-gold)] text-black border-[var(--primary-gold)]' : `bg-[var(--bg-main)] ${sev.color}`
                  }`}
                >
                  {sev.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-['Space_Grotesk'] font-bold text-[var(--primary-gold)] uppercase mb-1">
              «Թանգարանային» Նկարագրություն / Quote
            </label>
            <textarea
              rows="2"
              placeholder="օր. Քաղաքային անփութության և հավերժական պլաստիկի սիմվոլ..."
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="w-full bg-[var(--bg-main)] border border-gray-700 focus:border-[var(--primary-gold)] px-3 py-2 text-xs text-white outline-none resize-none rounded"
            />
          </div>

          <div className="bg-[var(--bg-main)] p-3 border border-gray-700 flex justify-between items-center text-xs rounded">
            <span className="text-gray-300">ՊԱՐԳԵՎԱՏՐՈՒՄ ՄԱՔՐԵԼՈՒ ՀԱՄԱՐ:</span>
            <span className="font-['Space_Grotesk'] font-black text-[var(--primary-gold)]">
              +{categoryPoints[category] || 50} PTS
            </span>
          </div>

          <button
            type="submit"
            className="btn-primary-glow w-full py-3.5 text-sm font-black uppercase tracking-wider rounded"
          >
            + ԱՎԵԼԱՑՆԵԼ ՑՈՒՑԱՆՄՈՒՇԸ ՏՎՅԱԼՆԵՐԻ ԲԱԶԱ
          </button>
        </form>
      </div>
    </div>
  );
}
