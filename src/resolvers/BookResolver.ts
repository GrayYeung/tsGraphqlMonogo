import {
  Arg,
  FieldResolver,
  Int,
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
import { Comment } from "../model/Comment";
import { CommentService } from "../service/CommentService";
import { CommentModel } from "../entity/CommentEntity";

@Resolver(() => Book)
export class BookResolver {
  constructor(
    private bookService: BookService,
    private commentService: CommentService,
    private userService: UserService
  ) {}

  @Query(() => [Book])
  async books() {
    const book = await BookModel.find().lean();

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

    return user ? this.userService.userEntityToUser(user) : null;
  }

  @FieldResolver(() => [Comment]!)
  async comments(@Root() book: Book): Promise<Comment[]> {
    const comments = await CommentModel.find({ book: book }).lean();

    return comments.map((it) => this.commentService.commentEntityToComment(it));
  }

  @FieldResolver(() => Int)
  async commentCount(@Root() book: Book) {
    const count = await CommentModel.countDocuments({ book: book }).lean();

    return count;
  }
}
