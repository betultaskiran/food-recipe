const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const recipeRouter = require("./recipe");
const uploadRouter = require("./upload");
const commentRouter = require("./comment");
const favoritesRouter = require("./favorites");

const router = express.Router();
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/recipe", recipeRouter);
router.use("/upload", uploadRouter);
router.use("/comments", commentRouter);
router.use("/favorites", favoritesRouter);
module.exports = router;
