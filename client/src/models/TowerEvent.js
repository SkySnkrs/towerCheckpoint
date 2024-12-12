
export class TowerEvent {
    constructor(data) {
        this.id = data.id,
            this.creatorId = data.creatorId,
            this.name = data.name,
            this.description = data.description,
            this.coverImg = data.coverImg,
            this.location = data.location,
            this.capacity = data.capacity,
            this.startDate = new Date(data.startDate),
            this.isCanceled = data.isCanceled,
            this.type = data.type,
            this.creator = data.creator,
            this.ticketCount = data.ticketCount
    }

    get EventDate() {
        return this.startDate.toLocaleString('en-us', { month: "short", day: "2-digit", hour: '2-digit', minute: '2-digit' })
    }

    get EventCategory() {
        const iconMapping = {
            concert: 'mdi-guitar-acoustic',
            convention: 'mdi-account-group',
            sport: 'mdi-football-helmet',
            digital: 'mdi-desktop-classic'
        };

        return iconMapping[this.type] || 'mdi-help-circle';
    }
}