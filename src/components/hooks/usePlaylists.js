'use client';

import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from './useAuth';

export const usePlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (user) {
        const q = query(collection(db, 'playlists'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedPlaylists = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPlaylists(fetchedPlaylists);
      }
    };

    fetchPlaylists();
  }, [user]);

  return playlists;
};
