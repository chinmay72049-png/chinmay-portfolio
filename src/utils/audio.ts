// Web Audio synthesizer for ambient cybernetic soundscapes and interactive feedback
class SoundFX {
  private ctx: AudioContext | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isMuted: boolean = true;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.initCtx();
    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startAmbient();
      this.playChime(520, 'sine', 0.1, 0.2);
    } else {
      this.stopAmbient();
    }
    return !this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  private startAmbient() {
    if (!this.ctx || this.ambientGain) return;
    try {
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      this.ambientGain.connect(this.ctx.destination);

      // Low frequency drone (55Hz / A1)
      this.ambientOsc1 = this.ctx.createOscillator();
      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(55, this.ctx.currentTime);
      this.ambientOsc1.connect(this.ambientGain);
      this.ambientOsc1.start();

      // Subtle harmonic shimmer (110Hz)
      this.ambientOsc2 = this.ctx.createOscillator();
      this.ambientOsc2.type = 'triangle';
      this.ambientOsc2.frequency.setValueAtTime(110.2, this.ctx.currentTime);
      this.ambientOsc2.connect(this.ambientGain);
      this.ambientOsc2.start();
    } catch {
      // Audio context might be restricted
    }
  }

  private stopAmbient() {
    try {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          this.ambientOsc1?.stop();
          this.ambientOsc2?.stop();
          this.ambientOsc1?.disconnect();
          this.ambientOsc2?.disconnect();
          this.ambientGain?.disconnect();
          this.ambientOsc1 = null;
          this.ambientOsc2 = null;
          this.ambientGain = null;
        }, 500);
      }
    } catch {
      // Ignore cleanup error
    }
  }

  public playChime(freq = 440, type: OscillatorType = 'sine', duration = 0.15, gainVal = 0.08) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Fail silently
    }
  }

  public playNodePulse() {
    this.playChime(660, 'sine', 0.25, 0.05);
    setTimeout(() => this.playChime(880, 'sine', 0.2, 0.03), 80);
  }

  public playScanSound() {
    this.playChime(320, 'triangle', 0.1, 0.04);
  }
}

export const soundFX = new SoundFX();
