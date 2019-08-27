var mongoose = require('mongoose')
module.exports = {
    store: mongoose.model('store', mongoose.Schema(
        {
            data: Buffer,
            contentType: String
        }
    )),
    product: {
        basis: mongoose.model('product.basis', mongoose.Schema(
            {
                name: String,
                price: String,
                sale: String,
                images: Array
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
        ))
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
    )),
}