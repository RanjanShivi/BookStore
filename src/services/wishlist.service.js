import Wishlist from '../models/wishlist.model';
import Book from '../models/book.model';

export const createWishlist = async (bookId, body) => {
    const searchBook = await Book.findById(bookId);
    if (!searchBook) {
        throw new Error('Book not available')
    }
    else {
        const wishlistPresent = await Wishlist.findOne({ userId: body.userId })
        if (wishlistPresent) {
            const bookPresentInWishlist = await Wishlist.findOne({ bookId: bookId })
            if (bookPresentInWishlist) {
                throw new Error('Book already present in Wishlist')
            } else {
                let newBook = {
                    bookId: searchBook._id,
                    bookName: searchBook.bookName,
                    description: searchBook.description,
                    author: searchBook.author,
                    price: searchBook.price

                }
                wishlistPresent.book.push(newBook);
                return wishlistPresent
            }

        } else {
            let newWishlist = Wishlist.create({
                'userId': body.userId,
                'book': {
                    bookId: searchBook._id,
                    bookName: searchBook.bookName,
                    description: searchBook.description,
                    author: searchBook.author,
                    price: searchBook.price

                }
            })
            return newWishlist
        }
    }
};

export const getWishlistItems = async (userID) => {
    const data = await Wishlist.find({ userID: userID });
    if (data.length === 0) {
        throw new Error("Items Not Present")
    }
    else {
        return data;
    }
};

export const deleteWishlistItems = async (bookId) => {
    await Wishlist.findOneAndDelete({ bookId: bookId });
    return '';
};
