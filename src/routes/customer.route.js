import express from 'express';
import * as customerController from '../controllers/customer.controller.js';

const router = express.Router();

router.post('/add', customerController.addCustomerAddress);

export default router;