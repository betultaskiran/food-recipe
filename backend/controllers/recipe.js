const Recipe = require("../models/recipe");

const recipeController = {
  createRecipe: async (req, res) => {
    try {
      const {
        title,
        description,
        videoUrl,
        ingredients,
        category,
        image, // artık sadece URL olarak geliyor
        instructions,
      } = req.body;

      const newRecipe = new Recipe({
        userId: req.user.id,
        title,
        description,
        videoUrl,
        category,
        image, // doğrudan URL
        ingredients: Array.isArray(ingredients)
          ? ingredients
          : typeof ingredients === "string"
          ? ingredients.split(",")
          : [],
        instructions: Array.isArray(instructions) ? instructions : [],
      });
      console.log("new", newRecipe);
      const savedRecipe = await newRecipe.save();
      res.status(201).json({ success: true, recipe: savedRecipe });
    } catch (error) {
      console.error("Create error:", error);
      res.status(500).json({ success: false, message: "Tarif oluşturulamadı" });
    }
  },
  getRecipesByUser: async (req, res) => {
    try {
      const userId = req.user.id;
      if (req.params.userId !== userId) {
        return res.status(403).json({
          success: false,
          message:
            "Erişim reddedildi, sadece kendi tariflerinizi görebilirsiniz.",
        });
      }

      const recipes = await Recipe.find({ userId });
      res.status(200).json({ success: true, response: recipes });
    } catch (error) {
      console.error("User tarifleri getirme hatası:", error);
      res
        .status(500)
        .json({ success: false, message: "Tarifler getirilemedi" });
    }
  },

  getRecipe: async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id).populate("userId");

      if (!recipe) {
        return res
          .status(404)
          .json({ success: false, message: "Tarif bulunamadı" });
      }

      res.status(200).json({ success: true, recipe });
    } catch (error) {
      console.error("Get error:", error);
      res.status(500).json({ success: false, message: "Tarif getirilemedi" });
    }
  },

  getRecipes: async (req, res) => {
    try {
      const search = req.query.search || "";

      const query = search
        ? {
            $or: [
              { title: { $regex: search, $options: "i" } },
              { description: { $regex: search, $options: "i" } },
            ],
          }
        : {};

      const recipes = await Recipe.find(query);
      res.status(200).json({ success: true, recipes });
    } catch (error) {
      console.error("List error:", error);
      res
        .status(500)
        .json({ success: false, message: "Tarifler getirilemedi" });
    }
  },

  updateRecipe: async (req, res) => {
    try {
      const updateData = { ...req.body };

      if (typeof updateData.ingredients === "string") {
        updateData.ingredients = updateData.ingredients.split(",");
      }

      const updatedRecipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!updatedRecipe) {
        return res
          .status(404)
          .json({ success: false, message: "Tarif bulunamadı" });
      }

      res.status(200).json({ success: true, recipe: updatedRecipe });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ success: false, message: "Tarif güncellenemedi" });
    }
  },

  deleteRecipe: async (req, res) => {
    try {
      const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
      if (!deletedRecipe) {
        return res
          .status(404)
          .json({ success: false, message: "Tarif bulunamadı" });
      }
      res.status(200).json({ success: true, message: "Tarif silindi" });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({ success: false, message: "Tarif silinemedi" });
    }
  },
};

module.exports = recipeController;
