import React from "react";
import styles from "./ButtonComponent.module.css";

const ButtonComponent = ({ text, onClick }) => {
  return (
    <div>
      <button className={styles.btn} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default ButtonComponent;
