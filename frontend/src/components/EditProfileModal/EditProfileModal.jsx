import { Modal, TextInput, Textarea, Button, Stack } from "@mantine/core";
import { useState, useEffect } from "react";
import classes from "./EditProfileModal.module.css";

export default function EditProfileModal({ opened, onClose, user, onSave }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    description: "",
    instagram: "",
    twitter: "",
    youtube: "",
    image: null,
  });

  // Her açıldığında güncel kullanıcı verilerini ayarla
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        description: user.description || "",
        instagram: user.instagram || "",
        twitter: user.twitter || "",
        youtube: user.youtube || "",
        image: null, // Dosya seçimini sıfırla ama önizleme istenirse farklı eklenebilir
      });
    }
  }, [user, opened]); // opened değiştiğinde sıfırla

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="EDIT PROFILE"
      centered
      className={classes.title}
    >
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label={<span className={classes.labelText}>First Name</span>}
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextInput
            label={<span className={classes.labelText}>Last Name</span>}
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextInput
            label={<span className={classes.labelText}>Email</span>}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Textarea
            label={<span className={classes.labelText}>Description</span>}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <TextInput
            label={<span className={classes.labelText}>Instagram</span>}
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
          />
          <TextInput
            label={<span className={classes.labelText}>Twitter</span>}
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
          />
          <TextInput
            label={<span className={classes.labelText}>YouTube</span>}
            name="youtube"
            value={formData.youtube}
            onChange={handleChange}
          />

          <TextInput
            label={<span className={classes.labelText}>Profile Image</span>}
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />

          <Button type="submit" mt="md" className={classes.saveButton}>
            Save
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
