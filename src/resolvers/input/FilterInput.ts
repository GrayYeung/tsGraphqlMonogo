import { Field, InputType, Int } from "type-graphql";
import { SORT_BY } from "../../enum/SortBy";
import { SORT_ORDER } from "../../enum/SortingOrder";

@InputType()
export class FilterInput {
  @Field({ nullable: true })
  bookName?: string = "";

  @Field({ nullable: true })
  authorName?: string = "";

  // @Field({ nullable: true })
  // keyword?: string = "";

  @Field(() => SORT_BY, { nullable: true })
  sortingBy?: SORT_BY = SORT_BY.PublishDate;

  @Field(() => SORT_ORDER, { nullable: true })
  sortingOrder?: SORT_ORDER = SORT_ORDER.Acs;

  @Field(() => Int, { nullable: true })
  skip?: number = 0;

  @Field(() => Int, { nullable: true })
  limit?: number = 10;
}
