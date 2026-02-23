const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL olarak saklanacak
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: false,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Salad",
        "Soup",
        "Dessert",
        "Sandwich",
        "Meat",
        "Drink",
        "Pasta",
        "SeaFood",
      ],
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    instructions: [
      {
        step_name: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
