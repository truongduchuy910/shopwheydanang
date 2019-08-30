var mongoose = require('mongoose');
// special product of Loa Loa Media but base on KiotViet Product
var eventSchema = mongoose.Schema({
    title: String,
    type: String,
    image: String,
    html: String,
    start: Date,
    end: Date,
    Content: String,
});
module.exports = mongoose.model('event', eventSchema);