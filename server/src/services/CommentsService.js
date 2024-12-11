import { dbContext } from "../db/DbContext"

class CommentsService {

    async createComment(commentData) {
        const comment = (await dbContext.Comments.create(commentData)).populate('creator')
        return comment
    }

    async deleteComment(userId, commentId) {
        const userComments = await dbContext.Comments.find({ creatorId: userId });

        const commentToDelete = userComments.find(comment => comment._id.toString() === commentId);

        if (!commentToDelete) {
            throw new Error('Ticket not found or does not belong to the user');
        }

        await dbContext.Comments.findByIdAndDelete(commentId);

        return { message: 'Comment successfully deleted', Comment: commentId };
    }

}

export const commentsService = new CommentsService()