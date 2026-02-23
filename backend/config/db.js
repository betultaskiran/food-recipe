const mongoose = require("mongoose");
async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("bağlandık");
  } catch (e) {
    console.log(e, "mongoERROR");
  }
}

module.exports = { connectDB };
