import { Schema } from "mongoose";

export const TicketsSchema = new Schema(
    {
        accountId: { type: Schema.ObjectId, ref: 'Account', required: true },
        eventId: { type: Schema.ObjectId, ref: 'Events', required: true }
    },
    { timestamps: true, toJSON: { virtuals: true } })

TicketsSchema.virtual('account', {
    localField: 'accountId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

TicketsSchema.virtual('event', {
    localField: 'eventId',
    ref: 'Events',
    foreignField: '_id',
    justOne: true
})