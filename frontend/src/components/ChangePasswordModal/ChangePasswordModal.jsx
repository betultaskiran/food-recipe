import React, { useState } from "react";
import { Modal, TextInput, Button, Stack, PasswordInput } from "@mantine/core";
import axios from "axios";
import baseUrl from "../../atoms/popupAtom";
import classes from "./ChangePasswordModal.module.css"; // CSS importu

export default function ChangePasswordModal({ opened, onClose, userId }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Yeni şifreler uyuşmuyor!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${baseUrl}/user/${userId}/change-password`,
        { currentPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Şifre başarıyla güncellendi:", response.data);
      onClose(); // Modalı kapat
    } catch (err) {
      console.error("Şifre güncellenemedi:", err);
      setError("Şifre güncellenirken bir hata oluştu.");
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="CHANGE  PASSWORD"
      className={classes.title}
      centered
    >
      <form onSubmit={handlePasswordChange}>
        <Stack>
          <PasswordInput
            label="Mevcut Şifre"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className={classes["modal-label"]} // CSS sınıfı ekledik
          />
          <PasswordInput
            label="Yeni Şifre"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className={classes["modal-label"]}
          />
          <PasswordInput
            label="Yeni Şifreyi Tekrar Girin"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={classes["modal-label"]}
          />
          {error && <div className={classes["modal-error"]}>{error}</div>}{" "}
          {/* Hata mesajı */}
          <Button
            type="submit"
            mt="md"
            fullWidth
            className={classes["modal-button"]}
          >
            Şifreyi Değiştir
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
