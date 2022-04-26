import Cart from '../models/cart.model';
import Order from '../models/order.model';

export const postOrder = async (body)=>{
    const cartPresent = await Cart.findOne({userId: body.userId});
    if(cartPresent){
        let bookrry = cartPresent.book;
        let orderCrt = await Order.create({'orders': bookrry}       
        )
        const order = await orderCrt.save();
        cartPresent.book = [];
        await Cart.findByIdAndUpdate({_id: cartPresent._id }, {$set: {book: cartPresent.book}}, {new: true} )
        return order

    }else{
        throw new error('No cart Exist')
    }
}