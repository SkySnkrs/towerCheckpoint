import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { TowerEvent } from "@/models/TowerEvent.js"

class EventService {
    async getEvents() {
        AppState.events = []
        const response = await api.get('/api/events')
        const eventData = response.data.map(event => new TowerEvent(event))
        AppState.events = eventData
        logger.log('[Get Events]', AppState.events)
    }

}

export const eventService = new EventService()