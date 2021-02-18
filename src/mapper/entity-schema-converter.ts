import { BookEntity } from "../entity/BookEntity";
import { Book } from "../model/Book";

export type EntityConverter<T, R> = (self: T) => R;

type BookPojo = Readonly<BookEntity>;
type BookPojoOptional = BookPojo | null;

export const toBookGql: EntityConverter<BookPojo, Book> = (item: BookPojo) =>
  new Book({
    ...item,
  });

export const toBookOptionalGql: EntityConverter<
  BookPojoOptional,
  Book | null
> = (item: BookPojoOptional) => (item ? toBookGql(item) : null);
