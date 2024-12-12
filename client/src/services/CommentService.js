import { Comment } from "@/models/Comment.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"

class CommentService {
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