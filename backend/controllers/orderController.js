import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Stripe from 'stripe';

const stripe= new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { deliveryInfo } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ userId }).populate('items.foodId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Calculate total amount
    let totalAmount = 0;
    cart.items.forEach(item => {
      totalAmount += item.foodId.price * item.quantity;
    });
    totalAmount += 2; // delivery fee

    // Create order
    const order = new Order({
      userId,
      items: cart.items.map(item => ({
        foodId: item.foodId._id,
        quantity: item.quantity
      })),
      deliveryInfo,
      totalAmount
    });

    await order.save();

    // Clear cart after order
    await Cart.findOneAndUpdate({ userId }, { items: [] });

    res.json({ success: true, message: "Order placed successfully", orderId: order._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};

export { placeOrder };
