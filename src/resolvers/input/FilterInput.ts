import { Field, InputType } from "type-graphql";

@InputType()
export class FilterInput {
  @Field({ nullable: true })
  bookName?: string = "";

  @Field({ nullable: true })
  authorName?: string = "";

  // @Field({ nullable: true })
  // keyword?: string = "";
}
