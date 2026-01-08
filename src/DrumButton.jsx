import React, { useRef, useEffect } from "react";
import * as Tone from "tone";

const DrumButton = ({ label }) => {
  const drumRef = useRef(null);

  useEffect(() => {
    // MEMBRANE SYNTH: Specifically tuned for Kick/Tom sounds
    // We connect it to the master output (.toDestination)
    drumRef.current = new Tone.MembraneSynth().toDestination();

    return () => {
      if (drumRef.current) drumRef.current.dispose();
    };
  }, []);

  const playDrum = async () => {
    await Tone.start();
    if (drumRef.current) {
      // "C1" is a very low frequency for a kick drum
      // "8n" is the duration of the hit
      drumRef.current.triggerAttackRelease("C1", "8n");
    }
  };

  return (
    <button 
      onClick={playDrum} 
      style={{ 
        padding: "20px", 
        backgroundColor: "#444", 
        color: "white", 
        borderRadius: "50%", // Makes it look like a drum pad
        width: "100px",
        height: "100px",
        cursor: "pointer"
      }}
    >
      {label}
    </button>
  );
};

export default DrumButton;
