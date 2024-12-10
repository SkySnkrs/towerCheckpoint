import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { eventsService } from "../services/EventsService";

export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getEvents)
            .get('/:id', this.getEventById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.postEvents)
            .put('/:id', this.updateEventById)
            .delete('/:id', this.cancelEvent)
    }
    async cancelEvent(request, response, next) {
        try {
            const eventId = request.params.id
            const userId = request.userInfo.id
            const canceledEvent = await eventsService.cancelEvent(userId, eventId)
            response.send(canceledEvent)
        } catch (error) {
            next(error)
        }
    }
    async updateEventById(request, response, next) {
        try {
            const eventId = request.params.id
            const user = request.userInfo
            const eventData = request.body
            eventData.creatorId = user.id
            const event = await eventsService.updateEventById(eventId, eventData)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(request, response, next) {
        try {
            const eventId = request.params.id

            const eventById = await eventsService.getEventById(eventId)
            response.send(eventById)
        } catch (error) {
            next(error)
        }
    }

    async getEvents(request, response, next) {
        try {
            const getEvents = await eventsService.getEvents()
            response.send(getEvents)
        } catch (error) {
            next(error)
        }
    }

    async postEvents(request, response, next) {
        try {
            const user = request.userInfo
            const eventData = request.body
            eventData.creatorId = user.id
            const createdEvent = await eventsService.postEvents(eventData)
            response.send(createdEvent)
        }
        catch (error) {
            next(error);
        }
    }
}