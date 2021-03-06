import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

  jwt.verify(bearerToken, process.env.SECRET_KEY1, (err, verifiedToken) =>{
  if(err){
    throw {
      code: HttpStatus.BAD_REQUEST,
      message: 'Authorization token is incorect'
    };
  }else {
    req.body['token'] = verifiedToken;
    req.body.userId = verifiedToken.id;
    next();
      
    }
  });
} catch (error) {
next(error);
}
};
