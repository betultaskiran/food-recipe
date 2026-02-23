// src/hooks/useLoadFavorites.js
import { useEffect } from "react";
import axios from "axios";
import { useSetAtom } from "jotai";
import { favoritesAtom, getToken } from "../atoms/popupAtom";
import baseUrl from "../atoms/popupAtom";

const useLoadFavorites = () => {
  const setFavorites = useSetAtom(favoritesAtom);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = getToken();
      if (!token) return;

      try {
        const res = await axios.get(`${baseUrl}/favorites`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ids = res.data.favorites.map((r) => r._id);
        setFavorites(ids);
      } catch (err) {
        console.error("Favoriler yüklenemedi:", err);
      }
    };

    fetchFavorites();
  }, [setFavorites]);
};

export default useLoadFavorites;
