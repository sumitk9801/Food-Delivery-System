import dotenv from 'dotenv';
dotenv.config();
import orderModel from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
    const order = new orderModel({
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
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        ...cart.items.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.foodId.name,
              description: item.foodId.description,
            },
            unit_amount: Math.round(item.foodId.price * 100), // amount in cents
          },
          quantity: item.quantity,
        })),
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Delivery Fee',
              description: 'Delivery Charge',
            },
            unit_amount: 200, // $2 delivery fee in cents
          },
          quantity: 1,
        }
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${process.env.CLIENT_URL}/verify?success=false&orderId=${order._id}`, 
    });
    res.json({ success: true, url: session.url, orderId: order._id });


  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error placing order" });
  }
};

export { placeOrder };
