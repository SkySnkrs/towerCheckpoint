import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { ticketService } from "../services/TicketsService";

export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.postTickets)
    }

    async postTickets(request, response, next) {
        try {
            const user = request.userInfo
            const ticketData = request.body
            ticketData.creatorId = user.accountId
            const postedTicket = await ticketService.postTickets(ticketData)
            response.send(postedTicket)
        } catch (error) {
            next(error)
        }
    }

}