import { UserModel } from "../entity/UserEntity";
import DataLoader from "dataloader";
import { ObjectId } from "mongodb";

// const batchUsers = async (UserIds: string[]) => {
//   let userService: UserService;
//
//   const users = await UserModel.find({ _id: { $in: UserIds } });
//
//   return users.map((user) => userService.userEntityToUser(user));
// };

// const UserLoader = new DataLoader(batchUsers);
// export { UserLoader };

// async function batchFunction(keys) {
//     const results = await UserModel.find({ _id: { $in: keys } });
//     return keys.map( (key) => results[key] || new Error(`No result for ${key}`))
// }
//
// const loader = new DataLoader(batchFunction)

const UL = new DataLoader(async (userIds: readonly ObjectId[]) => {
  console.log("$$$$$$$$$$$$$");
  console.log(userIds);
  const users = await UserModel.find({ _id: { $in: userIds as ObjectId[] } });
  console.log("%%%%%%%%%%%%");
  console.log(users);

  return users;
});
export { UL };
