import express from 'express';
import * as cartController from '../controllers/cart.controller.js';
import {userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/create/:_id', userAuth, cartController.createCart);

router.get('/get', userAuth, cartController.getCartItems);

router.put('/update/:_id', userAuth, cartController.updateCartItems);

router.delete('/delete/:_id', userAuth, cartController.deleteCartItems);

export default router;
