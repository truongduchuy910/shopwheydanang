var formidable = require('formidable')
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
    store: {
        data: mongoose.model('store', mongoose.Schema(
            {
                data: Buffer,
                contentType: String
            }
        )),
        save: function (path, callback) {
            var { data } = this
            var newData = new data()
            newData.contentType = 'image/png'
            newData.data = fs.readFileSync(path)
            newData.save(function (err, docs) {
                if (err) throw err
                callback(err, docs)
            })
        },
        send: function (req, res) {
            var { data } = this
            data.find(req.params.id, (err, docs) => {
                if (docs) {
                    res.contentType(docs.contentType)
                    res.send(docs.data)
                } else {
                    res.redirect('/assets/img/no-image.png')
                }
            })
        }
    },
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
function postParse(req, callback) {
    var form = new formidable.IncomingForm()
    var path = `./public/assets/img/upload/${Math.floor(Math.random() * Math.floor(999999999999)).toString()}`
    fs.mkdir(path, { recursive: true }, (err) => {
        if (err) {
            throw err
        } else {
            form.uploadDir = path
            form.keepExtensions = true
            form.parse(req, function (err, fields, files) {
                if (err) {

                }
                else {
                    fs.readdir(path, (err, files) => {
                        if (err) {

                        } else {
                            callback(err, { fields: fields, files: files, path: path })
                        }
                    })
                }


            })
        }
    })

}