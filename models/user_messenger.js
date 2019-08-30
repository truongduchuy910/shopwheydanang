var mongoose = require('mongoose');
// special product of Loa Loa Media but base on KiotViet Product
var userMsSchema = mongoose.Schema({
    PSID: String,
    phone: String,
    order: Array,
    role: String,
}
);
module.exports = mongoose.model('user_messenger', userMsSchema);