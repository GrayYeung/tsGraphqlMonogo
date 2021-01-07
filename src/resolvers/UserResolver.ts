import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {User} from "../entity/User";


@Resolver()
export class UserResolver {

    @Query( () => [User])
    users() {
        return User.find()
    }

    @Mutation( () => User)
    async createUser(
        @Arg ("name") name: string,
        @Arg ("avatar") avatar: string
    ) {
        const user = await User.create({name, avatar}).save()
        return user
    }


}