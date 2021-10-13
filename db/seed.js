import Dog from '../models/dog.js'
import User from '../models/user.js'
import Centre from '../models/centre.js'
import { connectDb, truncateDb, disconnectDb } from './helper.js'
import dogData from './data/dogs.js'
import centreData from './data/centres.js'

async function seed(){
  console.log('run seed')
  try {
    await connectDb()
    console.log('🍓 Database connected')
    await truncateDb()
    console.log('🍓 Database dropped')

    const user = await User.create({
      username: 'Admin', 
      email: 'admin@mail.com',
      password: 'pass',
      passwordConfirmation: 'pass',
      isAdmin: true,
    })

    dogData.forEach(dog => {
      dog.addedBy = user
    })

    const dog = await Dog.create(dogData)

    const centre = await Centre.create(centreData)

    console.log(`${dog.length} number of dogs added`, dog)
    console.log(`${centre.length} number of centres added`, centre)
    

  } catch (error) {
    console.log('something went wrong')
    console.log(error)
  }

  await disconnectDb()
  console.log('🍓 Database disconnected')
}

seed()