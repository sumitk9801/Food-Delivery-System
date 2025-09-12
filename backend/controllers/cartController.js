import Cart from "../models/cartModel.js";
import Food from "../models/foodmodel.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { foodId, quantity } = req.body;
    const userId = req.user.id;

    // Note: Food existence check removed as foods are static in frontend

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.foodId.toString() === foodId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ foodId, quantity });
    }

    await cart.save();
    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error adding to cart" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { foodId } = req.body;
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const existingItem = cart.items.find(item => item.foodId.toString() === foodId);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        cart.items = cart.items.filter(item => item.foodId.toString() !== foodId);
      }
    } else {
      return res.status(404).json({ success: false, message: "Item not in cart" });
    }

    await cart.save();
    res.json({ success: true, message: "Item quantity reduced from cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error removing from cart" });
  }
};

// Get cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate('items.foodId');

    if (!cart) {
      return res.json({ success: true, cart: { items: [] } });
    }

    res.json({ success: true, cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching cart" });
  }
};

export { addToCart, removeFromCart, getCart };
