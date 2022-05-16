import HttpStatus from 'http-status-codes';
import * as WishlistService from '../services/wishlist.service.js';

export const addWishlist = async (req, res) => {
    try {
      const data = await WishlistService.addWishlist(req.params._id, req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED, 
        data: data,
        message: 'Wishlist Created successfully'
      });
    } catch (error) {
      res.status(HttpStatus.CONFLICT).json({
        code: HttpStatus.CONFLICT,
        message: `${error}`
      });
    }
  };

  export const getWishlistItems = async (req, res) => {
    try {
        const data = await WishlistService.getWishlistItems(req.body.userId);
        res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Wishlist items fetched successfully'
    });
    }catch (error) {      
        res.status(HttpStatus.NO_CONTENT).json({
        code: HttpStatus.NO_CONTENT,
        message: `${error}`
    });
    }
  };

  export const deleteWishlistItems = async (req, res) => {
    try {
      const data = await WishlistService.deleteWishlistItems(req.params._id, req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK, 
        data: data,
        message: 'Wishlist item deleted successfully'
      });
    } catch (error) {
      res.status(HttpStatus.CONFLICT).json({
        code: HttpStatus.CONFLICT,
        message: `${error}`
      });
    }
  };