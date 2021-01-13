import { UserEntity } from "./UserEntity";
import { ObjectId } from "mongodb";
import { prop as Property } from "@typegoose/typegoose/lib/prop";
import { getModelForClass, mongoose } from "@typegoose/typegoose";
import { BookEntity } from "./BookEntity";

mongoose.set("debug", true);

export class CommentEntity {
  _id: ObjectId;

  @Property({ required: false })
  content: string;

  @Property({ required: true, ref: UserEntity })
  author: ObjectId;

  @Property({ required: true, ref: BookEntity })
  book: ObjectId;
}

export const CommentModel = getModelForClass(CommentEntity);
