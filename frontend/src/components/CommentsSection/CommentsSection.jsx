import React, { useEffect, useState } from "react";
import classes from "./CommentsSection.module.css";
import CommentCard from "../CommentCard/CommentCard";
import CommentForm from "../CommentForm/CommentForm";
import axios from "axios";
import baseUrl from "../../atoms/popupAtom";
import { toast } from "react-toastify";

const CommentsSection = ({ recipeId, onUpdateNeeded, onRatingRefresh }) => {
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    commentText: "",
    rating: 0,
    image: "",
  });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${baseUrl}/comments/${recipeId}`);
        setComments(res.data);
      } catch (err) {
        console.error("Yorumlar yüklenemedi:", err);
        toast.error("An error occurred while sending the comment.");
      }
    };

    if (recipeId) fetchComments();
  }, [recipeId]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/comments/delete/${id}`);
      setComments((prev) => prev.filter((comment) => comment._id !== id));
      toast.success("Comment deleted successfully!");

      if (typeof onUpdateNeeded === "function") {
        onUpdateNeeded();
      }
      if (typeof onRatingRefresh === "function") {
        onRatingRefresh();
      }
    } catch (err) {
      toast.error("An error occurred while deleting the comment.");
    }
  };

  const handleEdit = (comment) => {
    setEditingId(comment._id);
    setEditData({
      commentText: comment.commentText,
      rating: comment.rating,
      image: comment.user.image || "",
    });
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(`${baseUrl}/comments/update/${id}`, {
        commentText: editData.commentText,
        rating: editData.rating,
        image: editData.image,
      });

      setComments((prev) =>
        prev.map((c) => (c._id === id ? res.data.comment : c))
      );
      setEditingId(null);
      setEditData({ commentText: "", rating: 0, image: "" });

      toast.success("Comment updated successfully!");

      if (typeof onUpdateNeeded === "function") {
        onUpdateNeeded();
      }
      if (typeof onRatingRefresh === "function") {
        onRatingRefresh();
      }
    } catch (err) {
      toast.error("An error occurred while updating the comment.");
    }
  };

  const handleNewComment = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
    if (typeof onUpdateNeeded === "function") {
      onUpdateNeeded(); // recipe ortalaması güncellensin
    }
    if (typeof onRatingRefresh === "function") {
      onRatingRefresh(); // RatingOverview yeniden fetch etsin
    }
  };

  return (
    <div>
      <CommentForm recipeId={recipeId} onCommentAdded={handleNewComment} />

      {comments.map((comment) =>
        editingId === comment._id ? (
          <div key={comment._id} className={classes.editBox}>
            <textarea
              className={classes.editTextarea}
              value={editData.commentText}
              onChange={(e) =>
                setEditData({ ...editData, commentText: e.target.value })
              }
              placeholder="Edit your comment..."
            />
            <div className={classes.editControls}>
              <input
                className={classes.ratingInput}
                type="number"
                min="0"
                max="5"
                value={editData.rating}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    rating: parseInt(e.target.value),
                  })
                }
              />
              <input
                className={classes.imageInput}
                type="text"
                placeholder="Profile image URL"
                value={editData.image}
                onChange={(e) =>
                  setEditData({ ...editData, image: e.target.value })
                }
              />
              <button
                className={classes.saveBtn}
                onClick={() => handleUpdate(comment._id)}
              >
                Save
              </button>
              <button
                className={classes.cancelBtn}
                onClick={() => setEditingId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <CommentCard
            key={comment._id}
            comment={comment}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )
      )}
    </div>
  );
};

export default CommentsSection;
