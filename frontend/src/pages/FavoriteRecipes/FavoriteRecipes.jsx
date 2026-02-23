import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Title,
  SimpleGrid,
  Loader,
  Center,
  Text,
} from "@mantine/core";
import { getToken, favoritesAtom } from "../../atoms/popupAtom";
import baseUrl from "../../atoms/popupAtom";
import { toast } from "react-toastify";
import BadgeCard from "../../components/RecipeItem/BadgeCard";
import { useSetAtom } from "jotai";
import useLoadFavorites from "../../hooks/useLoadFavorites";

const FavoriteRecipes = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const setFavoritesAtom = useSetAtom(favoritesAtom);

  useLoadFavorites(); //atom'u da güncel tutar

  const fetchFavorites = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await axios.get(`${baseUrl}/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const favoriteData = res.data.favorites || [];
      setFavorites(favoriteData);
      setFavoritesAtom(favoriteData.map((r) => r._id)); // sadece id'leri yaz

      console.log("Favori API'den gelen tarifler:", favoriteData);
    } catch (err) {
      console.error("Favori tarifler alınamadı:", err);
      toast.error("Favori tarifler alınamadı.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);
  console.log("FAVORI TARIFLER:", favorites);

  // ✅ Favoriden çıkarınca anında listeden sil
  const handleToggleFavorite = (id) => {
    setFavorites((prev) => prev.filter((r) => r._id !== id));
    setFavoritesAtom((prev) => prev.filter((fid) => fid !== id));
  };

  return (
    <Container size="xl">
      <Title order={2} mt="md" mb="md" style={{ color: "#006600" }}>
        My Favorite Recipes
      </Title>

      {loading ? (
        <Center mt="xl">
          <Loader />
        </Center>
      ) : favorites.length === 0 ? (
        <Center mt="xl">
          <Text size="lg" color="dimmed">
            You don't have any favorite recipes yet.
          </Text>
        </Center>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">
          {favorites.map((recipe) => (
            <BadgeCard
              key={recipe._id}
              id={recipe._id}
              image={recipe.image}
              title={recipe.title}
              description={recipe.description}
              category={recipe.category}
              isInitiallyFavorited={true}
              onToggleFavorite={() => handleToggleFavorite(recipe._id)}
              averageRating={recipe.averageRating}
              ratingCount={recipe.ratingCount}
            />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default FavoriteRecipes;
