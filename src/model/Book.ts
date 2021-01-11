import { Field, ID, Int, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { User } from "./User";
import { Comment } from "./Comment";

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

  @Field(() => [Comment], { nullable: true })
  comments: Comment[];

  @Field(() => Int, { nullable: true })
  commentCount: number;

  constructor({
    _id,
    name,
    author,
    publishDate,
    comments,
    commentCount,
  }: Readonly<Book>) {
    this._id = _id;
    this.name = name;
    this.author = author;
    this.publishDate = publishDate;
    this.comments = comments;
    this.commentCount = commentCount;
  }
}
