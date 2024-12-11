import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { EventsSchema } from '../models/Events';
import { TicketsSchema } from '../models/Tickets';
import { CommentsSchema } from '../models/Comments';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Events = mongoose.model('Events', EventsSchema)
  Tickets = mongoose.model('Tickets', TicketsSchema)
  Comments = mongoose.model('Comments', CommentsSchema)
}

export const dbContext = new DbContext()
