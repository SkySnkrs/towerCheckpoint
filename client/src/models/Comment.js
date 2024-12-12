export class Comment {
    constructor(data) {
        this.creatorId = data.creatorId,
            this.body = data.body,
            this.id = data.id,
            this.creator = data.creator,
            this.createdAt = data.createdAt
    }

    get updateDay() {
        return this.createdAt.toLocaleString('en-us', { month: "short", day: "2-digit", hour: '2-digit', minute: '2-digit' })
    }
}