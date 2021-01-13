import DataLoader from "dataloader";
import { ObjectId } from "mongodb";
import { Book } from "../model/Book";
import { BookModel } from "../entity/BookEntity";

const bookLoader = new DataLoader(async (bookIds: readonly ObjectId[]) => {
  const books: Book[] = await BookModel.find({
    _id: { $in: bookIds as ObjectId[] },
  }).lean();

  return bookIds.map((bookId) => {
    return books.filter((book) => book._id.equals(bookId));
  });
});

export { bookLoader };
