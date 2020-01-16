const Mongoose = require('mongoose')

const DevSchema = new Mongoose.Schema({
  name: String,
  bioGithub: String,
  userGithub: String,
  avatarGithub: String,
  techs: [String]
})

module.exports = Mongoose.model('Dev', DevSchema)
