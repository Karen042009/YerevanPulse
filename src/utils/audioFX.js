// Web Audio API Synthesizer & Speech Audio Guide Manager for Yerevan Pulse

class SoundFX {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('yp_sound_muted') === 'true';
    this.isSpeaking = false;
    this.speechSynth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('yp_sound_muted', this.isMuted.toString());
    if (this.isMuted && this.speechSynth) {
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
      osc.frequency.setValueAtTime(650, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      console.log('Audio error:', e);
    }
  }

  // Clean Exhibit / Point Gain Chime (Success Sound)
  playSuccess() {
    try {
      this.init();
      if (!this.ctx || this.isMuted) return;

      const now = this.ctx.currentTime;
      // Joyful arpeggio sequence: C5 -> E5 -> G5 -> C6 -> E6
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
    } catch (e) {
      console.log('Audio error:', e);
    }
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
    } catch (e) {
      console.log('Audio error:', e);
    }
  }

  // Badge Unlock fanfare
  playBadgeUnlock() {
    try {
      this.init();
      if (!this.ctx || this.isMuted) return;

      const now = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.18, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.4);
      });
    } catch (e) {
      console.log('Audio error:', e);
    }
  }

  // Web Speech API - Text to Speech for Museum Audio Guide
  speakAudioGuide(text, lang = 'hy', onEndCallback = null) {
    if (!this.speechSynth || this.isMuted) return;

    this.stopSpeech();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; // Clear pace for museum narration
    utterance.pitch = 1.0;

    // Try to set voice for language
    const voices = this.speechSynth.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(lang) || v.lang.startsWith(lang === 'hy' ? 'hy' : 'en'));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    } else {
      utterance.lang = lang === 'hy' ? 'hy-AM' : 'en-US';
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
    };

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
    this.isSpeaking = false;
    this.currentUtterance = null;
  }
}

export const soundFX = new SoundFX();
