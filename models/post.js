var mongoose = require('mongoose');
// special product of Loa Loa Media but base on KiotViet Product
var postSchema = mongoose.Schema({
    title: String,
    type: String,
    image: String,
    html: String,
    Content: String,
});
module.exports = mongoose.model('post', postSchema);