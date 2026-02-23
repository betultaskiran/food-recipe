const express = require("express");
const routes = require("./routes/index");
const config = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const uploadRoutes = require("./routes/upload");

//app config
const app = express();
const port = 3000;

// CORS ayarları (özelleştirilmiş bir yapılandırma ile)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

// Middlewares
app.use(cors(corsOptions));
//app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

//db connection
config.connectDB();

// API endpoints
app.use("/api", routes);
app.use("/api/upload", uploadRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
