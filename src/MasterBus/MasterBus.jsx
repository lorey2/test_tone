import React, { useRef, useEffect } from "react";
import * as Tone from "tone";

// We use a "Global" variable outside the component so other files can find it
// Like an 'extern' variable in C.
export const masterBus = new Tone.Channel();

// Add a Limiter to the bus to prevent digital clipping (clamping the signal)
const limiter = new Tone.Limiter(-1).connect(masterBus);

const MasterBusController = () => {
  // This component provides a UI to control the global volume
  const handleVolume = (e) => {
    // In Audio, volume is logarithmic (decibels)
    // 0 is full volume, -60 is silent
    masterBus.volume.value = parseFloat(e.target.value);
  };

  return (
    <div style={{ border: "2px solid #555", padding: "20px", margin: "20px" }}>
      <h3>Master Bus</h3>
      <input 
        type="range" 
        min="-60" 
        max="0" 
        defaultValue="0" 
        onChange={handleVolume} 
      />
      <span> Volume (dB)</span>
    </div>
  );
};

export default MasterBusController;
