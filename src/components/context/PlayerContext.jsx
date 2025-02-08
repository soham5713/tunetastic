'use client';

import React, { createContext, useState } from 'react';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const pauseSong = () => {
    setIsPlaying(false);
  };

  const nextSong = () => {
    // Implement next song logic
  };

  const previousSong = () => {
    // Implement previous song logic
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        queue,
        playSong,
        pauseSong,
        nextSong,
        previousSong,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
