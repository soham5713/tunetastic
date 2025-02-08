import React from 'react';
import { Link } from 'react-router-dom';

const PlaylistCard = ({ playlist }) => {
  return (
    <Link to={`/playlist/${playlist.id}`} className="block">
      <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-semibold">{playlist.name}</h3>
        <p className="text-sm text-muted-foreground">{playlist.songCount} songs</p>
      </div>
    </Link>
  );
};

export default PlaylistCard;
