import React from "react";
import styles from "./Founders.module.css";
import { aboutImages } from "../../assets/assets";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Founders = () => {
  return (
    <div className={styles.foundersSection}>
      <h2 className={styles.foundersTitle}>Meet The Founders</h2>
      <p className={styles.foundersSubtitle}>
        Awesome founders team here to help you
      </p>

      <div className={styles.foundersContainer}>
        <div className={styles.founderCard}>
          <img
            src={aboutImages.founder_1}
            alt="Founder 1"
            className={styles.founderImage}
          />
          <h3>Jane Doe</h3>
          <p>Head Chef</p>
          <div className={styles.socialIcons}>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className={styles.founderCard}>
          <img
            src={aboutImages.founder_2}
            alt="Founder 2"
            className={styles.founderImage}
          />
          <h3>Emily Rose</h3>
          <p>Creative Director</p>
          <div className={styles.socialIcons}>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className={styles.founderCard}>
          <img
            src={aboutImages.founder_3}
            alt="Founder 3"
            className={styles.founderImage}
          />
          <h3>John Smith</h3>
          <p>Marketing Lead</p>
          <div className={styles.socialIcons}>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Founders;
