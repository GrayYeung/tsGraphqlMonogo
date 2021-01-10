import { Field, ID, InputType } from "type-graphql";
import { ObjectID } from "typeorm";

@InputType()
export class CreateBookInput {
  @Field()
  name: string;

  @Field(() => ID)
  userId: ObjectID;

  @Field()
  publishDate: Date;
}
