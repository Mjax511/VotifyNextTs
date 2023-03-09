const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  access_token: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
    required: true,
  },
  spotify_id: {
    type: String,
    required: true,
  }
});

module.exports = (mongoose.models.User || mongoose.model("User", userSchema))

