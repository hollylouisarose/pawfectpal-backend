import Dog from '../models/dog.js'
import User from '../models/user.js'
import { connectDb, truncateDb, disconnectDb } from './helper.js'
import dogData from './data/dogs.js'



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

    console.log(`${dog.length} number of dogs added`, dog)
    

  } catch (error) {
    console.log('something went wrong')
    console.log(error)
  }

  await disconnectDb()
  console.log('🍓 Database disconnected')
}

seed()