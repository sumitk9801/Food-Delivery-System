import express from 'express';
import { placeOrder ,verify_Order,userOrder,listOrders} from '../controllers/orderController.js';
import auth from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post('/place', auth, placeOrder);
orderRouter.post('/verify', verify_Order);
orderRouter.post('/orders', auth, userOrder);
orderRouter.get('/list',listOrders);

export default orderRouter;
