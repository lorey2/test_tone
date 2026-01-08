import React from "react";
import SynthButton from "./SynthButton";
import DrumButton from "./DrumButton";
import SamplerButton from "./SamplerButton";
import LazySamplerButton from "./LazySamplerButton";
import PolySynthButton from "./PolySynthButton";
import MasterBusController from "./MasterBus/MasterBus";
import SythMasterButton from "./MasterBus/SythMasterButton";
import EffectRack from "./MasterBus/EffectRack";

function App() {
  const theme = {
    bg: "#0f172a",
    panel: "#1e293b",
    border: "#334155",
    accent: "#38bdf8",
    master: "#10b981",
    warning: "#fbbf24",
    text: "#f8fafc",
    subtext: "#94a3b8"
  };

  const rackStyle = {
    backgroundColor: theme.panel,
    border: `1px solid ${theme.border}`,
    borderRadius: "12px",
    padding: "30px",
    margin: "0 auto 30px auto",
    maxWidth: "900px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.4)",
  };

  const arrowStyle = {
    fontSize: "1.5rem",
    color: theme.master,
    padding: "0 10px",
    display: "flex",
    alignItems: "center"
  };

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, minHeight: "100vh", padding: "40px", fontFamily: "'JetBrains Mono', monospace" }}>
      
      <header style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", letterSpacing: "-1px" }}>
          VIBE STATION <span style={{ color: theme.accent }}>v1.0</span>
        </h1>
        <p style={{ color: theme.subtext }}>[ Audio Signal Chain Debugger ]</p>
      </header>

      {/* 1. MELODY */}
      <div style={rackStyle}>
        <h3>Melody</h3>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
          <SynthButton note="A3" label="Play A" />
          <SynthButton note="B3" label="Play B" />
          <SynthButton note="C4" label="Play C" />
          <SynthButton note="D4" label="Play D" />
          <SynthButton note="E4" label="Play E" />
          <SynthButton note="F4" label="Play F" />
          <SynthButton note="G4" label="Play G" />
          <SynthButton note="A4" label="Play A" />
        </div>
      </div>

      {/* 2. RHYTHM */}
      <div style={rackStyle}>
        <h3>Rhythm</h3>
        <DrumButton label="KICK" />
      </div>

      {/* 3. SAMPLES */}
      <div style={rackStyle}>
        <h3>Sample (preloaded)</h3>
        <SamplerButton
          label="Clap"
          sampleUrl="https://tonejs.github.io/audio/berklee/gong_1.mp3"
          note="C4"
        />
      </div>

      {/* 4. LAZY SAMPLES */}
      <div style={rackStyle}>
        <h3>Sample (not preloaded (less ram usage/load takes longer))</h3>
        <LazySamplerButton
          label="Clap"
          sampleUrl="https://tonejs.github.io/audio/berklee/gong_1.mp3"
          note="C4"
        />
      </div>

      {/* 5. POLYPHONY */}
      <div style={{ ...rackStyle, borderLeft: `4px solid ${theme.warning}` }}>
        <h3 style={{ color: theme.warning }}>
          Polysyth (just a syth that can handle array of note at the same time)
        </h3>
        <p style={{ fontSize: "0.9rem", color: theme.subtext, marginBottom: "20px" }}>
          Careful here the amplitude is summed so we need lower the volume
        </p>
        <PolySynthButton label="Polysyth" notes={["C4", "E4", "G4"]} />
      </div>

      {/* 6. MASTER BUS (THE SIGNAL PATH BOX) */}
      <div style={{ ...rackStyle, border: `2px solid ${theme.master}`, backgroundColor: "#064e3b22" }}>
        <h3 style={{ color: theme.master }}>
          Master Bus Controller. No longer toDestination() but connect(masterBus)
        </h3>
        
        {/* Visual Path Flow */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "10px", marginTop: "30px" }}>
          
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "0.7rem", color: theme.subtext }}>SOURCE</span>
            <div style={{ border: `1px solid ${theme.border}`, padding: "15px", borderRadius: "8px", background: theme.bg }}>
              <SythMasterButton label="FX Synth" note="C4" />
            </div>
          </div>

          <div style={arrowStyle}>➔</div>

          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "0.7rem", color: theme.subtext }}>MIXER</span>
            <div style={{ border: `1px solid ${theme.border}`, padding: "15px", borderRadius: "8px", background: theme.bg }}>
              <MasterBusController />
            </div>
          </div>

          <div style={arrowStyle}>➔</div>

          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "0.7rem", color: theme.subtext }}>PROCESSING</span>
            <div style={{ border: `1px solid ${theme.border}`, padding: "15px", borderRadius: "8px", background: theme.bg }}>
              <EffectRack />
            </div>
          </div>

          <div style={arrowStyle}>➔</div>

          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "0.7rem", color: theme.subtext }}>HARDWARE</span>
            <div style={{ fontSize: "1.5rem", padding: "10px" }}>🔊</div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
