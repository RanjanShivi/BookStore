import express from 'express';
import * as wishlistController from '../controllers/wishlist.controller.js';
import {userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/add/:_id', userAuth, wishlistController.addWishlist);

router.get('/get', userAuth, wishlistController.getWishlistItems);

router.delete('/delete/:_id', userAuth, wishlistController.deleteWishlistItems);

export default router;
