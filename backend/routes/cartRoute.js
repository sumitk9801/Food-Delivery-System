import express from 'express';
import { addToCart, removeFromCart, getCart } from '../controllers/cartController.js';
import auth from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add', auth, addToCart);
cartRouter.post('/remove', auth, removeFromCart);
cartRouter.get('/get', auth, getCart);

export default cartRouter;
