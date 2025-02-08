import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to Tunetastic</h1>
      {user ? (
        <p>Hello, {user.email}! Enjoy your music.</p>
      ) : (
        <p>Please log in to access your music library.</p>
      )}
    </div>
  );
};

export default Home;
