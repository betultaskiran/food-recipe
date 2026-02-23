import React, { useState } from "react";
import classes from "./CommentForm.module.css";
import {
  TextInput,
  Textarea,
  Button,
  Rating,
  Stack,
  Group,
  Title,
} from "@mantine/core";
import { toast } from "react-toastify";
import axios from "axios";

const baseUrl = "http://localhost:3000/api";

const CommentForm = ({ recipeId, onCommentAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0,
    image: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.currentTarget.value });
  };

  const handleRatingChange = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await axios.post(`${baseUrl}/comments`, {
        recipeId,
        name: formData.name,
        email: formData.email,
        image: formData.image,
        rating: formData.rating,
        commentText: formData.message,
      });

      // Formu sıfırla
      setFormData({
        name: "",
        email: "",
        message: "",
        rating: 0,
        image: "",
      });

      toast.success("Comment sent successfully!");

      if (onCommentAdded) onCommentAdded(res.data.comment);
    } catch (err) {
      console.error("Yorum gönderilemedi:", err);
      toast.error("An error occurred while sending the comment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="md">
        <Title className={classes.formTitle} order={4}>
          Leave a Comment
        </Title>

        <Textarea
          label="Your Message"
          placeholder="Write your comment..."
          required
          value={formData.message}
          onChange={handleChange("message")}
        />

        <div className={classes.formRow}>
          <TextInput
            label="Name"
            placeholder="Your name"
            required
            value={formData.name}
            onChange={handleChange("name")}
          />
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
          />
        </div>

        <TextInput
          label="Profile Image URL"
          placeholder="https://example.com/avatar.jpg"
          value={formData.image}
          onChange={handleChange("image")}
        />

        <div>
          <p>Your Rating</p>
          <Rating value={formData.rating} onChange={handleRatingChange} />
        </div>

        <Group position="right" mt="md">
          <Button
            type="submit"
            className={classes.formButton}
            loading={submitting}
          >
            Post Comment
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default CommentForm;
