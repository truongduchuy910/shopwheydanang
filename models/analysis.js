var mongoose = require('mongoose');
// special product of Loa Loa Media but base on KiotViet Product
var analysisSchema = mongoose.Schema({
    type: String, //category, search, product, event, cart, page, brand
    content: String,
    date: Date
});
module.exports = mongoose.model('analysis', analysisSchema);