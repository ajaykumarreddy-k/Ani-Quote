import React, { useState, useRef } from 'react';
import './MusicButton.css';

const MusicButton: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="music-button-container">
      <audio ref={audioRef} src="/BG-Music.mp3" loop />
      <button onClick={toggleMusic} className="music-button">
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </button>
    </div>
  );
};

export default MusicButton;
