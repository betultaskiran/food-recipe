const express = require("express");
const userController = require("../controllers/user");
const authMiddleware = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  userController.updateUser
);
router.put(
  "/:id/change-password",
  authMiddleware,
  userController.changePassword
);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.get("/", authMiddleware, userController.getUsers);
router.get("/:id", authMiddleware, userController.getUser);

module.exports = router;
