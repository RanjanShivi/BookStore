import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import bookRoute from './book.route';
import wishlistRoute from './wishlist.route';
import cartRoute from './cart.route';

const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/books', bookRoute);
  router.use('/wishlist', wishlistRoute);
  router.use('/cart', cartRoute);

  return router;
};

export default routes;
