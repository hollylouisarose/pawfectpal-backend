import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const centreSchema = new mongoose.Schema({
  latitude: { type: Number, required: true, unique: true },
  longitude: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true, maxlength: 200 },
  address: { type: String, required: true, unique: true, maxlength: 200 },
  icon: { type: String, required: true, unique: false, default: '📍' },
})

centreSchema.plugin(mongooseUniqueValidator)

const Centre = mongoose.model('Centre', centreSchema)

export default Centre

