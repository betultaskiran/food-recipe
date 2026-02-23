const User = require("../models/user");

const favoriteController = {
  // Favorilere tarif ekle veya çıkar (toggle)
  toggleFavorite: async (req, res) => {
    try {
      const userId = req.user.id;
      const { recipeId } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Kullanıcı bulunamadı" });
      }

      const isFavorited = user.favorites.includes(recipeId);

      if (isFavorited) {
        user.favorites.pull(recipeId);
      } else {
        user.favorites.push(recipeId);
      }

      await user.save();

      res.status(200).json({
        success: true,
        message: isFavorited ? "Favorilerden çıkarıldı" : "Favorilere eklendi",
        favorites: user.favorites,
      });
    } catch (error) {
      console.error("Favori işlemi hatası:", error);
      res
        .status(500)
        .json({ success: false, message: "Favori işlemi başarısız" });
    }
  },

  // Kullanıcının tüm favori tariflerini getir
  getFavorites: async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await User.findById(userId).populate("favorites");

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Kullanıcı bulunamadı" });
      }

      res.status(200).json({ success: true, favorites: user.favorites });
    } catch (error) {
      console.error("Favoriler getirme hatası:", error);
      res
        .status(500)
        .json({ success: false, message: "Favoriler getirilemedi" });
    }
  },
};

module.exports = favoriteController;
