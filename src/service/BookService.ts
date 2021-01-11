import { Service } from "typedi";
import { BookEntity } from "../entity/BookEntity";
import { Book } from "../model/Book";

@Service()
export class BookService {
  // constructor(private userService: UserService) {}

  bookEntityToBook(bookEntity: BookEntity): Book {
    const book = new Book({
      _id: bookEntity._id,
      name: bookEntity.name,
      author: bookEntity.author,
      publishDate: bookEntity.publishDate,
    });

    return book;
  }
}
