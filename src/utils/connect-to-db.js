import mongoose from 'mongoose'

const DB_BASE_URL = 'localhost'
const DB_NAME = 'inventory_system'

const connectToDb = () => {
  mongoose.connect(`mongodb://${DB_BASE_URL}/${DB_NAME}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
}

export default connectToDb