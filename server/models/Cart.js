const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          default: 1,
          validate: {
            validator: v => v > 0,
            message: 'Quantity must be greater than zero'
          }
        },
      },
    ],
    // totalPrice: {
    //   type: Number,
    //   required: true,
    //   default: 0
    // }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
