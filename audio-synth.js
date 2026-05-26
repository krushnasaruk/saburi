/**
 * Virtual Gurukul - Indian Instrument Web Audio Synthesizer
 * Generates an authentic, atmospheric Indian classical Tanpura drone
 * and soft Bansuri flute melodies using pure mathematical sound synthesis.
 * Requires zero external audio files.
 */

let audioCtx = null;
let masterGain = null;
let isPlaying = false;
let droneOscillators = [];
let fluteInterval = null;

// Initialize Audio Context on click
function initAudio() {
  if (audioCtx) return;
  
  // Cross-browser AudioContext
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContextClass();
  
  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
  masterGain.connect(audioCtx.destination);
}

/**
 * Synthesizes a Tanpura string drone
 * Standard Tanpura tune: Pa - Sa - Sa - Sa (5th, Root octave, Root octave, Root fundamental)
 */
function startTanpuraDrone() {
  if (!audioCtx) return;

  const baseFreq = 110; // Root note A2 (approx 110Hz)
  const Pa = baseFreq * 1.5; // E3 (fifth)
  const SaOctave = baseFreq * 2; // A3 (root octave)
  const SaFund = baseFreq; // A2 (root)

  const frequencies = [Pa, SaOctave, SaOctave * 1.005, SaFund]; // slightly detuned for chorus richness

  frequencies.forEach((freq, idx) => {
    // Fundamental oscillator (triangle for warmth)
    const oscTri = audioCtx.createOscillator();
    oscTri.type = "triangle";
    oscTri.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Harmonic oscillator (sawtooth for string buzz/pluck)
    const oscSaw = audioCtx.createOscillator();
    oscSaw.type = "sawtooth";
    oscSaw.frequency.setValueAtTime(freq * 2, audioCtx.currentTime);

    // Filters to make it warm and earthy
    const lpFilter = audioCtx.createBiquadFilter();
    lpFilter.type = "lowpass";
    lpFilter.frequency.setValueAtTime(450, audioCtx.currentTime); // filter out harsh buzz

    // Pluck modulator LFO (slow volume swell to mimic manual plucking cycles)
    const lfo = audioCtx.createOscillator();
    lfo.type = "sine";
    // Slightly offset frequencies for each string pluck rate
    lfo.frequency.setValueAtTime(0.12 + (idx * 0.05), audioCtx.currentTime);

    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(0.15, audioCtx.currentTime);

    const stringGain = audioCtx.createGain();
    stringGain.gain.setValueAtTime(0.04, audioCtx.currentTime);

    // Connect LFO modulation to string gains
    lfo.connect(lfoGain);
    lfoGain.connect(stringGain.gain);

    // Audio node routing
    oscTri.connect(stringGain);
    oscSaw.connect(lpFilter);
    lpFilter.connect(stringGain);
    stringGain.connect(masterGain);

    // Start oscillators
    oscTri.start();
    oscSaw.start();
    lfo.start();

    // Store reference to close later
    droneOscillators.push(oscTri, oscSaw, lfo);
  });
}

/**
 * Synthesizes a soft, expressive Bansuri flute melody note
 */
function playFluteNote(freq, duration) {
  if (!audioCtx || audioCtx.state === "suspended") return;

  const now = audioCtx.currentTime;
  
  // Oscillator combination (triangle + sine for wooden breathy flute tone)
  const osc = audioCtx.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, now);

  const breathNoise = audioCtx.createOscillator();
  breathNoise.type = "sine";
  breathNoise.frequency.setValueAtTime(freq * 3.01, now); // subtle breath harmonic

  // vibrato (LFO on flute frequency)
  const vibrato = audioCtx.createOscillator();
  vibrato.type = "sine";
  vibrato.frequency.setValueAtTime(5.8, now); // 5.8Hz natural vocal vibrato

  const vibratoGain = audioCtx.createGain();
  vibratoGain.gain.setValueAtTime(3.5, now); // vibrato depth (Hz)

  vibrato.connect(vibratoGain);
  vibratoGain.connect(osc.frequency);

  // Filter to soften the wave
  const filter = audioCtx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1200, now);

  // Volume envelope (slow soft attack and long fade out)
  const noteGain = audioCtx.createGain();
  noteGain.gain.setValueAtTime(0, now);
  noteGain.gain.linearRampToValueAtTime(0.12, now + 0.6); // smooth breathing attack
  noteGain.gain.setValueAtTime(0.12, now + duration - 0.8);
  noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration); // smooth release

  // Connections
  osc.connect(filter);
  breathNoise.connect(filter);
  filter.connect(noteGain);
  noteGain.connect(masterGain);

  // Play
  vibrato.start();
  osc.start();
  breathNoise.start();

  vibrato.stop(now + duration);
  osc.stop(now + duration);
  breathNoise.stop(now + duration);
}

// Generate simple meditative raga patterns (Bhupali Scale: C D E G A - pentatonic major)
function startFluteRagaMelody() {
  // Translate to frequencies based on raga intervals
  const ragaFreqs = [
    220.00, // A3 (Sa)
    247.50, // B3 (Re)
    275.00, // C#4 (Ga)
    330.00, // E4 (Pa)
    366.67, // F#4 (Dha)
    440.00, // A4 (Sa upper)
    495.00  // B4 (Re upper)
  ];

  function playNextMelodyPart() {
    if (!isPlaying) return;
    
    // Choose random sequence of 3-4 notes from scale
    const noteCount = Math.floor(Math.random() * 2) + 2; 
    let delay = 0;
    
    for (let i = 0; i < noteCount; i++) {
      const freq = ragaFreqs[Math.floor(Math.random() * ragaFreqs.length)];
      const duration = 2.5 + Math.random() * 1.5;
      
      setTimeout(() => {
        if (isPlaying) playFluteNote(freq, duration);
      }, delay * 1000);
      
      delay += duration - 0.7; // slight overlap for legato
    }
  }

  // Initial play
  playNextMelodyPart();

  // Periodically trigger a short phrase
  fluteInterval = setInterval(() => {
    playNextMelodyPart();
  }, 10000);
}

export const AudioSynth = {
  toggle: () => {
    initAudio();

    if (isPlaying) {
      // Fade out master gain to prevent pops
      masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
      
      setTimeout(() => {
        // Stop all oscillators
        droneOscillators.forEach(osc => {
          try { osc.stop(); } catch(e) {}
        });
        droneOscillators = [];
        clearInterval(fluteInterval);
        
        if (audioCtx.state !== "closed") {
          audioCtx.suspend();
        }
        isPlaying = false;
      }, 1200);

      return false;
    } else {
      audioCtx.resume().then(() => {
        isPlaying = true;
        
        // Start Tanpura base
        startTanpuraDrone();
        
        // Start atmospheric raga flute
        startFluteRagaMelody();

        // Fade in master gain smoothly
        masterGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(1.0, audioCtx.currentTime + 2.0);
      });

      return true;
    }
  },
  
  getStatus: () => {
    return isPlaying;
  }
};
