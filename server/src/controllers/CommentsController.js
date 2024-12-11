import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { commentsService } from "../services/CommentsService";

export class CommentsController extends BaseController {
    constructor() {
        super('/api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:id', this.deleteComment)
    }
    async deleteComment(request, response, next) {
        try {
            const userId = request.userInfo.id;
            const commentId = request.params.id
            const deletedComment = await commentsService.deleteComment(userId, commentId)
            response.send(deletedComment)
        } catch (error) {
            next(error)
        }
    }
    async createComment(request, response, next) {
        try {
            const commentData = request.body;
            const user = request.userInfo;
            commentData.creatorId = user.id;
            const commentToSend = await commentsService.createComment(commentData);
            response.send(commentToSend);
        } catch (error) {
            next(error);
        }
    }




}
