import { useState, useEffect, useRef } from "react";
import "./index.css";
import { bankOne, bankTwo } from "./Heaters";
import Pad from "./Pad";

const BankOne = () => {
  const [currentSound, setCurrentSound] = useState("Heater Kit");
  const [bankName, setBankName] = useState(" ");
  const [currentBank, setCurrentBank] = useState(bankOne);
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(0.5);

  const toggleBank = () => {
    if (bankName === "Heater Kit") {
      setBankName("Smooth Piano Kit");
      setCurrentBank(bankTwo);
      setCurrentSound("Smooth Piano Kit");
    } else {
      setBankName("Heater Kit");
      setCurrentBank(bankOne);
      setCurrentSound("Heater Kit");
    }
  };

  const playSound = (sound) => {
    if (!power) return;
    const audio = document.getElementById(sound.key);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setCurrentSound(sound.id);
    }
  };

  const handleKeyPress = (event) => {
    const key = event.key.toUpperCase();
    const sound = currentBank.find((s) => s.key === key);
    if (sound) playSound(sound);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [currentBank]);

  const togglePower = () => {
    setPower(!power);
    setCurrentSound(power ? "Power Off" : "Power On");
  };

  const changeVolume = (e) => {
    const vol = e.target.value;
    setVolume(vol);
    setCurrentSound(`Volume: ${Math.round(vol * 100)}`);
  };

  return (
    <div id="drum-machine">
      <h2 id="display">{currentSound}</h2>

      <div className="pad-container">
        {currentBank.map(({ id, key, url }) => (
          <Pad
            key={id}
            id={id}
            keyActive={key}
            url={url}
            playSound={playSound}
            volume={volume}
          />
        ))}
      </div>

      <div className="bank-toggle">
        <span className="bank-label">Bank</span>
        <label className="switch">
          <input type="checkbox" onChange={toggleBank} />
          <span className="slider"></span>
        </label>
      </div>

      <div className="clear-banks">
        <span className="clear-label">Clear Bank</span>
        <label className="switch">
          <input type="checkbox" onChange={togglePower} />
          <span className="slider"></span>
        </label>
      </div>

      <div className="volume-control">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={changeVolume}
        />
      </div>
    </div>
  );
};

export default BankOne;