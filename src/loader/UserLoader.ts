import { UserModel } from "../entity/UserEntity";
import DataLoader from "dataloader";
import { ObjectId } from "mongodb";
import { User } from "../model/User";

const userLoader = new DataLoader(async (userIds: readonly ObjectId[]) => {
  const users: User[] = await UserModel.find({
    _id: { $in: userIds as ObjectId[] },
  });

  return userIds.map((userId) => {
    return users.filter((user) => user._id.equals(userId));
  });
});

export { userLoader };
