import { UserEntity } from "./UserEntity";
import { ObjectId } from "mongodb";
import { prop as Property } from "@typegoose/typegoose/lib/prop";
import { getModelForClass } from "@typegoose/typegoose";
import { BookEntity } from "./BookEntity";
import { User } from "../model/User";
import { Book } from "../model/Book";

export class CommentEntity {
  _id: ObjectId;

  @Property({ required: false })
  content: string;

  @Property({ required: true, ref: UserEntity })
  author: User;

  @Property({ required: true, ref: BookEntity })
  book: Book;
}

export const CommentModel = getModelForClass(CommentEntity);
