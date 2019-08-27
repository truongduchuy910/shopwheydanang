var mongoose = require('mongoose')
module.exports = {
    store: mongoose.model('store', mongoose.Schema(
        {
            data: Buffer,
            contentType: String
        }
    )),
    attributes: mongoose.model('attributes', mongoose.Schema(
        {
            name: String,
            content: String
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
                category: Array,
                pointId: String,
            }
        )),
        attributes: mongoose.model('product.attributes', mongoose.Schema(
            {
                name: String,
                content: String,
                pointId: String
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