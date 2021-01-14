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
import { bookLoader } from "../loader/BookLoader";
import { User } from "../model/User";
import { userLoader } from "../loader/UserLoader";

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  @Query(() => [Comment])
  async comments(): Promise<Comment[]> {
    const comment = await CommentModel.find()
      // Alternative of FieldResolver: use populate
      // .populate("author")
      // .populate("book")
      .lean();

    console.log("Comment - comments - comment: ");
    console.log(comment);
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

  @FieldResolver(() => User)
  async commentator(@Root() commentArray: Comment[]): Promise<User | null> {
    // Query without DataLoader:
    // const user = await UserModel.findById(comment.author);
    // return user ? this.userService.userEntityToUser(user) : null;
    console.log("Comment - commentator - commentArray:");
    console.log(commentArray);
    console.log("Comment - commentator - commentArray - commentator:");
    console.log(commentArray.commentator);

    const users = await userLoader.load(commentArray.commentator!);

    return users.filter((user) =>
      commentArray.commentator!!.equals(user._id)
    )[0];
  }

  @FieldResolver(() => Book)
  async book(@Root() comment: Comment): Promise<Book | null> {
    // const book = await BookModel.findById(comment.book);
    // return book ? this.bookService.bookEntityToBook(book) : null;

    const books = await bookLoader.load(comment.book);

    return books.filter((book) => comment.book.equals(book._id))[0];
  }
}
