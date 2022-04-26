import HttpStatus from 'http-status-codes';
import * as OrderService from '../services/order.service';


export const postOrder = async (req, res) => {
  try {
    const data = await OrderService.postOrder(req.body);
    console.log(req.body)
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED, 
      data: data,
      message: 'Order posted successfully'
    });
  } catch (error) {
    res.status(HttpStatus.CONFLICT).json({
      code: HttpStatus.CONFLICT,
      message: `${error}`
    });
  }
};