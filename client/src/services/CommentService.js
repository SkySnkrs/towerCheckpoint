import { Comment } from "@/models/Comment.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { logger } from "@/utils/Logger.js"

class CommentService {


    async deleteComment(commentId) {
        const deleteComment = await api.delete(`/api/comments/${commentId}`)
        const commentIndex = AppState.comments.findIndex(comment => comment.id == commentId)
        if (commentIndex !== -1) {
            AppState.comments.splice(commentIndex, 1);
            logger.log('[Un Attend Event]', deleteComment.data)
        }

    }


    async postComment(eventId, commentData) {
        const data = {
            body: commentData,
            eventId: eventId
        }
        const comment = await api.post('/api/comments', data);
        const newComment = new Comment(comment.data);
        AppState.comments.push(newComment);
    }

}

export const commentService = new CommentService()