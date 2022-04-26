import { Schema, model } from 'mongoose';

const bookSchema = new Schema(
    {
        bookName: {
            type: String,
            unique: true
        },
        author: {
            type: String
        },
        description: {
            type: String
        },
        price: {
            type: Number
        },
        discountedPrice: {
            type: Number
        },
        quantity: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

export default model('Book', bookSchema);
