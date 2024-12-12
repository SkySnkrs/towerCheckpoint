import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { TowerEvent } from "@/models/TowerEvent.js"
import { Comment } from "@/models/Comment.js"

class EventService {
    async getComments(eventId) {
        const commentRaw = await api.get(`/api/events/${eventId}/comments`)
        const commentData = commentRaw.data.map(comment => new Comment(comment))
        AppState.comments = commentData
        logger.log('[Comments]', AppState.comments)
    }

    async getSelectedEvent(eventId) {
        AppState.selectedEvent = null
        const rawEvent = await api.get(`/api/events/${eventId}`)
        const event = new TowerEvent(rawEvent.data)
        AppState.selectedEvent = event
        logger.log('[Get Selected Event]', rawEvent)
    }

    async getEventPage(id) {
        const response = await api.get(`/api/events/${id}`)
        const event = new TowerEvent(response.data)
        AppState.selectedEvent = event
    }

    async getEventsByCategory(category) {
        await this.getEvents()
        if (category === "all") {
            return;
        }
        const eventData = AppState.events.filter((event) => event.type.toLowerCase() === category.toLowerCase());
        AppState.events = eventData;
        logger.log(`[Get Events By Category ${category}]`, AppState.events)
    }

    async getEvents() {
        AppState.events = []
        const response = await api.get('/api/events')
        const eventData = response.data.map(event => new TowerEvent(event))
        AppState.events = eventData
        logger.log('[Get Events]', AppState.events)
    }

}

export const eventService = new EventService()