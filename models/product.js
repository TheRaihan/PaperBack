const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  des: {
    type: String,
    required: false,
  },
  imgURL: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
