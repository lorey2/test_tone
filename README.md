# 🎛️ Vibe Station: Tone.js + React Library

A modular, educational library for web-based audio synthesis. This project demonstrates how to encapsulate **Tone.js** audio nodes into reusable **React components** while maintaining strict control over the audio signal chain and memory management.

---

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Launch the development server:**
   ```bash
   npm run dev
   ```

---

## 🏗️ Architectural Mental Model (for C Programmers)

This project treats the Web Audio API like a piece of hardware. Instead of standard "Web Development," we focus on:

- **Memory Allocation**  
  Using `useRef` as a persistent pointer to keep audio nodes alive across UI re-renders.

- **The Constructor / Destructor**  
  Using `useEffect` to:
  - malloc (initialize) nodes on mount
  - free them with `.dispose()` on unmount to prevent memory leaks

- **The Interrupt Handler**  
  The browser's audio driver is suspended until a user gesture (click) calls:
  ```js
  Tone.start()
  ```

---

## 📂 Project Structure

```plaintext
src/
├── components/
│   ├── SynthButton.jsx        # Monophonic Oscillator (Direct Out)
│   ├── PolySynthButton.jsx    # Voice-managed Synth (Direct Out)
│   ├── DrumButton.jsx         # Membrane Synth for Kicks
│   ├── SamplerButton.jsx      # RAM-heavy (Preloaded) Buffer
│   └── LazySamplerButton.jsx  # RAM-optimized (Lazy Load) Buffer
├── MasterBus/
│   ├── MasterBus.jsx          # The Global Summing Channel (Mixer)
│   ├── EffectRack.jsx         # Serial FX (Reverb) with Bypass Logic
│   └── SythMasterButton.jsx   # The ONLY source wired to the Master Bus
└── App.jsx                    # The "Hardware Rack" UI & Signal Routing
```

---

## 🎹 The Library Modules

### 1. Monophonic & Polyphonic Synths

- **Melody Section**  
  Standard `Tone.Synth` nodes connected to `toDestination()`.

- **Polyphony**  
  A `PolySynth` managing an array of voices.

  ⚠️ **Logic Note**  
  In polyphony, amplitudes are summed:

  ```
  Output = V1 + V2 + …
  ```

  This project applies gain reduction to prevent digital clipping.

---

### 2. Rhythm & Sampling

- **Kick Drum**  
  Uses `MembraneSynth` with a fast pitch-drop envelope to simulate drum-head physics.

- **RAM Management**

  - **Preloaded**  
    Fetches and decodes the audio buffer on page load. Zero latency.

  - **Lazy Load**  
    Fetches only on first click. Saves RAM at the cost of initial delay.

---

### 3. The Master Chain (Serial Routing)

This section demonstrates a professional "Insert" chain. Unlike the standard buttons, the `SythMasterButton` follows this path:

```
Source ➜ Master Bus (Mixer) ➜ Effect Rack (Reverb) ➜ Hardware Out
```

---

## 🎚️ Features & Learning Points

- **Bypass Logic**  
  The `EffectRack` features a hardware-style bypass. It dynamically re-routes the `MasterBus` output directly to the hardware destination, bypassing the reverb to save CPU.

- **Visual Routing**  
  The UI includes a visual flow diagram showing exactly how the signal travels through the system.

- **Signal Summing (Gain Staging)**  
  Explains why summing multiple oscillators requires lower volume levels to avoid clipping.

---

## 🛠️ Tech Stack

- **Tone.js** — DSP and scheduling engine
- **React** — Component lifecycle and UI state
- **CSS Flexbox / Grid** — "Hardware Rack" aesthetic

