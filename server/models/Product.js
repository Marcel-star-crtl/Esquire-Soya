const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    productImage: { type: String, required: true },
    categories: { type: Array },
    price: { type: Number, required: true, min: 0 },
    productID: {type: Number, required: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
