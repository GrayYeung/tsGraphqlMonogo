import { UserEntity } from "./UserEntity";
import { ObjectId } from "mongodb";
import { prop as Property } from "@typegoose/typegoose/lib/prop";
import { getModelForClass, Ref } from "@typegoose/typegoose";

export class CommentEntity {
  _id: ObjectId;

  @Property({ required: false })
  content: string;

  @Property({ required: true, ref: UserEntity })
  author: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
