import Wishlist from '../models/wishlist.model';
import Book from '../models/book.model';

export const addWishlist = async (bookId, body) => {
    const searchBook = await Book.findById(bookId);
    if (!searchBook) {
        throw new Error('Book not available')
    }
    else {
        const wishlistPresent = await Wishlist.findOne({ userId: body.userId })
        if (wishlistPresent) {
            const bookPresentInWishlist = await wishlistPresent.book.find(book => book.bookId == bookId)
            if (bookPresentInWishlist) {
                throw new Error('Book already added to wishlist')
            } else {
                let newBook = {
                    bookId: searchBook._id,
                    bookName: searchBook.bookName,
                    description: searchBook.description,
                    author: searchBook.author,
                    price: searchBook.price
                }
                wishlistPresent.book.push(newBook);
                const wishlist = await Wishlist.findOneAndUpdate({ userId: body.userId }, {
                    $set: {
                        book: wishlistPresent.book
                    }
                },
                    { new: true }
                )
                return wishlist

            }

        } else {
            let userWishlist = new Wishlist({
                'userId': body.userId,
                'book': {
                    bookId: searchBook._id,
                    bookName: searchBook.bookName,
                    description: searchBook.description,
                    author: searchBook.author,
                    price: searchBook.price

                }
            })
            return await userWishlist.save();
        }
    }
};

export const getWishlistItems = async (userId) => {
    const data = await Wishlist.find({ userId: userId });
    if (data.length === 0) {
        throw new Error('Wishlist is empty');
    }
    else {
        return data;
    }
};

export const deleteWishlistItems = async (bookId, body) => {

    const wishlistPresent = await Wishlist.findOne({
        userId: body.userId
    })
    if (wishlistPresent) {
        const bookPresentInWishlist = await wishlistPresent.book.find(book => book.bookId == bookId)
        if (bookPresentInWishlist) {
            let bookIndex = await wishlistPresent.book.findIndex(book => book.bookId == bookId);
            wishlistPresent.book.splice(bookIndex, 1)
            const updateWishlist = await Wishlist.findOneAndUpdate({
                userId: body.userId
            }, {
                $set: {
                    book: wishlistPresent.book,
                },
            }, { new: true });
            return updateWishlist;
        } else {
            throw new Error('book not present in wishlist');
        }
    } else {
        throw new Error('wishlist not present')
    }
};
