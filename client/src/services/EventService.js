import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { TowerEvent } from "@/models/TowerEvent.js"
import { Comment } from "@/models/Comment.js"
import Pop from "@/utils/Pop.js"
import { Modal } from "bootstrap"

class EventService {
    async cancelEvent(eventId) {
        AppState.selectedEvent = null
        const response = await api.delete(`/api/events/${eventId}`)
        const event = new TowerEvent(response.data)
        AppState.selectedEvent = event
        logger.log('[Cancel Event]', response.data)
    }

    async createEvent(eventData) {
        const payload = {
            name: eventData.name,
            coverImg: eventData.coverImg,
            location: eventData.location,
            capacity: eventData.capacity,
            startDate: `${eventData.startDate}T${formatTime(eventData.startHour, eventData.startMinute, eventData.startPeriod)}`,
            type: eventData.type,
            description: eventData.description
        };
        function formatTime(hour, minute, period) {
            let formattedHour = period === "PM" && hour < 12 ? hour + 12 : hour;
            if (period === "AM" && hour === 12) formattedHour = 0;
            return `${formattedHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00`;
        }
        const event = await api.post('/api/events', payload)
        logger.log(event.data)
        const rawEvent = new TowerEvent(event.data)
        AppState.events.push(rawEvent)
        Pop.success(`Successfully Created Event!, ${event.data.name}`)
        Modal.getInstance('#createEvent').hide()
        return event.data
    }

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