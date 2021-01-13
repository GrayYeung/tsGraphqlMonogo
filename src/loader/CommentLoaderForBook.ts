import DataLoader from "dataloader";
import { ObjectId } from "mongodb";
import { CommentModel } from "../entity/CommentEntity";
import { Comment } from "../model/Comment";

const commentLoaderForBook = new DataLoader(
  async (bookIds: readonly ObjectId[]) => {
    const comments: Comment[] = await CommentModel.find({
      book: { $in: bookIds as ObjectId[] },
    });

    return bookIds.map((bookId) => {
      return comments.filter((comment) => comment.book.equals(bookId));
    });
  }
);
// const commentLoader = new DataLoader(
//     async (commentIds: readonly ObjectId[]) => {
//         const comments: Comment[] = await CommentModel.find({
//             book: { $in: commentIds as ObjectId[] },
//         });
//
//         return commentIds.map((commentId) => {
//             return comments.filter((comment) => comment._id.equals(commentId));
//         });
//     }
// );

export { commentLoaderForBook };
