import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'

export function connectDb() {
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
  console.log('🍓 Database has connected')
  return mongoose.connect(dbURI, opts)
}

export function truncateDb(){
  if (mongoose.connection.readyState !== 0) {
    const { collections } = mongoose.connection

    const promises = Object.keys(collections).map(collection => {
      mongoose.connection.collection(collection).deleteMany({})
    })

    return Promise.all(promises)
  }

}

export function disconnectDb() {
  if (mongoose.connection.readyState !== 0) {
    return mongoose.disconnect()
  }
}
