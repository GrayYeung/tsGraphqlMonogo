import { UserEntity } from "../entity/UserEntity";
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
}
