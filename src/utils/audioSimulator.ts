/**
 * Web Audio API synthesized sound generator for radio preview
 * Ensures real, reliable audio playback in all browsers without broken external media files.
 */

let audioCtx: AudioContext | null = null;
let activeOscillators: (OscillatorNode | GainNode)[] = [];
let isSynthPlaying = false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function stopSyntheticAudio() {
  activeOscillators.forEach((node) => {
    try {
      if ('stop' in node) {
        (node as OscillatorNode).stop();
      }
      node.disconnect();
    } catch {
      // ignore already stopped nodes
    }
  });
  activeOscillators = [];
  isSynthPlaying = false;
}

export function playSyntheticTrack(type: 'jingle' | 'spot' | 'voice' | 'vinheta' = 'jingle', volume = 0.5) {
  try {
    stopSyntheticAudio();
    const ctx = getAudioContext();
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume * 0.35, ctx.currentTime);
    masterGain.connect(ctx.destination);
    activeOscillators.push(masterGain);
    isSynthPlaying = true;

    const now = ctx.currentTime;

    if (type === 'vinheta') {
      // Energetic Brass/Synth Triad Fanfare for Radio ID
      const notes = [440, 554.37, 659.25, 880]; // A major
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        noteGain.gain.setValueAtTime(0, now + idx * 0.12);
        noteGain.gain.linearRampToValueAtTime(0.3, now + idx * 0.12 + 0.05);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.6);
        osc.connect(noteGain);
        noteGain.connect(masterGain);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.65);
        activeOscillators.push(osc);
      });
    } else if (type === 'jingle') {
      // Bahia rhythmic chime progression (Axé/Marimba upbeat)
      const freqs = [523.25, 659.25, 783.99, 1046.5, 783.99, 880, 1046.5];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.18);
        noteGain.gain.setValueAtTime(0, now + i * 0.18);
        noteGain.gain.linearRampToValueAtTime(0.25, now + i * 0.18 + 0.04);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.18 + 0.4);
        osc.connect(noteGain);
        noteGain.connect(masterGain);
        osc.start(now + i * 0.18);
        osc.stop(now + i * 0.18 + 0.45);
        activeOscillators.push(osc);
      });
    } else {
      // Smooth ambient warm broadcast acoustic bed
      const rootFrequencies = [220, 277.18, 329.63, 440];
      rootFrequencies.forEach((freq) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        noteGain.gain.setValueAtTime(0.01, now);
        noteGain.gain.linearRampToValueAtTime(0.12, now + 0.4);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + 4.0);
        osc.connect(noteGain);
        noteGain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 4.1);
        activeOscillators.push(osc);
      });
    }
  } catch (err) {
    console.warn('Audio playback simulated in silent mode:', err);
  }
}
