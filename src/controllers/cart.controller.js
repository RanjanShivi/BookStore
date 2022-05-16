import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service';

export const createCart = async (req, res) => {
    try {
      const data = await CartService.createCart(req.params._id, req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED, 
        data: data,
        message: 'Cart Created successfully'
      });
    } catch (error) {
      res.status(HttpStatus.CONFLICT).json({
        code: HttpStatus.CONFLICT,
        message: `${error}`
      });
    }
  };

  export const getCartItems = async (req, res) => {
    try {
        const data = await CartService.getCartItems(req.body.userId);
        res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Cart fetched successfully'
    });
    }catch (error) {      
        res.status(HttpStatus.NO_CONTENT).json({
        code: HttpStatus.NO_CONTENT,
        message: `${error}`
    });
    }
  };

  export const updateCartItems = async (req, res) => {
    try {
      const data = await CartService.updateCartItems(req.params._id, req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK, 
        data: data,
        message: 'Cart updated successfully'
      });
    } catch (error) {
      res.status(HttpStatus.CONFLICT).json({
        code: HttpStatus.CONFLICT,
        message: `${error}`
      });
    }
  };

  export const deleteCartItems = async (req, res) => {
    try {
      const data = await CartService.deleteCartItems(req.params._id,req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK, 
        data: data,
        message: 'Cart item deleted successfully'
      });
    } catch (error) {
      res.status(HttpStatus.CONFLICT).json({
        code: HttpStatus.CONFLICT,
        message: `${error}`
      });
    }
  };