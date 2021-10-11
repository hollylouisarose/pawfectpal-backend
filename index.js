import express from 'express'
import router from './config/router.js'
import { connectDb } from './db/helper.js'
import logger from './lib/logger.js'
import errorHandler from './lib/errorHandler.js'
import { port } from './config/environment.js'

const app = express()



app.use(express.json())
app.use('/', logger)
app.use('/api', router)
app.use(errorHandler)


async function startServer() {
  try {
    await connectDb()
    console.log('🤖 Database has connected')
    app.listen(port, () => console.log(`🤖 Up and running on port ${port}`))
  } catch (error) {
    console.log('🤖 Something went wrong starting the App')
    console.log(error)
  }
}

startServer()


