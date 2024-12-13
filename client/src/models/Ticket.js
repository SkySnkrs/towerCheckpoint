export class Ticket {
    constructor(data) {
        this.accountId = data.accountId,
            this.eventId = data.eventId,
            this.profile = data.profile,
            this.event = data.event
        this.id = data.id
    }

    get EventDate() {
        return this.event.startDate.toLocaleString('en-us', { month: "short", day: "2-digit", hour: '2-digit', minute: '2-digit' })
    }

    get EventCategory() {
        const iconMapping = {
            concert: 'mdi-guitar-acoustic',
            convention: 'mdi-account-group',
            sport: 'mdi-football-helmet',
            digital: 'mdi-desktop-classic'
        };

        return iconMapping[this.event.type] || 'mdi-help-circle';
    }
}