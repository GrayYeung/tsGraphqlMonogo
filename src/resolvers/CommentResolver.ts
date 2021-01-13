import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { CommentModel } from "../entity/CommentEntity";
import { Comment } from "../model/Comment";
import { CreateCommentInput } from "./input/CommentInput";
import { CommentService } from "../service/CommentService";
import { Book } from "../model/Book";
import { BookModel } from "../entity/BookEntity";
import { BookService } from "../service/BookService";
import { userLoader } from "../loader/UserLoader";
import { User } from "../model/User";

@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    private commentService: CommentService,
    private bookService: BookService
  ) {}

  @Query(() => [Comment])
  async comments() {
    const comment = await CommentModel.find()
      // Alternative of FieldResolver: use populate
      // .populate("author")
      // .populate("book")
      .lean();
    return comment.map((it) => this.commentService.commentEntityToComment(it));
  }

  @Mutation(() => Comment)
  async createComment(@Arg("input") input: CreateCommentInput) {
    const comment = new CommentModel({
      content: input.content,
      author: input.userId,
      book: input.bookId,
    });
    await comment.save();

    return this.commentService.commentEntityToComment(comment);
  }

  @FieldResolver()
  async author(@Root() comment: Comment): Promise<User> {
    // Query without DataLoader:
    // const user = await UserModel.findById(comment.author);
    // return user ? this.userService.userEntityToUser(user) : null;
    const users = await userLoader.load(comment.author!);

    return users.filter((user) => comment.author!.equals(user._id))[0];
  }

  @FieldResolver()
  async book(@Root() comment: Comment): Promise<Book | null> {
    const book = await BookModel.findById(comment.book);

    return book ? this.bookService.bookEntityToBook(book) : null;
  }
}
