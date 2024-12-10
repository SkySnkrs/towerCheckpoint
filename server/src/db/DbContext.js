import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { EventsSchema } from '../models/Events';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Events = mongoose.model('Events', EventsSchema)
}

export const dbContext = new DbContext()
