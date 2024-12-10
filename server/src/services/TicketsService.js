import { dbContext } from "../db/DbContext"

class TicketsService {
    async postTickets(ticketData) {
        const createdTicket = await dbContext.Tickets.create(ticketData)
        await createdTicket.populate('event account')
        return createdTicket
    }

}

export const ticketService = new TicketsService()