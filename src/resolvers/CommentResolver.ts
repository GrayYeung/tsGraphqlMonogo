import {Arg, Int, Mutation, Query, Resolver} from "type-graphql";
import {Comment} from "../entity/Comment";
import {User} from "../entity/User";


@Resolver()
export class CommentResolver {

    @Query( () => [Comment] )
    async comments() {
        const comment = await Comment.find()
        // const test = comment.map(it => it.author)
        // console.log(test)
        return comment
    }

    @Mutation( () => Comment)
    async createComment(
        @Arg ("content") content: string,
        @Arg ("userId", () => Int) userId: number
    ) {
        const user = await User.findOne({id: userId})

        const comment = await Comment.create({content, author: user}).save()
        // const comment = await Comment.create({content}).save()

        return comment

    }



}