import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().min(4).required(),
    email: Joi.string().email().min(4).required(),
    password: Joi.string().min(4).required(),
    mobileNum: Joi.string().min(4).required(),

  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `Enter Valid Input: ${error}`
    });
  } else {
    next();
  }
};