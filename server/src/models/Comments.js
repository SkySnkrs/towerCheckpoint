import { Schema } from "mongoose";

export const CommentsSchema = new Schema(
    {
        creatorId: { type: Schema.ObjectId, ref: 'Account', required: true },
        eventId: { type: Schema.ObjectId, ref: 'Events', required: true },
        body: { type: String, required: true, minLength: 1, maxLength: 500 },
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

CommentsSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})