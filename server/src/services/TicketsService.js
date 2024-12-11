import { dbContext } from "../db/DbContext"
import { accountService } from "./AccountService";

class TicketsService {


    async deleteTicket(userId, ticketId) {
        const userTickets = await accountService.getMyTickets(userId);

        const ticketToDelete = userTickets.find(ticket => ticket._id.toString() === ticketId);

        if (!ticketToDelete) {
            throw new Error('Ticket not found or does not belong to the user');
        }

        await dbContext.Tickets.findByIdAndDelete(ticketId);

        return { message: 'Ticket successfully deleted', ticket: ticketToDelete };
    }

    async postTickets(ticketData) {
        const createdTicket = await dbContext.Tickets.create(ticketData);
        await createdTicket.populate('profile event');

        return createdTicket;
    }
}

export const ticketService = new TicketsService()