import { registerEnumType } from "type-graphql";

export enum SORT_BY {
  Name = "name",
  PublishDate = "publishDate",
}

registerEnumType(SORT_BY, {
  name: "SORT_BY",
});
