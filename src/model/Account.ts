import { Field, ID, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";

@ObjectType()
export class Account {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field()
  username: string;

  @Field()
  password: string;
}

export interface AccountPayload {
  _id: ObjectId;
  username: string;
}

@ObjectType()
export class AccountNotice {
  @Field(() => ID)
  _id: ObjectId;

  @Field()
  username: string;

  @Field()
  message: string;

  constructor(
    _id: ObjectId,
    username: string,

    message: string
  ) {
    this._id = _id;
    this.username = username;
    this.message = message;
  }
}
