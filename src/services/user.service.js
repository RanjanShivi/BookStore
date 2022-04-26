import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (body) => {
  const userData = await User.findOne({email: body.email})
  if(userData){
  throw new Error('User already exist')
  }
  else{
    const salt = await bcrypt.genSalt(10);
    body.password = bcrypt.hashSync(body.password, salt)
    const data = await User.create(body);
    return data;
  }

};

export const loginUser = async (body) => {
  const checkData = await User.findOne({email: body.email})
  if(checkData){
    console.log("checkdata:------", checkData)
    const validPassword = await bcrypt.compare(body.password, checkData.password);
    if(validPassword){
      let token = jwt.sign({"id": checkData._id}, process.env.SECRET_KEY1);
      body.token = token;
      console.log("body:-----", body)
      return body.token;
    }
    else{
      throw new Error('Invalid Password!!');
    }
  }
  else{
    throw new Error('User does not exist. Enter correct email');
  }

}

