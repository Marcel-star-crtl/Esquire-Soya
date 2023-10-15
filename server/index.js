const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const Product = require("./models/Product");
const momoRoutes = require("./routes/momo");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("api/momo", momoRoutes);

app.get("/search/:key", async (req, res) => {
  try{
    const data = await Product.find({
      "$or": [
        {name: {$regex: req.params.key, $options: "i"}},
        {categories:{$regex: req.params.key, $options: "i"}}
      ]
    }); 
    res.send(data);
  }catch( error ) {
    console.error(error);
    
    res.status(500).json({ error: "An error occurred while searching "})
  }
  
});


app.get("/", (req, res) => {
  res.send("Welcome to the Shopping API!");
});


app.listen(process.env.PORT || 3000, () => {
  console.log("Backend server is running!");
});