import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Ticket } from "@/models/Ticket.js"
import { AppState } from "@/AppState.js"

class TicketService {

    async getMyTickets() {
        AppState.tickets = []
        const ticketData = await api.get('/account/tickets')
        const ticketPojo = await ticketData.data.map(ticket => new Ticket(ticket))
        AppState.tickets = ticketPojo
        logger.log("[My Tickets]", AppState.tickets)
    }

    async unAttendEvent(ticketId) {
        const response = await api.delete(`/api/tickets/${ticketId}`)
        const ticketIndex = AppState.tickets.findIndex(ticket => ticket.id === ticketId);
        if (ticketIndex !== -1) {
            AppState.tickets.splice(ticketIndex, 1);
            logger.log('[Un Attend Event]', response.data)
        }
    }



    async ticketsSold(eventId) {
        const ticketData = await api.get(`/api/events/${eventId}/tickets`)
        const ticketPojo = ticketData.data.map(ticketPojo => new Ticket(ticketPojo))
        AppState.tickets = ticketPojo
        logger.log('[Tickets Sold]', AppState.tickets)
    }

    async attendEvent(eventId) {

        const userAccountId = AppState.account.id;

        if (AppState.tickets.some(ticket => ticket.accountId === userAccountId)) {
            logger.log("User is already attending this event.");
            return;
        }
        const ticketData = await api.post('/api/tickets', { eventId: eventId })
        const ticket = new Ticket(ticketData.data)
        AppState.tickets.push(ticket)
        logger.log('[Attend Event]', AppState.tickets)
    }

}

export const ticketService = new TicketService()