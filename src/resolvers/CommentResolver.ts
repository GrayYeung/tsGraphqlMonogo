import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { CommentModel } from "../entity/CommentEntity";
import { Comment } from "../model/Comment";
import { CreateCommentInput } from "./input/CommentInput";
import { User } from "../model/User";
import { UserService } from "../service/UserService";
import { CommentService } from "../service/CommentService";
import { UserModel } from "../entity/UserEntity";

@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    private userService: UserService,
    private commentService: CommentService
  ) {}

  @Query(() => [Comment])
  async comments() {
    const comment = await CommentModel.find().lean();
    return comment.map((it) => this.commentService.commentEntityToComment(it));
  }

  @Mutation(() => Comment)
  async createComment(@Arg("input") input: CreateCommentInput) {
    const comment = new CommentModel({
      content: input.content,
      author: input.userId,
    });
    await comment.save();

    return this.commentService.commentEntityToComment(comment);
  }

  @FieldResolver()
  async author(@Root() comment: Comment): Promise<User | null> {
    const user = await UserModel.findOne({ user: comment.author });
    if (user != null) {
      return this.userService.userEntityToUser(user);
    } else {
      return null;
    }
  }
}
