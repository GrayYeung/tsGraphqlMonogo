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
  commentator?: ObjectId;

  @Field(() => Book)
  book: ObjectId;

  constructor({ _id, content, commentator, book }: Readonly<Comment>) {
    this._id = _id;
    this.content = content;
    this.commentator = commentator;
    this.book = book;
  }
}
