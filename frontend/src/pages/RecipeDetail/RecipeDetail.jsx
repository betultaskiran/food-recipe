import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Image,
  Text,
  Title,
  Grid,
  Loader,
  Badge,
  Rating,
} from "@mantine/core";
import axios from "axios";
import baseUrl, { uploadsPath } from "../../atoms/popupAtom";
import classes from "./RecipeDetail.module.css";
import RatingOverview from "../../components/RatingOverview/RatingOverview";
import AboutAuthor from "../../components/AboutWriter/AboutAuthor";
import BlogCards from "../../components/BlogCards/BlogCards";
import CommentsSection from "../../components/CommentsSection/CommentsSection";
import CommentForm from "../../components/CommentForm/CommentForm";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshRatings, setRefreshRatings] = useState(0);

  const fetchRecipe = async () => {
    try {
      const res = await axios.get(`${baseUrl}/recipe/${id}`);
      console.log("Tarif verisi:", res.data.recipe);
      setRecipe(res.data.recipe);
    } catch (error) {
      console.error("Tarif çekilemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();

    const fetchAllRecipes = async () => {
      try {
        const res = await axios.get(`${baseUrl}/recipe`);
        setRecipes(res.data.recipes);
      } catch (error) {
        console.error("Tüm tarifler çekilemedi:", error);
      }
    };

    fetchAllRecipes();
  }, [id]);

  if (loading) {
    return (
      <Container style={{ textAlign: "center", padding: "40px" }}>
        <Loader size="lg" />
      </Container>
    );
  }

  if (!recipe) {
    return <Container>Recipe not found.</Container>;
  }

  const authorData =
    recipe.userId && typeof recipe.userId === "object"
      ? {
          name: `${recipe.userId.firstName} ${recipe.userId.lastName}`,
          description: recipe.userId.description,
          image: recipe.userId.image?.startsWith("http")
            ? recipe.userId.image
            : `http://localhost:3000/uploads/${recipe.userId.image}`,
          social: {
            instagram: recipe.userId.instagram,
            twitter: recipe.userId.twitter,
            youtube: recipe.userId.youtube,
          },
        }
      : null;

  return (
    <Container size="xl" className={classes.recipeDetail}>
      <div className={classes.recipeContent}>
        <div className={classes.recipeImage}>
          <Image
            src={uploadsPath + recipe.image}
            alt={recipe.title}
            className={classes.image}
            fallbackSrc="https://via.placeholder.com/400x300?text=No+Image"
          />
        </div>
        <div className={classes.recipeText}>
          <Title order={1}>{recipe.title}</Title>
          <Text fz="md" mt="sm">
            {recipe.description}
          </Text>

          {/* Ortalama puanı göster */}
          <div style={{ marginTop: "10px" }}>
            <Rating value={recipe.averageRating || 0} readOnly />
            <Text size="sm" c="dimmed">
              ({recipe.ratingCount || 0} ratings)
            </Text>
          </div>

          <Title order={3} mt="lg">
            Ingredients:
          </Title>
          <ul>
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <Grid gutter="xl" mt="xl">
        <Grid.Col span={9}>
          <div className={classes.instructions}>
            <Title order={3} mb="md">
              Instructions:
            </Title>
            <ul>
              {(recipe.instructions || []).map((step, index) => (
                <li key={index} className={classes.instructionItem}>
                  <h4 className={classes.title_animated}>{step.step_name}</h4>
                  <div className={classes.content}>
                    {step.image && (
                      <img
                        src={
                          step.image.startsWith("http")
                            ? step.image
                            : `${uploadsPath}${step.image}`
                        }
                        alt={step.step_name}
                      />
                    )}
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {recipe.videoUrl && (
            <div className={classes.videoContainer}>
              <Title order={3} className={classes.videoTitle}>
                Watch the Recipe:
              </Title>
              <iframe
                className={classes.videoIframe}
                width="100%"
                height="600px"
                src={recipe.videoUrl}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <RatingOverview recipeId={recipe._id} refreshKey={refreshRatings} />

          <hr />
          {authorData && <AboutAuthor author={authorData} />}
          <CommentsSection
            recipeId={recipe._id}
            onUpdateNeeded={fetchRecipe}
            onRatingRefresh={() => setRefreshRatings((prev) => prev + 1)}
          />

          {/* <CommentForm
            recipeId={recipe._id}
            onCommentAdded={() => {
              fetchRecipe(); // Ortalamayı güncelle
            }}
          /> */}
        </Grid.Col>

        <Grid.Col span={3} className={classes.rightCol}>
          <div className={classes.relatedRecipes}>
            <Title order={3} mb="md">
              Recipes:
            </Title>
            {recipes
              .filter((r) => r._id !== recipe._id)
              .slice(0, 5)
              .map((item) => (
                <Link
                  to={`/recipe/${item._id}`}
                  key={item._id}
                  className={classes.recipeCard}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Image
                    src={uploadsPath + item.image}
                    alt={item.title}
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                  <div>
                    <Badge size="sm" variant="light" className={classes.badge}>
                      {item.category}
                    </Badge>
                    <Text fz="sm" mt="sm">
                      {item.title}
                    </Text>
                    <div className={classes.ratingInline}>
                      <Rating
                        value={item.averageRating || 0}
                        readOnly
                        size="xs"
                      />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          <BlogCards />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default RecipeDetail;
