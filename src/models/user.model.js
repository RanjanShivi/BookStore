import { Schema, model } from 'mongoose';


const userSchema = new Schema(
  {
    fullName: {
      type: String
    },
    email:{
      type: String,
      unique: true
    },
    password:{
      type: String
    },
    mobileNum:{
      type: String,
      // unique: true
    },
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
