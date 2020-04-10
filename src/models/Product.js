import mongoose from 'mongoose'
import { defaultSchema } from './Model'

const schema = new mongoose.Schema({ 
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  qty: { type: Number, default: 0 },

  ...defaultSchema
})

const Product = mongoose.model('Product', schema)

export default Product
