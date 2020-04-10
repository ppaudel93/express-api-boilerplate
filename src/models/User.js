import mongoose from 'mongoose'
import { defaultSchema } from './Model'

const schema = new mongoose.Schema({ 
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, trim: true },
  username: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true },
  ...defaultSchema
})

const User = mongoose.model('User', schema)

export default User
