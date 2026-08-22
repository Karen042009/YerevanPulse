import { readString, writeStorage } from './storage';
// Web Audio API Synthesizer & Speech Audio Guide Engine for Yerevan Pulse

class SoundFX {
  constructor() {
    this.ctx = null;
    this.isMuted = readString('yp_sound_muted', 'false') === 'true';
    this.isSpeaking = false;
    this.speechSynth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;

    // Auto-unlock AudioContext on first user click
    if (typeof window !== 'undefined') {
      const unlockAudio = () => {
        this.init();
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
      };
      window.addEventListener('click', unlockAudio);
      window.addEventListener('touchstart', unlockAudio);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    writeStorage('yp_sound_muted', this.isMuted.toString());
    if (this.isMuted) {
      this.stopSpeech();
    }
    return this.isMuted;
  }

  init() {
    if (this.isMuted) return;
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Satisfying Click sound
  playClick() {
    try {
      this.init();
      if (!this.ctx || this.isMuted) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      console.log('Audio error:', e);
    }
  }

  // Clean Exhibit / Point Gain Chime (Success Sound)
  playSuccess() {
    try {
      this.init();
      if (!this.ctx || this.isMuted) return;

      const now = this.ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51];

      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.14, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.28);
      });
    } catch {
      console.log('Audio error:', e);
    }
  }

  playBadgeUnlock() {
    this.playSuccess();
  }

  // QR Scan Chirp Sound
  playScanChirp() {
    try {
      this.init();
      if (!this.ctx || this.isMuted) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(1750, now + 0.12);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      console.log('Audio error:', e);
    }
  }

  // Convert Armenian Unicode text into clean phonetic speech for SpeechSynthesis
  armenianToPhonetic(text) {
    const map = {
      'ա': 'a', 'բ': 'b', 'գ': 'g', 'դ': 'd', 'ե': 'e', 'զ': 'z', 'է': 'e', 'ը': 'e',
      'թ': 't', 'ժ': 'zh', 'ի': 'i', 'լ': 'l', 'խ': 'kh', 'ծ': 'ts', 'կ': 'k', 'հ': 'h',
      'ձ': 'dz', 'ղ': 'gh', 'ճ': 'ch', 'մ': 'm', 'յ': 'y', 'ն': 'n', 'շ': 'sh', 'ո': 'o',
      'չ': 'ch', 'պ': 'p', 'ջ': 'j', 'ռ': 'r', 'ս': 's', 'վ': 'v', 'տ': 't', 'ր': 'r',
      'ց': 'ts', 'ու': 'oo', 'փ': 'p', 'ք': 'k', 'և': 'ev', 'օ': 'o', 'ֆ': 'f',
      'Ա': 'A', 'Բ': 'B', 'Գ': 'G', 'Դ': 'D', 'Ե': 'E', 'Զ': 'Z', 'Է': 'E', 'Ը': 'E',
      'Թ': 'T', 'Ժ': 'Zh', 'Ի': 'I', 'Լ': 'L', 'Խ': 'Kh', 'Ծ': 'Ts', 'Կ': 'K', 'Հ': 'H',
      'Ձ': 'Dz', 'Ղ': 'Gh', 'Ճ': 'Ch', 'Մ': 'M', 'Յ': 'Y', 'Ն': 'N', 'Շ': 'Sh', 'Ո': 'O',
      'Չ': 'Ch', 'Պ': 'P', 'Ջ': 'J', 'Ռ': 'R', 'Ս': 'S', 'Վ': 'V', 'Տ': 'T', 'Ր': 'R',
      'Ց': 'Ts', 'ՈՒ': 'Oo', 'Փ': 'P', 'Ք': 'K', 'Ֆ': 'F'
    };

    return text.split('').map(char => map[char] || char).join('');
  }

  // High Quality Speech Synthesis for Armenian & English
  speakAudioGuide(text, lang = 'hy', onEndCallback = null) {
    if (this.isMuted) return;
    this.stopSpeech();
    this.isSpeaking = true;

    // Use Google Translate TTS endpoint (client=gtx avoids CORS blocks in audio tags)
    // This guarantees authentic native Armenian voice instead of English phonetic reading
    try {
      const targetLang = lang === 'hy' ? 'hy' : 'en';
      const encodedText = encodeURIComponent(text.slice(0, 200));
      const ttsUrl = `https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=${targetLang}&q=${encodedText}`;

      this.audioElement = new Audio(ttsUrl);
      this.audioElement.playbackRate = targetLang === 'hy' ? 0.95 : 1.0;

      this.audioElement.onplay = () => {
        this.isSpeaking = true;
      };

      this.audioElement.onended = () => {
        this.isSpeaking = false;
        this.audioElement = null;
        if (onEndCallback) onEndCallback();
      };

      this.audioElement.onerror = () => {
        this.isSpeaking = false;
        this.audioElement = null;
        
        // Final fallback: phonetic browser synth if offline
        this.fallbackToBrowserSynth(text, lang, onEndCallback);
      };

      this.audioElement.play().catch(() => {
        this.isSpeaking = false;
        this.audioElement = null;
        this.fallbackToBrowserSynth(text, lang, onEndCallback);
      });
    } catch {
      this.isSpeaking = false;
      this.fallbackToBrowserSynth(text, lang, onEndCallback);
    }
  }

  fallbackToBrowserSynth(text, lang, onEndCallback) {
    if (!this.speechSynth) {
      if (onEndCallback) onEndCallback();
      return;
    }

    const voices = this.speechSynth.getVoices();
    const isHy = lang === 'hy';
    
    // Look for Armenian native voice or use Russian (better phonetics) or English
    let voice = isHy 
      ? voices.find(v => v.lang.startsWith('hy') || v.name.toLowerCase().includes('armenian'))
      : voices.find(v => v.lang.startsWith('en'));
      
    if (isHy && !voice) {
       voice = voices.find(v => v.lang.startsWith('ru')); // Russian accent reads Armenian phonetics better
    }

    const spokenText = (isHy && !voices.find(v => v.lang.startsWith('hy'))) ? this.armenianToPhonetic(text) : text;

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.rate = isHy ? 0.85 : 0.95;
    utterance.pitch = 1.0;

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = isHy ? 'ru-RU' : 'en-US';
    }

    utterance.onstart = () => { this.isSpeaking = true; };
    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (onEndCallback) onEndCallback();
    };
    utterance.onerror = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (onEndCallback) onEndCallback();
    };

    this.currentUtterance = utterance;
    this.speechSynth.speak(utterance);
  }

  stopSpeech() {
    if (this.speechSynth && this.speechSynth.speaking) {
      this.speechSynth.cancel();
    }
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.audioElement = null;
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
  }
}

export const soundFX = new SoundFX();
