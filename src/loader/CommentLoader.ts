import DataLoader from "dataloader";
import { ObjectId } from "mongodb";
import { CommentModel } from "../entity/CommentEntity";

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

const commentLoader = new DataLoader(
  async (commentIds: readonly ObjectId[]) => {
    console.log("^^^^^^^^^");
    console.log(commentIds);
    const comments = await CommentModel.find({
      _id: { $in: commentIds as ObjectId[] },
    });
    console.log("&&&&&&&&&&");
    console.log(comments);

    return comments;
  }
);
export { commentLoader };
