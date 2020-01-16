const mongoose = require('mongoose')

module.exports = () => {
  mongoose.connect('mongodb://localhost:27017/omnistack', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
