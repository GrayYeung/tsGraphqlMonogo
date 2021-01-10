import { UserEntity, UserModel } from "../entity/UserEntity";
import { User } from "../model/User";
import { Service } from "typedi";

@Service()
export class UserService {
  userEntityToUser(userEntity: UserEntity): User {
    const user = new User({
      _id: userEntity._id,
      name: userEntity.name,
      avatar: userEntity.avatar,
    });
    return user;
  }

  async findIdAndReturn(userEntity?: User): Promise<User | null> {
    const user = await UserModel.findOne({ user: userEntity }).lean();
    if (user != null) {
      return this.userEntityToUser(user);
    } else return null;
  }
}
