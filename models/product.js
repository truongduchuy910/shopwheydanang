var mongoose = require('mongoose');
// special product of Loa Loa Media but base on KiotViet Product
var productSchema = mongoose.Schema({
  topSale: Boolean,
  salePrice: Number,
  event: String,
  brand: String,
  
  id: Number,
  retailerId: Number,
  code: String,
  name: String,
  fullName: String,
  htmlFullName: String,

  categoryId: Number,
  categoryName: String,
  htmlCategoryName: String,
  allowsSale: Boolean,
  type: Number,
  hasVariants: Boolean,
  basePrice: Number,
  unit: String,
  conversionValue: Number,
  modifiedDate: String,
  isActive: Boolean,
  orderTemplate: String,
  onHand: Number,
  images: Array
}
);
module.exports = mongoose.model('product', productSchema);