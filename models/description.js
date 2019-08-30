var mongoose = require('mongoose');
// special product of Loa Loa Media but base on KiotViet Product
var descriptionSchema = mongoose.Schema({
  htmlFullName: String,
  description: String
});
module.exports = mongoose.model('description', descriptionSchema);