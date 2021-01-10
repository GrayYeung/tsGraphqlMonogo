import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserModel } from "../entity/UserEntity";
import { User } from "../model/User";
import { CreateUserInput } from "./input/UserInput";
import { UserService } from "../service/UserService";

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async users(@Arg("name", { nullable: true }) name?: string): Promise<User[]> {
    const users = await UserModel.find({ name }).lean();
    return users.map((it) => this.userService.userEntityToUser(it));
  }

  @Mutation(() => User)
  async createUser(@Arg("input") input: CreateUserInput): Promise<User> {
    const user = new UserModel({
      name: input.name,
      avatar: input.avatar,
    });
    await user.save();

    return this.userService.userEntityToUser(user);
  }
}
