import React from 'react';
import { usePlayer } from '../hooks/usePlayer';

const SongCard = ({ song }) => {
  const { playSong } = usePlayer();

  return (
    <div 
      className="bg-card text-card-foreground p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => playSong(song)}
    >
      <h3 className="text-lg font-semibold">{song.title}</h3>
      <p className="text-sm text-muted-foreground">{song.artist}</p>
    </div>
  );
};

export default SongCard;
