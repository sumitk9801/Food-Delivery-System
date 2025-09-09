import express from 'express';
import { placeOrder } from '../controllers/orderController.js';
import auth from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post('/place', auth, placeOrder);

export default orderRouter;
