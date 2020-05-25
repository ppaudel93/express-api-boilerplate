import mongoose from 'mongoose'
import { defaultSchema } from './_default'

const schema = new mongoose.Schema({ 
  name: { type: String, required: true, trim: true, unique: true },
  price: { type: Number, required: true },
  qty: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ...defaultSchema
})

const Product = mongoose.model('Product', schema)

export default Product
