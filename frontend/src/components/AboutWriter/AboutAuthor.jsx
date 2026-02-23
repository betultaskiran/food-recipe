import React from "react";
import classes from "./AboutAuthor.module.css";
import { Image } from "@mantine/core";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const AboutAuthor = ({ author }) => {
  if (!author || !author.name) return null;

  return (
    <div className={classes.authorContainer}>
      {/* Yazarın fotoğrafı varsa göster */}
      {author.image && (
        <Image
          src={author.image}
          alt={author.name}
          className={classes.authorImage}
        />
      )}

      <div className={classes.authorInfo}>
        <p>WRITTEN BY</p>
        <h3>{author.name}</h3>
        <p>{author.description || "No description available."}</p>

        {/* Sosyal medya ikonları */}
        <div className={classes.socialIcons}>
          {author.social?.instagram && (
            <a
              href={author.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={classes.iconWrapper}>
                <FaInstagram className={classes.icon} size={20} />
              </div>
            </a>
          )}

          {author.social?.twitter && (
            <a
              href={author.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={classes.iconWrapper}>
                <FaTwitter className={classes.icon} size={20} />
              </div>
            </a>
          )}

          {author.social?.youtube && (
            <a
              href={author.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={classes.iconWrapper}>
                <FaYoutube className={classes.icon} size={20} />
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutAuthor;
