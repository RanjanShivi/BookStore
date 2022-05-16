import Cart from '../models/cart.model';
import Book from '../models/book.model';

export const createCart = async (bookId, body) => {
    const searchBook = await Book.findById(bookId);
    if (!searchBook) {
        throw new Error('Book not available')
    }
    else {
        const cartPresent = await Cart.findOne({ userId: body.userId })
        if (cartPresent) {
            let newBook = {
                bookId: searchBook._id,
                bookName: searchBook.bookName,
                description: searchBook.description,
                author: searchBook.author,
                quantity: 1,
                price: searchBook.price,
                discountedPrice: searchBook.discountedPrice
            }
            console.log("cartPresent----", cartPresent)
            cartPresent.book.push(newBook);
            const cart = await Cart.findOneAndUpdate({ userId: body.userId }, {
                $set: {
                    book: cartPresent.book
                }
            },
                { new: true }
            )
            return cart
        } else {
            let newCart = new Cart({
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
            return await newCart.save();
        }
    }
};

export const getCartItems = async (userId) => {
    const data = await Cart.find({ userId: userId });
    console.log("--------length", data.length)
    if (data === null) {
        throw new Error('Cart not present');
    }
    else {
        return data;
    }
};


export const updateCartItems = async (bookId, body) => {
    const cartPresent = await Cart.findOne({ userId: body.userId });
    console.log("-------->Cart", cartPresent)
    if (cartPresent) {
        const bookPresentInCart = await cartPresent.book.find(book => book.bookId == bookId)
        console.log("-------->book", bookPresentInCart)

        if (bookPresentInCart) {
            let bookIndex = await cartPresent.book.findIndex(bookInCart => bookInCart.bookId == bookId)
            console.log("-------->bookIndex", bookIndex)
            cartPresent.book[bookIndex].quantity = body.quantity;

            const updateCart = await Cart.findOneAndUpdate({ userId: body.userId }, {
                $set: {
                    book: cartPresent.book
                }
            },
                { new: true }
            )

            return updateCart

        } else {
            throw new Error('Book not present in cart');
        }
    } else {
        throw new Error('Cart not present');
    }

};

export const deleteCartItems = async (bookId, body) => {
    const cartPresent = await Cart.findOne({
        userId: body.userId
    })
    if (cartPresent) {
        const bookPresentInCart = await cartPresent.book.find(book => book.bookId == bookId)
        if (bookPresentInCart) {
            let bookIndex = await cartPresent.book.findIndex(book => book.bookId == bookId);
            cartPresent.book.splice(bookIndex, 1)
            const updateCart = await Cart.findOneAndUpdate({
                userId: body.userId
            }, {
                $set: {
                    book: cartPresent.book,
                },
            }, { new: true });
            return updateCart;
        } else {
            throw new Error('book not present in cart');
        }
    } else {
        throw new Error('cart not present')
    }
}

