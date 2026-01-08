import React from "react";
import SynthButton from "./SynthButton";
import DrumButton from "./DrumButton";

function App() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Vibe Station</h1>
      
      <div style={{ marginBottom: "20px" }}>
        <h3>Melody</h3>
	  	<SynthButton note="A3" label="Play A" />
     	<SynthButton note="B3" label="Play B" />
      	<SynthButton note="C4" label="Play C" />
        <SynthButton note="D4" label="Play D" />
        <SynthButton note="E4" label="Play E" />
        <SynthButton note="F4" label="Play F" />
        <SynthButton note="G4" label="Play G" />
        <SynthButton note="A4" label="Play A" />
      </div>

      <div>
        <h3>Rhythm</h3>
        <DrumButton label="KICK" />
      </div>
    </div>
  );
}

export default App;




