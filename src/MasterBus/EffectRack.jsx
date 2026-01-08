import React, { useRef, useEffect, useState } from "react";
import * as Tone from "tone";
import { masterBus } from "./MasterBus"; // Connect to our global mixer

const EffectRack = () => {
  const reverbRef = useRef(null);
  const [wetAmount, setWetAmount] = useState(0.5); // 0 = Dry, 1 = Fully Reverberated

  useEffect(() => {
    // 1. ALLOCATION: Create the Reverb 'Hardware'
    // decay: how long the echo lasts (in seconds)
    // preDelay: the gap before the echo starts
    reverbRef.current = new Tone.Reverb({
      decay: 4, 
      preDelay: 0.01
    }).toDestination(); 

    // 2. WIRING: Connect the Master Bus into the Reverb
    // In C: bus->output = reverb_process(bus->signal)
    masterBus.connect(reverbRef.current);

    return () => {
      if (reverbRef.current) reverbRef.current.dispose();
    };
  }, []);

  const handleMixChange = (e) => {
    const val = parseFloat(e.target.value);
    setWetAmount(val);
    // 'wet' is the ratio of Effect vs Original sound (0.0 to 1.0)
    if (reverbRef.current) {
      reverbRef.current.wet.value = val;
    }
  };

  return (
    <div style={{ border: "2px solid #8b5cf6", padding: "20px", margin: "20px" }}>
      <h3>Room Reverb (FX)</h3>
      <input 
        type="range" 
        min="0" 
        max="1" 
        step="0.1" 
        value={wetAmount} 
        onChange={handleMixChange} 
      />
      <span> Mix: {(wetAmount * 100).toFixed(0)}%</span>
    </div>
  );
};

export default EffectRack;
