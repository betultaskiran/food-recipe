import React from "react";
import styles from "./ExploreMenu.module.css"; // CSS Modülü olarak içe aktar
import { menu_list } from "../../assets/assets";
import { Container } from "@mantine/core";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <Container size="xl">
      <div className={styles["explore-menu"]}>
        <h1>Explore our menu</h1>
        <p className={styles["explore-menu-text"]}>
          Discover a variety of delicious recipes from different cuisines.
          Whether you're looking for a quick meal, a healthy option, or a
          gourmet dish to impress your guests, our recipes will guide you step
          by step to create amazing flavors in your own kitchen and elevate your
          cooking experience!
        </p>
        <div className={styles["explore-menu-list"]}>
          {menu_list.map((item, index) => (
            <div
              onClick={() => {
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                );
              }}
              key={index}
              className={styles["explore-menu-list-item"]}
            >
              <img
                className={category === item.menu_name ? styles.active : ""}
                src={item.menu_image}
                alt={item.menu_name}
              />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ExploreMenu;
