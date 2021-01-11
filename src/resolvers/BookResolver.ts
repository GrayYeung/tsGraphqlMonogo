import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { User } from "../model/User";
import { BookService } from "../service/BookService";
import { BookModel } from "../entity/BookEntity";
import { CreateBookInput } from "./input/BookInput";
import { UserModel } from "../entity/UserEntity";
import { UserService } from "../service/UserService";
import { Book } from "../model/Book";

@Resolver(() => Book)
export class BookResolver {
  constructor(
    private bookService: BookService,
    // private commentService: CommentService,
    private userService: UserService
  ) {}

  @Query(() => [Book])
  async books() {
    const book = await BookModel.find().populate("author").lean();

    return book.map((it) => this.bookService.bookEntityToBook(it));
  }

  @Mutation(() => Book)
  async createBook(@Arg("input") input: CreateBookInput) {
    const book = new BookModel({
      name: input.name,
      author: input.userId,
      publishDate: input.publishDate,
    });
    await book.save();

    return this.bookService.bookEntityToBook(book);
  }

  @FieldResolver()
  async author(@Root() book: Book): Promise<User | null> {
    const user = await UserModel.findById(book.author);
    if (user != null) {
      return this.userService.userEntityToUser(user);
    } else {
      return null;
    }
  }

  // @FieldResolver()
  // async comments(@Root() book: Book) {
  //   const commentList: Array<Comment> = await CommentModel.find().lean();
  //   const commentFilter: Array<Comment> = commentList.filter(
  //     (it) => it.book == book
  //   );
  //
  //   return commentFilter.map((it) =>
  //     this.commentService.commentEntityToComment(it)
  //   );
  //   //
  //   // if (commentFilter != null) {
  //   //   return this.commentService.commentEntityToComment(commentFilter);
  //   // } else {
  //   //   return null;
  //   // }
  // }

  // @FieldResolver()
  // async comments(@Root() book: Book): Promise<Comment | null> {
  //   const comment = await CommentModel.findById(book._id);
  //   if (comment != null) {
  //     return this.commentService.commentEntityToComment(comment);
  //   } else {
  //     return null;
  //   }
  // }
}
