import Customer from '../models/customer.model';

export const addCustomerAddress = async (body) => {
  const data = await Customer.create(body);
  return data;
 };