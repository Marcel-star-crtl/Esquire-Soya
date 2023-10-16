const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

// CREATE a new cart and associate it with the user

router.post("/", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const productInfo = req.body;

  // Debugging: Log the received productInfo
  console.log("Received productInfo:", productInfo);

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [], totalPrice: 0 });
    }

    // Debugging: Log the calculated values
    const calculatedTotalPrice = productInfo.quantity * productInfo.productPrice;
    console.log("Calculated totalPrice:", calculatedTotalPrice);

    // Add the product to the cart
    cart.products.push(productInfo);
    cart.totalPrice += calculatedTotalPrice;

    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post("/", verifyToken, async (req, res) => {
//   const userId = req.user.id; // Extract the user ID from the token
//   const productInfo = req.body;

//   try {
//     // Find the user's cart, or create a new one if it doesn't exist
//     let cart = await Cart.findOne({ userId });
//     if (!cart) {
//       cart = new Cart({ userId, products: [], totalPrice: 0 });
//     }

//     // Add the product to the cart
//     cart.products.push(productInfo);

//     // Calculate and update the total price based on the products
//     cart.totalPrice += productInfo.quantity * productInfo.productPrice;

//     const savedCart = await cart.save();
//     res.status(200).json(savedCart);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.post("/", verifyToken, async (req, res) => {
//   const newCart = new Cart(req.body);

//   try {
//     const savedCart = await newCart.save();
//     res.status(200).json(savedCart);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
