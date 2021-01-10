import { Field, ID, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { User } from "./User";

@ObjectType()
export class Comment {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field()
  content: string;

  @Field(() => User, { nullable: true })
  author?: User;

  constructor({ _id, content, author }: Readonly<Comment>) {
    this._id = _id;
    this.content = content;
    this.author = author;
  }
}
