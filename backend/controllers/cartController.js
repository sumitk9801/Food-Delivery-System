import Cart from "../models/cartModel.js";
import Food from "../models/foodmodel.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { foodId } = req.body;
    const userId = req.user.id;
    const quantity = 1;

     // check food exists
    const food = await Food.findById(foodId);
    if (!food) return res.json({ success: false, message: "Food not found" });

    let cart = await Cart.findOne({ userId });

    // if cart doesn't exist create one
    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ foodId, quantity: 1 }],
      });
      return res.json({ success: true, message: "Item added" });
    }

    // check if food already exists in cart
    const itemIndex = cart.items.findIndex(item => item.foodId.toString() === foodId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ foodId, quantity: 1 });
    }

    await cart.save();

    return res.json({ success: true, message: "Item added to cart" });

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

    const foodItem = await Food.findById(foodId);
    if (!foodItem) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(item => item.foodId.toString() === foodId); // getting the index of item ,if not found then -1
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }
    if (cart.items[itemIndex].quantity > 1) {
        cart.items[itemIndex].quantity -= 1;
    } else if (cart.items[itemIndex].quantity === 1) {
        cart.items = cart.items.filter(item => item.foodId.toString() !== foodId);
    }
    await cart.save();
    res.json({ success: true, message: "Item quantity reduced from cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
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
