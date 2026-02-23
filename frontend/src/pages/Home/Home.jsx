import React from "react";
import TextImage from "../../components/TextImage/TextImage";
import ExploreMenu from "../../components/ExploreRecipe/ExploreMenu";
import { useState } from "react";
import RecipeDisplay from "../../components/RecipeDisplay/RecipeDisplay";
import "./Home.css";
import useLoadFavorites from "../../hooks/useLoadFavorites"; //ekle
import { Container } from "@mantine/core";

const Home = () => {
  const [category, setCategory] = useState("All");

  useLoadFavorites(); //çağır

  return (
    <div>
      <TextImage />
      <ExploreMenu category={category} setCategory={setCategory} />

      <h1 className="title">Top recipes near you</h1>

      <RecipeDisplay category={category} />
      {/* <Container size="xl">
        <div className="text-image-container">
          <div className="text-image">
            <TextImage />
          </div>
          <div className="text-image">
            <TextImage />
          </div>
        </div>
      </Container> */}
    </div>
  );
};

export default Home;
