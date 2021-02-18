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
  author?: User[];

  @Field({ nullable: true })
  publishDate?: Date;

  @Field(() => [Comment], { nullable: true })
  comments: Comment[];

  @Field(() => Int, { nullable: true })
  commentCount: number;

  constructor(convertible: Readonly<Book>) {
    Object.assign(this, convertible);
  }
}
