import { Field, ID, InputType } from "type-graphql";
import { ObjectID } from "typeorm";

@InputType()
export class CreateCommentInput {
  @Field()
  content: string;

  @Field(() => ID)
  userId: ObjectID;

  @Field(() => ID)
  bookId: ObjectID;
}
