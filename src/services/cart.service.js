import Cart from '../models/cart.model';
import Book from '../models/book.model';

export const createCart = async (bookId, body) => {
 const searchBook = await Book.findById(bookId);
 if(!searchBook){
     throw new Error('Book does not exist')
 }
 else{
     const cartPresent = await Cart.findOne({userId: body.userId})//1
     if(cartPresent){
        let newBook = {
                        bookId: searchBook._id,
                        bookName: searchBook.bookName,
                        description: searchBook.description,
                        author: searchBook.author,
                        quantity: 1,
                        price: searchBook.price,
                        discountedPrice: searchBook.discountedPrice
            
            
                    }
                    cartPresent.book.push(newBook);
                    return cartPresent
     }else{
        let newCart = Cart.create({
                       'userId': body.userId,
                       'book': {
                        bookId: searchBook._id,
                        bookName: searchBook.bookName,
                        description: searchBook.description,
                        author: searchBook.author,
                        quantity: 1,
                        price: searchBook.price,
                        discountedPrice: searchBook.discountedPrice
                       }
                    })
                    return newCart
     }
 }
};

export const getCartItems = async (userId) => {
    const data = await Cart.find({userId: userId});
    if(data.length === 0){
      throw new Error ("Cart Not Present")
   } 
   else{
          return data;
    }
  };


  export const updateCartItems = async (bookId, body) => {
    const cartPresent = await Cart.find({userId: body.userId});
        if(cartPresent){
            const bookPresentInCart = await Cart.findOne({bookId: bookId})
            if (bookPresentInCart){
                cartPresent.book.bookPresentInCart.quantity = body.quantity;
               
            }else{
                throw new Error('book not present in cart');
            }
        }else{
            throw new Error('Cart not present');
        }
        return cartPresent
   };

   export const deleteCartItems = async (bookId) => {
       console.log("bookid-----", bookId)
      await Cart.findOneAndDelete({bookId: bookId});
      return '';
    };
