import React, { useRef, useEffect, useState } from "react";
import * as Tone from "tone";

const SamplerButton = ({ sampleUrl, label, note = "C4" }) => {
  const samplerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Allocation: Loading a file into a buffer
    samplerRef.current = new Tone.Sampler({
      urls: {
        [note]: sampleUrl, // Map the file to a specific pitch
      },
      onload: () => {
        setIsLoaded(true); // Like a 'ready' flag in a struct
        console.log("Buffer Loaded");
      },
    }).toDestination();

    return () => {
      if (samplerRef.current) samplerRef.current.dispose();
    };
  }, [sampleUrl, note]);

  const playSample = async () => {
    await Tone.start();
    if (isLoaded && samplerRef.current) {
      // Trigger the buffer playback
      samplerRef.current.triggerAttackRelease(note, "1n");
    }
  };

  return (
    <button 
      onClick={playSample} 
      disabled={!isLoaded}
      style={{ 
        padding: "20px", 
        backgroundColor: isLoaded ? "#22c55e" : "#94a3b8",
        cursor: isLoaded ? "pointer" : "wait"
      }}
    >
      {isLoaded ? label : "Loading..."}
    </button>
  );
};

export default SamplerButton;
