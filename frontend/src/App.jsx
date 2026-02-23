import React from "react";
import { FooterCentered } from "./components/Footer/FooterCentered.jsx";
import HeaderMegaMenu from "./components/Header/HeaderMegaMenu.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "@mantine/core";
import RecipeDetail from "./pages/RecipeDetail/RecipeDetail.jsx";
import Blog from "./pages/Blog/Blog.jsx";
import About from "./pages/About/About.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Recipes from "./pages/Recipes/Recipes.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import AddRecipe from "./pages/AddRecipe/AddRecipe.jsx";
import FavoriteRecipes from "./pages/FavoriteRecipes/FavoriteRecipes.jsx";

const App = () => {
  return (
    <div>
      <HeaderMegaMenu />

      {/* <Container size={"lg"} sx={{ width: "100%", padding: 0, margin: 0 }}> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/favorites" element={<FavoriteRecipes />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/update-recipe/:id" element={<AddRecipe />} />
      </Routes>
      {/* </Container> */}
      <FooterCentered />
      {/*Toast mesajlarının çıkması için bu şart */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
