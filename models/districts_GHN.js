var mongoose = require('mongoose');
// special product of Loa Loa Media but base on KiotViet Product
var districtSchema = mongoose.Schema({
    Code: String,
    Description: String,
    DistrictID: Number,
    DistrictName: String,
    IsRepresentative: Boolean,
    MiningText: String,
    Priority: Number,
    ProvinceID: Number,
    ProvinceName: String,
    SupportType: Number,
    Type: Number
});
module.exports = mongoose.model('district', districtSchema);