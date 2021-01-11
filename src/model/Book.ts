import { Field, ID, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { User } from "./User";

@ObjectType()
export class Book {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field()
  name: string;

  @Field(() => User, { nullable: true })
  author?: User;

  @Field({ nullable: true })
  publishDate?: Date;

  // @Field(() => [Comment], { nullable: true })
  // comments: Comment[];

  constructor({ _id, name, author, publishDate }: Readonly<Book>) {
    this._id = _id;
    this.name = name;
    this.author = author;
    this.publishDate = publishDate;
    // this.comments = comments;
  }
}
