import express from 'express';
import { placeOrder ,verify_Order} from '../controllers/orderController.js';
import auth from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post('/place', auth, placeOrder);
orderRouter.post('/verify', auth, verify_Order);

export default orderRouter;
