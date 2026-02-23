import React, { useEffect, useState } from "react";
import classes from "./RecipeDisplay.module.css";
import { Container } from "@mantine/core";
import BadgeCard from "../RecipeItem/BadgeCard";
import axios from "axios";
import baseUrl, { uploadsPath, favoritesAtom } from "../../atoms/popupAtom";
import { useAtomValue } from "jotai";
import useLoadFavorites from "../../hooks/useLoadFavorites";
import { SimpleGrid } from "@mantine/core";

const RecipeDisplay = ({ category = "All", recipes: searchedRecipes }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const favorites = useAtomValue(favoritesAtom);

  useLoadFavorites();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${baseUrl}/recipe`);
        setRecipes(res.data.recipes);
      } catch (error) {
        console.error("Tarifler yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchedRecipes === undefined) {
      fetchRecipes(); // Arama yapılmadıysa tüm tarifleri al
    } else {
      setRecipes(searchedRecipes); // Arama sonucu geldiyse onu kullan
      setLoading(false);
    }
  }, [searchedRecipes]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        Loading recipes...
      </div>
    );
  }

  const filteredRecipes =
    category === "All"
      ? recipes
      : recipes.filter((r) => r.category === category);

  return (
    <Container size="xl">
      <div className={classes.recipeDisplay} id="recipe-display">
        {filteredRecipes.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl" mt="md">
            {filteredRecipes.map((item) => (
              <BadgeCard
                key={item._id}
                id={item._id}
                title={item.title}
                image={`${uploadsPath}${item.image}`}
                description={item.description}
                category={item.category}
                ingredients={item.ingredients}
                instructions={item.instructions}
                isInitiallyFavorited={favorites.includes(item._id)}
                averageRating={item.averageRating}
                ratingCount={item.ratingCount}
              />
            ))}
          </SimpleGrid>
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </Container>
  );
};

export default RecipeDisplay;
