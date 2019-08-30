var mongoose = require('mongoose');
// special product of Loa Loa Media but base on KiotViet Product
var brandSchema = mongoose.Schema({
  name: String,
  image: String
});
module.exports = mongoose.model('brand', brandSchema);