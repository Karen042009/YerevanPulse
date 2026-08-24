import { readString, writeStorage } from './storage';

export const themes = [
  {
    id: 'cyber-gold',
    nameHy: '⚡ Cyber Neon (Դասական)',
    nameEn: '⚡ Cyber Neon (Default)',
    primaryColor: '#ffc700',
    secondaryColor: '#00f5d4',
    accentColor: '#ff007a',
    previewBg: '#090c12'
  },
  {
    id: 'tufa-red',
    nameHy: '🏛️ Yerevan Tufa Red (Երևանյան Տուֆ)',
    nameEn: '🏛️ Yerevan Tufa Red (Terracotta)',
    primaryColor: '#ff5733',
    secondaryColor: '#ffa07a',
    accentColor: '#e63946',
    previewBg: '#1f100c'
  },
  {
    id: 'matrix-green',
    nameHy: '🌿 Ararat Matrix (Արարատ Մատրիցա)',
    nameEn: '🌿 Ararat Matrix (Bio Green)',
    primaryColor: '#39ff14',
    secondaryColor: '#00e5ff',
    accentColor: '#ffb703',
    previewBg: '#0a1c11'
  },
  {
    id: 'synth-purple',
    nameHy: '🌆 Solar Purple (Արևային Մանուշակ)',
    nameEn: '🌆 Solar Purple (Synthwave)',
    primaryColor: '#b5179e',
    secondaryColor: '#48cae4',
    accentColor: '#f72585',
    previewBg: '#190a28'
  },
  {
    id: 'sevan-blue',
    nameHy: '🌊 Sevan Cyber (Սևանա Կապույտ)',
    nameEn: '🌊 Sevan Cyber (Deep Cobalt)',
    primaryColor: '#00f5d4',
    secondaryColor: '#0096c7',
    accentColor: '#48cae4',
    previewBg: '#031926'
  },
  {
    id: 'cascade-amber',
    nameHy: '🌇 Cascade Amber (Կասկադ Ամբեր)',
    nameEn: '🌇 Cascade Amber (Yerevan Sunset)',
    primaryColor: '#ff9e00',
    secondaryColor: '#ff6000',
    accentColor: '#ff0054',
    previewBg: '#1c1008'
  }
];

export function getStoredTheme() {
  return readString('yp_theme', 'cyber-gold');
}

export function applyTheme(themeId) {
  if (typeof document === 'undefined') return;

  const validTheme = themes.find(t => t.id === themeId) ? themeId : 'cyber-gold';
  document.documentElement.setAttribute('data-theme', validTheme);
  writeStorage('yp_theme', validTheme);
}
