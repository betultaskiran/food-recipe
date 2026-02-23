import React, { useEffect, useState } from "react";
import { Rating } from "@mantine/core";
import classes from "./RatingOverview.module.css";
import axios from "axios";
import baseUrl from "../../atoms/popupAtom";

const RatingOverview = ({ recipeId, refreshKey }) => {
  const [ratingCounts, setRatingCounts] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${baseUrl}/comments/${recipeId}`);
        const counts = [0, 0, 0, 0, 0];
        res.data.forEach((comment) => {
          if (comment.rating >= 1 && comment.rating <= 5) {
            counts[comment.rating - 1]++;
          }
        });
        setRatingCounts(counts);
      } catch (err) {
        console.error("Rating'ler alınamadı:", err);
      }
    };

    if (recipeId) fetchComments();
  }, [recipeId, refreshKey]); // ✅ refreshKey eklendi

  const totalRatings = ratingCounts.reduce((acc, count) => acc + count, 0);
  const averageRating = totalRatings
    ? (
        ratingCounts.reduce(
          (acc, count, index) => acc + count * (index + 1),
          0
        ) / totalRatings
      ).toFixed(1)
    : "0.0";

  return (
    <div className={classes.ratingOverview}>
      <div className={classes.ratingTitle}>Rating Overview</div>

      <div className={classes.ratingContainer}>
        <div className={classes.ratingSummary}>
          <div className={classes.ratingScore}>
            <span className={classes.averageRating}>{averageRating}</span> / 5
          </div>
          <div className={classes.ratingCount}>{totalRatings} ratings</div>
        </div>

        <div className={classes.ratingDetails}>
          {[5, 4, 3, 2, 1].map((star, i) => (
            <div key={star} className={classes.ratingRow}>
              <Rating value={star} readOnly size="sm" />
              <div className={classes.ratingProgress}>
                <div
                  className={classes.ratingFill}
                  style={{
                    width: totalRatings
                      ? `${(ratingCounts[star - 1] / totalRatings) * 100}%`
                      : "0%",
                  }}
                ></div>
              </div>
              <div className={classes.ratingText}>{ratingCounts[star - 1]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingOverview;
