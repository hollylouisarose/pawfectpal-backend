import Centre from '../models/centre.js'
// import { NotFound, Unauthorized } from '../lib/errors.js'

// * CENTRES COLLECTION

// * Get all centres

async function centreIndex(_req, res, next){

  try {
    const centres = await Centre.find()
    return res.status(200).json(centres)
  } catch (err) {
    next(err)
  }

}

//  * Add a centre

async function addCentre(req, res, next){
  
  try {
    const newCentre = await Centre.create(req.body)
    return res.status(201).json(newCentre)
  } catch (err) {
    next(err)
  }

}



export default {
  index: centreIndex,
  create: addCentre,
}