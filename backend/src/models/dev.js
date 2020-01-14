const { model, Schema } = require('mongoose');

const PointSchema = Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
})

const DevSchema = Schema({
  name: String,
  github_user: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: PointSchema,
    index: '2dsphere'
  }
});

module.exports = model('Dev', DevSchema);