const express = require("express");
const favoriteController = require("../controllers/favorites");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Kullanıcının favori tariflerini getir
router.get("/", authMiddleware, favoriteController.getFavorites);

// Favori tarif ekle/çıkar (toggle)
router.post("/", authMiddleware, favoriteController.toggleFavorite);

module.exports = router;
