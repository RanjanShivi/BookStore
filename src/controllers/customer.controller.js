import HttpStatus from 'http-status-codes';
import * as CustomerService from '../services/customer.service';

export const addCustomerAddress = async (req, res) => {
    try {
      const data = await CustomerService.addCustomerAddress(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED, 
        data: data,
        message: 'Address added successfully'
      });
    } catch (error) {
      res.status(HttpStatus.CONFLICT).json({
        code: HttpStatus.CONFLICT,
        message: `${error}`
      });
    }
  };