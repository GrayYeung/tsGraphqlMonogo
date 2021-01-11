import { Field, ID, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { User } from "./User";
import { Book } from "./Book";

@ObjectType()
export class Comment {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field()
  content: string;

  @Field(() => User, { nullable: true })
  author?: User;

  @Field(() => Book)
  book: Book;

  constructor({ _id, content, author, book }: Readonly<Comment>) {
    this._id = _id;
    this.content = content;
    this.author = author;
    this.book = book;
  }
}
