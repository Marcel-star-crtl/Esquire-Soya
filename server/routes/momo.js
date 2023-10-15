// routes/momoRoutes.js
const express = require("express");
const router = express.Router();
const MomoPayment = require("../models/Momo");

// Define your MoMo API credentials (replace with your actual credentials)
const API_USER = process.env.API_USER;
const API_KEY = process.env.API_KEY;

const MoMoApiUrl = process.env.MoMoApiUrl;

// Route for initiating a payment request
router.post("/initiate-payment", async (req, res) => {
  try {
    const newPayment = new MomoPayment({
      transactionId: req.body.transactionId,
      payerId: req.body.payerId,
      payeeId: req.body.payeeId,
      amount: req.body.amount,
    });

    // Define the request payload
    const requestBody = {
      transactionId: req.body.transactionId,
      payerId: req.body.payerId,
      payeeId: req.body.payeeId,
      amount: req.body.amount,
    };

    const response = await fetch(`${MoMoApiUrl}/initiate-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-USER": API_USER,
        "API-KEY": API_KEY,
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();

    if (responseData.status === "success") {
      await newPayment.save();

      res.status(200).json({ message: "Payment initiated successfully" });
    } else {
      // Payment request failed
      res.status(500).json({ error: "Failed to initiate payment" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while initiating payment" });
  }
});

// add more routes for handling payment status updates, etc.

module.exports = router;
