
import Dog from '../models/dog.js'
import { NotFound, Unauthorized } from '../lib/errors.js'

// * DOGS COLLECTION

// * Get all the dogs

async function dogIndex(_req, res, next){
  try {
    const dogs = await Dog.find()
    return res.status(200).json(dogs)
  } catch (err) {
    next(err)
  }
}

// * Add a dog

async function addDog(req, res, next){
  const { currentUserId, currentUser } = req
  try {
    const newDog = await Dog.create({ ...req.body, addedBy: currentUser })
    if (!newDog.addedBy.equals(currentUserId) && !currentUser.isAdmin){
      throw new Unauthorized()
    }
    return res.status(201).json(newDog)
  } catch (err) {
    next(err)
  }

}

//  * DOGS DETAIL

// * Show a dog

async function getOneDog(req, res, next){
  const { dogId } = req.params
  try {
    const dogToShow = await Dog.findById(dogId)
      .populate('addedBy')
      .populate('favouritedBy')
      .populate('comments.addedBy')
    if (!dogToShow){
      throw new NotFound()
    }
    return res.status(200).json(dogToShow)
  } catch (err) {
    next(err)
  }

}


// * Delete a dog

async function deleteDog(req, res, next){
  const { dogId } = req.params
  const { currentUserId, currentUser } = req
  try {
    const dogToRemove = await Dog.findById(dogId)
    if (!dogToRemove){
      throw new NotFound()
    }

    if (!dogToRemove.addedBy.equals(currentUserId) && !currentUser.isAdmin){
      throw new Unauthorized()
    }
    await dogToRemove.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }

}

// * Update a dog 

async function updateDog(req, res, next){
  const { dogId } = req.params
  const { currentUserId, currentUser } = req
  try {
    const dogToUpdate = await Dog.findById(dogId)
    Object.assign(dogToUpdate, req.body)
    if (!dogToUpdate){
      throw new NotFound()
    } 

    if (!dogToUpdate.addedBy.equals(currentUserId) && !currentUser.isAdmin){
      throw new Unauthorized()
    }

    await dogToUpdate.save()
    return res.status(201).json(dogToUpdate)
  } catch (err) {
    next(err)
  }
}

// * Add a comment

async function dogCreateComment(req, res, next){
  const { dogId } = req.params
  const { currentUser } = req
  try {
    const commentedDog = await Dog.findById(dogId)
    if (!commentedDog){
      throw new NotFound()
    }
    const createdComment = commentedDog.comments.create({ ...req.body, addedBy: currentUser })
    commentedDog.comments.push(createdComment)
    await commentedDog.save()
    return res.status(201).json(createdComment)
  } catch (err) {
    next(err)
  }
}

// * Delete a comment


async function dogDeleteComment(req, res, next){
  const { dogId, commentId } = req.params 
  const { currentUserId } = req 

  try {
    const dog = await Dog.findById(dogId)
    if (!dog){
      throw new NotFound()
    }
    const commentToDelete = await dog.comments.id(commentId)
    if (!commentToDelete){
      throw new NotFound()
    }
    if (!commentToDelete.addedBy.equals(currentUserId)){
      throw new Unauthorized()
    }
    commentToDelete.remove()
    await dog.save()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }

}

async function dogFavourite(req, res, next) {
  const { dogId } = req.params
  const { currentUserId, currentUser } = req
  try {
    const dogToFavourite = await Dog.findById(dogId).populate('favouritedBy')

    if (!dogToFavourite) {
      throw new NotFound()
    }

    if (dogToFavourite.favouritedBy.find(user => currentUserId.equals(user._id))) {
      dogToFavourite.favouritedBy.remove(currentUserId)
    } else {
      dogToFavourite.favouritedBy.push(currentUser)
    }

    await dogToFavourite.save()

    return res.status(202).json(dogToFavourite)
  } catch (err) {
    next(err)
  }
}


export default {
  index: dogIndex,
  show: getOneDog, 
  create: addDog, 
  update: updateDog,
  delete: deleteDog,
  commentCreate: dogCreateComment,
  commentDelete: dogDeleteComment,
  favourite: dogFavourite,
}

