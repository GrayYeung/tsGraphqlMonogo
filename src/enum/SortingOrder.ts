import { registerEnumType } from "type-graphql";

export enum SORT_ORDER {
  Acs = 1,
  Dsc = -1,
}

registerEnumType(SORT_ORDER, {
  name: "SORT_ORDER",
});
