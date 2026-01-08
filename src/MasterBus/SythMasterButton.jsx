import React, { useRef, useEffect } from "react";
import * as Tone from "tone";
import { masterBus } from "./MasterBus";

// This is a "Module" (Component) that handles its own memory
const SynthMasterButton = ({ note, label }) => {
  const synthRef = useRef(null);

  useEffect(() => {
    // Constructor
    synthRef.current = new Tone.Synth().connect(masterBus);
    return () => {
      // Destructor
      if (synthRef.current) synthRef.current.dispose();
    };
  }, []);

  const playSound = async () => {
    await Tone.start();
    if (synthRef.current) {
      synthRef.current.triggerAttackRelease(note, "8n");
    }
  };

  return (
    <button onClick={playSound} style={{ margin: "10px", padding: "20px" }}>
      {label}
    </button>
  );
};

export default SynthMasterButton;
