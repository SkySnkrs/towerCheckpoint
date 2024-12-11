import { dbContext } from "../db/DbContext"

class EventsService {
    async getEventComments(eventId) {
        const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator')
        return comments
    }


    async getEventTickets(eventId) {
        const eventTickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile')
        return eventTickets;
    }



    async cancelEvent(userId, eventId) {
        const eventById = await this.getEventById(eventId)
        if (eventById.creatorId != userId) { throw new Error('You Cannot Delete An Event You Did Not Create. Make Sure You Are Signed In!') }
        if (eventById.isCanceled != false) { throw new Error('You Cannot Un-cancel Events! Be Smarter Next Time Genius') }
        eventById.isCanceled = true
        await eventById.save()
        return eventById
    }

    async updateEventById(eventId, eventData) {

        const eventById = await this.getEventById(eventId);
        if (eventById.creatorId != eventData.creatorId) { throw new Error('You did not create this event, therefore you may not edit it!') }
        if (eventById.isCanceled != false) { throw new Error('Event is cancelled, you may not update it at this time!') }
        eventById.description = eventData.description ?? eventById.description;
        eventById.name = eventData.name ?? eventById.name;

        await eventById.save();

        return eventById;
    }

    async getEventById(eventId) {
        const eventById = await dbContext.Events.findById(eventId).populate('creator ticketCount')
        return eventById
    }

    async getEvents() {

        const events = await dbContext.Events.find().populate('creator ticketCount')
        return events
    }

    async postEvents(data) {
        const events = await dbContext.Events.create(data)
        await events.populate('creator ticketCount')
        return events
    }

}

export const eventsService = new EventsService()