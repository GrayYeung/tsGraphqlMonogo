import {
  Arg,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { BookModel } from "../entity/BookEntity";
import { BookService } from "../service/BookService";
import { FilterInput } from "./input/FilterInput";
import { CreateBookInput } from "./input/BookInput";
import { Book } from "../model/Book";
import { User } from "../model/User";
import { Comment } from "../model/Comment";
import { UserModel } from "../entity/UserEntity";
import { commentLoaderForBook } from "../loader/CommentLoaderForBook";

@Resolver(() => Book)
export class BookResolver {
  constructor(private bookService: BookService) {}

  @Query(() => [Book])
  async books(
    @Arg("filterInput", { nullable: true }) filterInput?: FilterInput
  ): Promise<Book[]> {
    let filterApplied = filterInput ?? new FilterInput();
    console.log(filterApplied);

    // const book = await BookModel.find();
    // .populate("author")
    // .limit(filterApplied.limit!);

    const book = await BookModel.aggregate([
      {
        $lookup: {
          from: UserModel.collection.name,
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $match: {
          $and: [
            { name: { $regex: filterApplied.bookName } },
            { "author.name": { $regex: filterApplied.authorName } },
          ],
        },
      },
      {
        $sort: {
          [filterApplied.sortingBy as string]: filterApplied.sortingOrder as number,
        },
      },
      { $skip: filterApplied.skip },
      { $limit: filterApplied.limit },
    ]);

    // .sort({
    //   [filterApplied.sortingBy as string]: filterApplied.sortingOrder as number,
    // });
    // .skip(filterApplied.skip!)
    // .limit(filterApplied.limit!);

    const result = book.map((it) => this.bookService.bookEntityToBook(it));
    console.log("Book - books - result:");
    console.log(result);
    return result;
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

  @FieldResolver(() => User)
  async author(@Root() book: Book): Promise<User | null> {
    //   // Query without DataLoader:
    //   // const user = await UserModel.findById(book.author);
    //   // return user ? this.userService.userEntityToUser(user) : null;
    //   console.log("author -- book : ");
    //   console.log(book);
    //
    //   const userId = book.author;
    //   console.log("author -- userId : ");
    //   console.log(userId);
    //
    //   const userId2 = userId?._id;
    //   console.log("author -- userId2 : ");
    //   console.log("author -- userId33333332 : ");
    //   console.log(userId2);
    //
    //   const users = await userLoader.load(userId2!);
    //
    //   return users.filter((user) => userId2!.equals(user._id))[0];

    return book.author![0];
  }

  @FieldResolver(() => [Comment])
  async comments(@Root() book: Book): Promise<Comment[]> {
    // Query without DataLoader:
    // const comments = await CommentModel.find({ _id: book._id }).lean();
    // return comments.map((it) => this.commentService.commentEntityToComment(it));

    console.log("Book - comments - book:");
    console.log(book);
    console.log(book._id);
    const comments: Comment[] = await commentLoaderForBook.load(book._id);
    console.log("Book - comments - comments:");
    console.log(comments);

    return comments;
  }

  // @FieldResolver(() => User)
  // async commentator(@Root() commentArray: Comment[]): Promise<User | null> {
  //   // Query without DataLoader:
  //   // const user = await UserModel.findById(book.author);
  //   // return user ? this.userService.userEntityToUser(user) : null;
  //   console.log("Book - commentator - commentArray : ");
  //   console.log(commentArray);
  //
  //   // const userId = comment.commentator;
  //   // console.log("Book - commentator - userId : ");
  //   // console.log(userId);
  //   //
  //   // const users = await userLoader.load(userId!);
  //   //
  //   // return users.filter((user) => userId!.equals(user._id))[0];
  //
  //   const dummy = UserModel.findById("5ffb1bb3950e747fb1213651");
  //
  //   return dummy;
  // }

  @FieldResolver(() => Int)
  async commentCount(@Root() book: Book) {
    // Query without DataLoader:
    // const count = await CommentModel.countDocuments({ _id: book._id }).lean();
    // return count;

    const comments: Comment[] = await commentLoaderForBook.load(book._id);

    return comments.length;
  }
}
