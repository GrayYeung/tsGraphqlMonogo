import { ObjectId } from "mongodb";
import { prop as Property } from "@typegoose/typegoose/lib/prop";
import { getModelForClass, mongoose } from "@typegoose/typegoose";

mongoose.set("debug", true);

export class UserEntity {
  _id: ObjectId;

  @Property({ required: false })
  name: string;

  @Property({ required: false })
  avatar: string;
}

export const UserModel = getModelForClass(UserEntity);
