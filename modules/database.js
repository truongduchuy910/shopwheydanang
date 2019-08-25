var mongoose = require('mongoose');
module.exports = {
    initialize: function (config) {
        mongoose.connect(config.uri, { useNewUrlParser: true }, (err) => {
            if (!err) {
                console.log('Kết nối thành công tới mongodb');
            }
        })
    },
    product: {
        basis: mongoose.model('product.basis', mongoose.Schema(
            {
                name: String,
                price: String,
                sale: String
            }
        )),
        details: mongoose.model('product.details', mongoose.Schema(
            {
                description: Object,
                guide: Object,
                detail: Object,
                taste: Array,
                brand: Array,
                function: Array,
                category: Array
            }
        )),
        attributes: mongoose.model('product.attributes', mongoose.Schema(
            {
                taste: Array,
                brand: Array,
                function: Array,
                category: Array
            }
        )),
    },
    post: mongoose.model('post', mongoose.Schema(
        {
            content: Object
        }
    )),
    banner: mongoose.model('banner', mongoose.Schema(
        {
            slider: Array,
            top: String,
            center: String
        }
    ))
}