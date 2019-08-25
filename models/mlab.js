var mongoose = require('mongoose')
var fs = require('fs')
module.exports = {
    initialize: function (config) {
        mongoose.connect(config.uri, { useNewUrlParser: true }, (err) => {
            if (!err) {
                console.log('Kết nối thành công tới mongodb');
            }
        })
    },
    saveStore: function (path, callback) {
        var { store } = this
        var data = new store()
        data.contentType = 'image/png'
        data.data = fs.readFileSync(path)
        data.save(function (err, docs) {
            if (err) throw err
            callback(err, docs)
        })
    },
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
                image: Array
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
    ))
}