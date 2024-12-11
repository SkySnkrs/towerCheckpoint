import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { ticketService } from "../services/TicketsService";

export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.postTickets)
            .delete('/:id', this.deleteTicket)
    }
    async deleteTicket(request, response, next) {
        try {
            const userId = request.userInfo.id;
            const ticketId = request.params.id
            const deletedTicket = await ticketService.deleteTicket(userId, ticketId)
            response.send(deletedTicket)
        } catch (error) {
            next(error)
        }
    }

    async postTickets(request, response, next) {
        try {
            const user = request.userInfo
            const ticketData = request.body
            ticketData.accountId = user.id
            const postedTicket = await ticketService.postTickets(ticketData)
            response.send(postedTicket)
        } catch (error) {
            next(error)
        }
    }

}