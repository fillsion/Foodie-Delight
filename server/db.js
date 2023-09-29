
const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/FoodieDelights';

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('open', function (ref) {
  console.log('Connected to mongo server.');

  mongoose.connection.db.listCollections().toArray(function (err,names) {
    console.log(names);
  })
})

module.exports = mongoose;