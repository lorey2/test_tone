import React, { useRef, useState } from "react";
import * as Tone from "tone";

const LazySamplerButton = ({ sampleUrl, label, note = "C4" }) => {
  const samplerRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle, loading, ready

  const handleInteraction = async () => {
    // 1. If it's already loaded, just play it
    if (status === "ready" && samplerRef.current) {
      samplerRef.current.triggerAttackRelease(note, "1n");
      return;
    }

    // 2. If it's not loaded, allocate memory now (Lazy Load)
    if (status === "idle") {
      setStatus("loading");
      
      // Resume context first
      await Tone.start();

      // Allocate the buffer
      samplerRef.current = new Tone.Sampler({
        urls: { [note]: sampleUrl },
        onload: () => {
          setStatus("ready");
          // Play it immediately after it finishes loading
          samplerRef.current.triggerAttackRelease(note, "1n");
        }
      }).toDestination();
    }
  };

  return (
    <button 
      onClick={handleInteraction}
      style={{
        padding: "20px",
        backgroundColor: status === "loading" ? "#facc15" : "#6366f1",
        color: "white"
      }}
    >
      {status === "idle" && `Load & Play ${label}`}
      {status === "loading" && "Loading Buffer..."}
      {status === "ready" && `Play ${label}`}
    </button>
  );
};

export default LazySamplerButton;
