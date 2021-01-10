import { ObjectId } from "mongodb";
import { prop as Property } from "@typegoose/typegoose/lib/prop";
import { UserEntity } from "./UserEntity";
import { getModelForClass, Ref } from "@typegoose/typegoose";

export class BookEntity {
  _id: ObjectId;

  @Property({ required: false })
  name: string;

  @Property({ required: false, ref: UserEntity })
  author: Ref<UserEntity>;

  @Property({ default: new Date() })
  publishDate: Date;
}

export const BookModel = getModelForClass(BookEntity);
