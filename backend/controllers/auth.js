const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongooseUser = require("../models/user");

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "email and password required" });
    }

    try {
      const user = await mongooseUser.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send({ message: "invalid email or password" });
      }

      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" } //1h
      );

      res.status(200).send({ token, message: "Login successful", user }); //Token response objesinin içinde değil direkt data içinde kullanılmış.Bu yüzden frontendde  res.data.token şeklinde kullanılarak, token'ı elde edebiliriz.
    } catch (e) {
      console.error("Login error:", e);
      res.status(500).send({ message: "Internal server error" });
    }
  },

  register: async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send({
        message: "firstName, lastName, email, and password are required",
      });
    }

    try {
      const existingUser = await mongooseUser.findOne({ email });
      if (existingUser) {
        return res.status(409).send({ message: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new mongooseUser({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
      });

      const savedUser = await newUser.save();

      // ✅ TOKEN ÜRET
      const token = jwt.sign(
        { email: savedUser.email, id: savedUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // ✅ TOKEN + USER GÖNDER
      res.status(201).send({
        message: "User registered successfully",
        user: savedUser,
        token, // 🔥 Burada frontend için lazım olan JWT
      });
    } catch (e) {
      console.error("Register error:", e);
      res.status(500).send({ message: "Internal server error" });
    }
  },
};

module.exports = authController;
