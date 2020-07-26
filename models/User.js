const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
  /*Every user will have it's own array of links*/
  links: [{ type: Types.ObjectId, /* Refer to Link.js Model  */ ref: 'Link' }],
})

module.exports = model('User', schema)
