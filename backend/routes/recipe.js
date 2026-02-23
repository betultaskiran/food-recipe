const express = require("express");
const recipeController = require("../controllers/recipe");
const authMiddleware = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

const multer = require("multer"); //routes/recipes.js dosyasında artık multer kullanılmıyor.Yeni yapımızda tüm görsel yükleme işlemleri yalnızca tek bir özel endpoint olan /api/upload üzerinden yapılıyor.

router.get("/", /*authMiddleware,*/ recipeController.getRecipes);

router.get("/user/:userId", authMiddleware, recipeController.getRecipesByUser); // Burada userId kullandığım için controllerda da req.params.userId olarak kullanmalıyım

router.get("/:id", /*authMiddleware,*/ recipeController.getRecipe);

router.post("/create", authMiddleware, recipeController.createRecipe);

router.put("/update/:id", authMiddleware, recipeController.updateRecipe);

router.delete("/delete/:id", authMiddleware, recipeController.deleteRecipe);

module.exports = router;
