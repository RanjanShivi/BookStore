import { Schema, model } from 'mongoose';


const customerSchema = new Schema(
    {
        adressType: {
            type: String,
            default: 'Home'
        },

        fullAdress: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        pincode: {
            type: Number
        },

    },
    {
        timestamps: true
    }
);

export default model('Customer', customerSchema);
