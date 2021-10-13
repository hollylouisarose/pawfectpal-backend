import  mongoose  from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 200 },
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
},{
  timestamps: true,
})

const dogSchema = new mongoose.Schema({
  breed: { type: String, required: true, unique: true },
  image: { type: String, required: true, unique: true },
  origin: { type: String, required: true, unique: false },
  size: { type: String, required: true, unique: false },
  isCityDog: { type: Boolean, required: true },
  isGoodWithChildren: { type: Boolean, required: true },
  isGoodWithCats: { type: Boolean, required: true },
  walkLength: { type: Number, required: true, min: 0.5, max: 3 },
  characteristics: { type: [String] },
  description: { type: String, required: true, maxlength: 500 },
  comments: [commentSchema],
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  favouritedBy: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }],
})

dogSchema.plugin(mongooseUniqueValidator)

dogSchema.set('toJSON', { virtuals: true })

// * Register your Schema as a model here

const Dog = mongoose.model('Dog', dogSchema)

export default Dog
