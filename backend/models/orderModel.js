import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
      foodName: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 }
    }
  ],
  deliveryInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true }
  },
  totalAmount: { type: Number, required: true },
  deliveryFee: { type: Number, default: 2 },
  // status: { type: String, enum: ["processing","completed","pending"], default: 'pending' },
  status:{type:String,enum:["true","false"],default:"false"},
  createdAt: { type: Date, default: Date.now }
});

const orderModel = mongoose.model("orderModel", orderSchema);

export default orderModel;
