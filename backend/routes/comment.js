const express = require("express");
const commentController = require("../controllers/comment");

const router = express.Router();

// Belirli bir tarife ait yorumları getir
router.get("/:recipeId", commentController.getCommentsByRecipe);

// Yeni yorum oluştur
router.post("/", commentController.createComment);

// Yorum güncelle
router.put("/update/:id", commentController.updateComment);

// Yorum sil
router.delete("/delete/:id", commentController.deleteComment);

module.exports = router;
