import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import orderModel from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  console.log("Backend received:", req.body);
  console.log("User from token:", req.user);

  try {
    const userId = req.user.id;
    const { deliveryInfo, items, amount } = req.body;

    console.log("Delivery Info:", deliveryInfo);
    console.log("Items:", items);
    console.log("Amount:", amount);

    if (!deliveryInfo || !items || items.length === 0 || !amount) {
      return res.status(400).json({ success: false, message: "Invalid order data" });
    }

    // Validate foodId values before conversion
    for (const item of items) {
      console.log("Validating item:", item);
      if (!item.foodId) {
        return res.status(400).json({ success: false, message: `Missing foodId in item` });
      }
    }

    const order = new orderModel({
      userId: new mongoose.Types.ObjectId(userId),
      items: items.map(item => ({
        foodId: item.foodId,
        quantity: item.quantity
      })),
      deliveryInfo,
      totalAmount: amount
    });

    try {
      await order.save();
      console.log("Order saved successfully:", order);
    } catch (saveError) {
      console.error("Error saving order:", saveError);
      return res.status(500).json({ success: false, message: "Failed to save order" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        ...items.map(item => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              description: item.description || "",
            },
            unit_amount: Math.round(item.price * 100), 
          },

          quantity: item.quantity,
        })),
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Delivery Fee",
              description: "Delivery Charge",
            },
            unit_amount: 200, 
          },
          quantity: 1,
        }
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${process.env.CLIENT_URL}/verify?success=false&orderId=${order._id}`,
    });

 
    res.json({ success: true, session_url: session.url, orderId: order._id });

  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};
const verify_Order = async (req, res) => {
  const {orderId, success} = req.body;
  try{
    if(success){
      await orderModel.findByIdAndUpdate(orderId, {status: 'preparing'});
      res.json({success: true, message: 'Paid.'});
    }
  } catch(error){
    // Handle error if needed
  }
}

export { placeOrder, verify_Order };
