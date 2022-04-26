import { Schema, model } from 'mongoose';


const cartSchema = new Schema(
  {
    userId: {
        type: String
    },
    book: [{
        bookId: {
            type: String
        },
        bookName: {
            type: String
          },
        author:{
            type: String
          },
        description:{
            type: String
          },
        quantity: {
            type: Number
        },
        price: {
            type: Number
        }
    }],
    cart_total: {
        type: Number
    },
    isPurchased: {
        type: Boolean,
        default: false
    }
},
  {
    timestamps: true
  }
);

export default model('Cart', cartSchema);
