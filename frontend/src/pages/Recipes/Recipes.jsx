import React, { useState, useEffect } from "react";
import styles from "./Recipes.module.css";
import RecipeDisplay from "../../components/RecipeDisplay/RecipeDisplay";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../atoms/popupAtom";

const Recipes = () => {
  const [category, setCategory] = useState("All");
  const [recipes, setRecipes] = useState([]);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (searchQuery) {
          const res = await axios.get(
            `${baseUrl}/recipe?search=${encodeURIComponent(searchQuery)}`
          );
          setRecipes(res.data.recipes);
        } else {
          // Arama yapılmadıysa tüm tarifleri gönderme → RecipeDisplay kendi alacak
          setRecipes(undefined);
        }
      } catch (error) {
        console.error("Tarifler alınamadı:", error);
      }
    };

    fetchRecipes();
  }, [searchQuery]);

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.overlay}>
          <h1>Recipes</h1>
          <p>
            Browse a wide variety of recipes designed for every taste and skill
            level. From comforting classics to creative culinary delights, find
            the perfect dish to inspire your next meal!
          </p>
        </div>
      </div>

      <div className={styles.recipeSection}>
        <RecipeDisplay
          category={category}
          recipes={searchQuery ? recipes : undefined}
        />
      </div>
    </>
  );
};

export default Recipes;
