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
import { User } from "../model/User";
import { UserService } from "../service/UserService";
import { CommentService } from "../service/CommentService";
import { UserModel } from "../entity/UserEntity";
import { Book } from "../model/Book";
import { BookModel } from "../entity/BookEntity";
import { BookService } from "../service/BookService";

@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    private userService: UserService,
    private commentService: CommentService,
    private bookService: BookService
  ) {}

  @Query(() => [Comment])
  async comments() {
    const comment = await CommentModel.find().lean();
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
  async author(@Root() comment: Comment): Promise<User | null> {
    const user = await UserModel.findById(comment.author);

    return user ? this.userService.userEntityToUser(user) : null;
  }

  @FieldResolver()
  async book(@Root() comment: Comment): Promise<Book | null> {
    const book = await BookModel.findById(comment.book);

    return book ? this.bookService.bookEntityToBook(book) : null;
  }
}
