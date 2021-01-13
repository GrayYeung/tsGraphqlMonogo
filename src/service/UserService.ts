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

  async findUserFromModelById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);

    return user ? this.userEntityToUser(user) : null;
  }
}
