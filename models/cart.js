var mongoose = require('mongoose');
// special product of Loa Loa Media but base on KiotViet Product
var cartSchema = mongoose.Schema({
    date: Date,
    name: String,
    phone: String,
    province: String,
    district: String,
    address: String,
    total: Number,
    products: Array,
    complete: Boolean,
    comfirm: Boolean
});
module.exports = mongoose.model('cart', cartSchema);