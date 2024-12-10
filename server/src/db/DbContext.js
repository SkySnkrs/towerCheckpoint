import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { EventsSchema } from '../models/Events';
import { TicketsSchema } from '../models/Tickets';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Events = mongoose.model('Events', EventsSchema)
  Tickets = mongoose.model('Tickets', TicketsSchema)
}

export const dbContext = new DbContext()
