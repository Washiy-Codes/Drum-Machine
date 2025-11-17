import {useRef, useEffect} from 'react';

function Pad({ id, keyActive, url, playSound, volume }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleClick = () => {
    playSound({ id, key: keyActive, url });
  };

  return (
    <button className="drum-pad" id={id} onClick={handleClick}>
      {keyActive}
      <audio ref={audioRef} className="clip" id={keyActive} src={url}></audio>
    </button>
  );
}

export default Pad;