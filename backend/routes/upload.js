// routes/upload.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // mevcut middleware'ini kullanıyoruz

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Dosya yüklenemedi" });
  }

  const imageUrl = `uploads/${req.file.filename}`; // sadece yolunu döneriz
  res.status(200).json({ success: true, url: imageUrl });
});

module.exports = router;
