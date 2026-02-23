import React from "react";
import classes from "./TextImage.module.css";
import { Container } from "@mantine/core";

const TextImage = () => {
  return (
    <Container size="95%">
      <div className={classes.text}>
        <div className={classes.contents}>
          <h2>You don't know how to make the dish you have in mind?</h2>
          <p>
            Feed your imagination and spark your creativity. From cravings to
            creations, let your ideas flourish and uncover the perfect recipe
            waiting to be discovered.
          </p>
          <a href="/recipes" className={classes.contactButton}>
            View Recipes
          </a>
        </div>
      </div>
    </Container>
  );
};

export default TextImage;
