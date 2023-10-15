const mongoose = require("mongoose");

const MomoPaymentSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    payerId: {
      type: String,
      required: true,
    },
    payeeId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MomoPayment", MomoPaymentSchema);
