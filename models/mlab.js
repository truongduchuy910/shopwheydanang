var mongoose = require('mongoose')
module.exports = {
    store: mongoose.model('store', mongoose.Schema(
        {
            data: Buffer,
            contentType: String
        }
    )),
    attribute: mongoose.model('attributes', mongoose.Schema(
        {
            name: String,
            content: String
        }
    )),
    hashtag: mongoose.model('hashtag', mongoose.Schema(
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
        information: mongoose.model('product.details', mongoose.Schema(
            {
                name: String,
                delta: Object,
                pointId: String
            }
        )),
        attribute: mongoose.model('product.attributes', mongoose.Schema(
            {
                name: String,
                content: String,
                pointId: String
            }
        ))
    },
    post: {
        basis: mongoose.model('post.basis', mongoose.Schema(
            {
                name: String,
                title: String,
                short: String
            }
        )),
        information: mongoose.model('post.informations', mongoose.Schema(
            {
                name: String,
                delta: Object,
                pointName: String
            }
        )),
        hashtag: mongoose.model('post.hashtag', mongoose.Schema(
            {
                name: String,
                content: String,
                pointName: String
            }
        ))
    },
    banner: mongoose.model('banner', mongoose.Schema(
        {
            name: String,
            content: String,
            type: String,
            images: Array
        }
    )),
}