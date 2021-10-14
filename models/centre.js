import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const centreSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  name: { type: String, required: true, unique: true, maxlength: 200 },
  address: { type: String, required: true, unique: true, maxlength: 200 },
  website: { type: String, required: true, maxlength: 500 },
  icon: { type: String, required: true },
})

centreSchema.plugin(mongooseUniqueValidator)

const Centre = mongoose.model('Centre', centreSchema)

export default Centre

