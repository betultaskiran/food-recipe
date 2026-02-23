import React from "react";
import classes from "./BlogCards.module.css";
import { Image } from "@mantine/core";
import { blogImages } from "../../assets/assets.js";
import ButtonComponent from "../Button/ButtonComponent.jsx";
import { useNavigate } from "react-router-dom";

const BlogCards = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    alert("Button Clicked!");
  };

  return (
    <div className={classes.blogImages}>
      <div className={classes.blogCard}>
        <Image
          src={blogImages.blog_card1}
          alt="Blog Card 1"
          className={classes.blogImage}
        />
        <div className={classes.buttonContainer}>
          <ButtonComponent text="View Blog" onClick={() => navigate(`/blog`)} />
        </div>
      </div>
      <div className={classes.blogCard}>
        <Image
          src={blogImages.blog_card2}
          alt="Blog Card 2"
          className={classes.blogImage}
        />
        <div className={classes.buttonContainer}>
          <ButtonComponent text="View Blog" onClick={() => navigate(`/blog`)} />
        </div>
      </div>
    </div>
  );
};

export default BlogCards;
