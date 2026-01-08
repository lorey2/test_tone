import React, { useRef, useEffect } from "react";
import * as Tone from "tone";

const PolySynthButton = ({ notes = ["C4", "E4", "G4"], label }) => {
  const polyRef = useRef(null);

  useEffect(() => {
    // Allocation: Creates a manager that handles multiple Synth instances
    polyRef.current = new Tone.PolySynth(Tone.Synth).toDestination();

    // Set some "Hardware" defaults (PolySynths can be loud, so we drop volume)
    polyRef.current.set({ volume: -6 });

    return () => {
      if (polyRef.current) polyRef.current.dispose();
    };
  }, []);

  const playChord = async () => {
    await Tone.start();
    if (polyRef.current) {
      // In C, you'd loop through an array. Here, we pass an array of notes.
      polyRef.current.triggerAttackRelease(notes, "2n");
    }
  };

  return (
    <button 
      onClick={playChord}
      style={{ padding: "20px", background: "#8b5cf6", color: "white" }}
    >
      {label}
    </button>
  );
};

export default PolySynthButton;
