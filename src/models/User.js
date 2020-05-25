import mongoose from 'mongoose'
import { defaultSchema } from './_default'

const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, trim: true },
  username: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  ...defaultSchema
})

const User = mongoose.model('User', schema)

export default User
