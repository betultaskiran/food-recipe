const Comment = require("../models/Comment");
const Recipe = require("../models/recipe");

const commentController = {
  // Yeni yorum oluştur
  createComment: async (req, res) => {
    try {
      const { recipeId, name, email, commentText, rating, image } = req.body;

      if (!recipeId || !name || !email || !commentText) {
        return res.status(400).json({
          success: false,
          message: "Tüm alanlar doldurulmalıdır",
        });
      }

      const newComment = new Comment({
        recipeId,
        user: {
          name,
          email,
          image: image || null,
        },
        commentText,
        rating: rating || 0,
      });

      const savedComment = await newComment.save();

      // Ortalama rating'i hesapla ve tarife güncelle
      const allComments = await Comment.find({ recipeId });
      const total = allComments.reduce((sum, c) => sum + (c.rating || 0), 0);
      const average = total / allComments.length;

      await Recipe.findByIdAndUpdate(recipeId, {
        averageRating: average.toFixed(1),
        ratingCount: allComments.length,
      });

      res.status(201).json({ success: true, comment: savedComment });
    } catch (error) {
      console.error("Yorum oluşturma hatası:", error);
      res.status(500).json({ success: false, message: "Yorum oluşturulamadı" });
    }
  },

  // Belirli bir tarifin yorumlarını getir
  getCommentsByRecipe: async (req, res) => {
    try {
      const { recipeId } = req.params;
      const comments = await Comment.find({ recipeId }).sort({ createdAt: -1 });
      res.status(200).json(comments);
    } catch (error) {
      console.error("Yorumları getirme hatası:", error);
      res
        .status(500)
        .json({ success: false, message: "Yorumlar getirilemedi" });
    }
  },

  // Yorumu güncelle
  updateComment: async (req, res) => {
    try {
      const updateData = { ...req.body };

      if (updateData.image) {
        updateData["user.image"] = updateData.image;
        delete updateData.image;
      }

      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!updatedComment) {
        return res
          .status(404)
          .json({ success: false, message: "Yorum bulunamadı" });
      }

      // Rating güncellenmişse ortalamayı yeniden hesapla
      const allComments = await Comment.find({
        recipeId: updatedComment.recipeId,
      });
      const total = allComments.reduce((sum, c) => sum + (c.rating || 0), 0);
      const average = total / allComments.length;

      await Recipe.findByIdAndUpdate(updatedComment.recipeId, {
        averageRating: average.toFixed(1),
        ratingCount: allComments.length,
      });

      res.status(200).json({ success: true, comment: updatedComment });
    } catch (error) {
      console.error("Yorum güncelleme hatası:", error);
      res.status(500).json({ success: false, message: "Yorum güncellenemedi" });
    }
  },

  // Yorumu sil
  deleteComment: async (req, res) => {
    try {
      const deletedComment = await Comment.findByIdAndDelete(req.params.id);

      if (!deletedComment) {
        return res
          .status(404)
          .json({ success: false, message: "Yorum bulunamadı" });
      }

      // Yorum silindikten sonra ortalama rating'i yeniden hesapla
      const recipeId = deletedComment.recipeId;
      const allComments = await Comment.find({ recipeId });

      let average = 0;
      if (allComments.length > 0) {
        const total = allComments.reduce((sum, c) => sum + (c.rating || 0), 0);
        average = total / allComments.length;
      }

      await Recipe.findByIdAndUpdate(recipeId, {
        averageRating: average.toFixed(1),
        ratingCount: allComments.length,
      });

      res.status(200).json({ success: true, message: "Yorum silindi" });
    } catch (error) {
      console.error("Yorum silme hatası:", error);
      res.status(500).json({ success: false, message: "Yorum silinemedi" });
    }
  },
};

module.exports = commentController;
