export class Ticket {
    constructor(data) {
        this.accountId = data.accountId,
            this.creatorId = data.creatorId,
            this.profile = data.profile,
            this.event = data.event
    }
}