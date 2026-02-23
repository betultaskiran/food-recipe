import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Stack,
  Flex,
  Text,
  SimpleGrid,
} from "@mantine/core";
import UserInfoCard from "../../components/UserInfoCard/UserInfoCard";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";
import ChangePasswordModal from "../../components/ChangePasswordModal/ChangePasswordModal";
import baseUrl, { uploadsPath, favoritesAtom } from "../../atoms/popupAtom";
import { useNavigate } from "react-router-dom";
import BadgeCard from "../../components/RecipeItem/BadgeCard";
import { useAtomValue } from "jotai";
import useLoadFavorites from "../../hooks/useLoadFavorites";
import classes from "./Profile.module.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const favorites = useAtomValue(favoritesAtom);

  useLoadFavorites();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const userFromStorage = JSON.parse(localStorage.getItem("user"));

      if (!token || !userFromStorage) return;

      const userId = userFromStorage._id;

      const response = await axios.get(`${baseUrl}/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data.response);
    } catch (error) {
      console.error("Kullanıcı verisi alınamadı:", error);
    }
  };

  const fetchRecipes = async () => {
    try {
      const token = localStorage.getItem("token");
      const userFromStorage = JSON.parse(localStorage.getItem("user"));
      const userId = userFromStorage?._id;

      const response = await axios.get(`${baseUrl}/recipe/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRecipes(response.data.response);
    } catch (error) {
      console.error("Tarifler alınamadı:", error);
    }
  };

  useEffect(() => {
    if (user) fetchRecipes();
  }, [user]);

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSaveProfile = async (updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      for (const key in updatedData) {
        if (key !== "image") {
          formData.append(key, updatedData[key]);
        }
      }

      if (updatedData.image && updatedData.image instanceof File) {
        formData.append("image", updatedData.image);
      }

      const response = await axios.put(
        `${baseUrl}/user/${user._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(response.data.response);
      setEditModalOpen(false);
    } catch (error) {
      console.error("Profil güncellenemedi:", error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Container size="xl" py="md" className={classes.profileContainer}>
      <Stack>
        <UserInfoCard
          user={user}
          onEdit={() => setEditModalOpen(true)}
          onChangePassword={() => setChangePasswordModalOpen(true)}
        />

        <Flex justify="flex-end" align="flex-end" mt="lg">
          <Button
            variant="filled"
            style={{ backgroundColor: "#ffcc70", color: "white" }}
            size="md"
            onClick={() => navigate("/add-recipe")}
          >
            Add Recipe
          </Button>
        </Flex>

        <Text
          component="h4"
          size="xl"
          fw={700}
          ta="left"
          mt="xl"
          mb="md"
          className={classes.title}
        >
          MY RECIPES
        </Text>

        {recipes.length > 0 ? (
          <SimpleGrid spacing="lg" mt="xl" cols={{ base: 1, sm: 2, lg: 4 }}>
            {recipes.map((recipe) => (
              <BadgeCard
                key={recipe._id}
                id={recipe._id}
                image={`${uploadsPath}${recipe.image}`}
                title={recipe.title}
                description={recipe.description}
                category={recipe.category}
                showOwnerActions={true}
                isInitiallyFavorited={favorites.includes(recipe._id)}
                averageRating={recipe.averageRating}
                ratingCount={recipe.ratingCount}
                onDeleteSuccess={(deletedId) =>
                  setRecipes((prev) => prev.filter((r) => r._id !== deletedId))
                }
              />
            ))}
          </SimpleGrid>
        ) : (
          <Text align="center" mt="lg">
            Henüz tarif eklenmemiş.
          </Text>
        )}
      </Stack>

      <EditProfileModal
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        user={user}
        onSave={handleSaveProfile}
      />

      <ChangePasswordModal
        opened={changePasswordModalOpen}
        onClose={() => setChangePasswordModalOpen(false)}
        userId={user._id}
      />
    </Container>
  );
}
