/**
 * Ambient audio manager for Cyber Symphony 2026.
 * Generates an ultra-warm, quiet, analog ambient harmonic atmospheric drone.
 * Resilient to browser autoplay policies with seamless invisible interaction listener fallback.
 */

class AmbientAudioManager {
  private isPlaying: boolean = false;
  private audioCtx: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private fallbackAttached: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.attachInvisibleListeners();
    }
  }

  /**
   * Attempt immediate playback upon loading finish.
   * If browser blocks unmuted autoplay, smoothly attach invisible one-time listeners.
   */
  public async autoPlayWithFallback(): Promise<void> {
    if (this.isPlaying) return;

    try {
      await this.enable();
    } catch {
      this.attachInvisibleListeners();
    }
  }

  public attachInvisibleListeners(): void {
    if (this.fallbackAttached || typeof window === 'undefined') return;
    this.fallbackAttached = true;

    const startOnce = async () => {
      window.removeEventListener('pointerdown', startOnce);
      window.removeEventListener('touchstart', startOnce);
      window.removeEventListener('keydown', startOnce);
      window.removeEventListener('wheel', startOnce);

      try {
        await this.enable();
      } catch {
        // Silent catch
      }
    };

    window.addEventListener('pointerdown', startOnce, { passive: true, once: true });
    window.addEventListener('touchstart', startOnce, { passive: true, once: true });
    window.addEventListener('keydown', startOnce, { passive: true, once: true });
    window.addEventListener('wheel', startOnce, { passive: true, once: true });
  }

  public async enable(): Promise<void> {
    if (this.isPlaying && this.audioCtx && this.audioCtx.state === 'running') return;

    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }

      if (this.audioCtx.state === 'suspended') {
        await this.audioCtx.resume();
      }

      if (this.oscillators.length === 0) {
        // Master warm, quiet gain node (volume ~0.08–0.12)
        this.gainNode = this.audioCtx.createGain();
        this.gainNode.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
        this.gainNode.gain.exponentialRampToValueAtTime(0.032, this.audioCtx.currentTime + 3.0);

        // Low pass filter for dark, warm analog atmosphere
        const filter = this.audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(140, this.audioCtx.currentTime);

        this.gainNode.connect(filter);
        filter.connect(this.audioCtx.destination);

        // Calm ambient harmonic chords: D2 (73.42Hz), A2 (110Hz), D3 (146.83Hz), F#3 (185Hz)
        const freqs = [73.42, 110.0, 146.83, 185.0];
        freqs.forEach((freq) => {
          const osc = this.audioCtx!.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.audioCtx!.currentTime);
          osc.connect(this.gainNode!);
          osc.start();
          this.oscillators.push(osc);
        });
      }

      this.isPlaying = true;
    } catch {
      this.attachInvisibleListeners();
    }
  }

  public disable(): void {
    if (this.gainNode && this.audioCtx) {
      try {
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.audioCtx.currentTime);
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.5);
        setTimeout(() => {
          this.oscillators.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {
              // ignore
            }
          });
          this.oscillators = [];
          if (this.audioCtx && this.audioCtx.state !== 'closed') {
            this.audioCtx.close();
            this.audioCtx = null;
          }
        }, 550);
      } catch {
        // ignore
      }
    }
    this.isPlaying = false;
  }
}

export const ambientAudio = new AmbientAudioManager();
