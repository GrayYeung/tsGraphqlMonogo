import { ObjectId } from "mongodb";
import { prop as Property } from "@typegoose/typegoose/lib/prop";
import { getModelForClass, mongoose } from "@typegoose/typegoose";

mongoose.set("debug", true);

export class AccountEntity {
  _id: ObjectId;

  @Property()
  username: string;

  @Property()
  password: string;
}

export const AccountModel = getModelForClass(AccountEntity);
