import { ObjectId } from "mongodb";
import { prop as Property } from "@typegoose/typegoose/lib/prop";
import { UserEntity } from "./UserEntity";
import { getModelForClass } from "@typegoose/typegoose";
import { User } from "../model/User";

export class BookEntity {
  _id: ObjectId;

  @Property({ required: false })
  name: string;

  @Property({ required: false, ref: UserEntity })
  author: User;

  @Property({ default: new Date() })
  publishDate: Date;
}

export const BookModel = getModelForClass(BookEntity);
