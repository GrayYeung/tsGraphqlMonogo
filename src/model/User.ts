import { Field, ID, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";

@ObjectType()
export class User implements Record<string, any> {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  avatar: string;

  constructor({ _id, name, avatar }: Readonly<User>) {
    this._id = _id;
    this.name = name;
    this.avatar = avatar;
  }
}
