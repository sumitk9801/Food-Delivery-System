 import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  foodId: {
    type: Number,
    ref: "Food",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
  items: [cartItemSchema],
}, { timestamps: true });

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
