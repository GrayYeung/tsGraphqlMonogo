import { Service } from "typedi";
import { CommentEntity } from "../entity/CommentEntity";
import { Comment } from "../model/Comment";

@Service()
export class CommentService {
  commentEntityToComment(commentEntity: CommentEntity): Comment {
    const comment = new Comment({
      _id: commentEntity._id,
      content: commentEntity.content,
      commentator: commentEntity.commentator,
      book: commentEntity.book,
    });
    return comment;
  }
}
