var { collection, saveFileToStore } = require('./mlab')
var config = require('../models/config')
module.exports = {
    banner: function (req, res) {
        res.render('admin/pages/banner', {
            active: {
                banner: "active"
            },
            banners: {

            }
        })
    },
    detail: function (req, res) {
        res.render('admin/pages/detail/:id', {
            active: {
                detail: "active"
            },
            product: {}
        })
    },
    login: function (req, res) {
        res.render('admin/pages/login')
    },
    news: function (req, res) {
        res.render('admin/pages/news', {
            active: {
                news: "active"
            }
        })
    },
    product: function (req, res) {
        res.render('admin/pages/product', {
            active: {
                product: "active"
            },
            products: {}
        })
    },
    search: function (req, res) {
        res.render('admin/pages/search', {
            active: {
                search: "active"
            },
            products: {}
        })
    },
    saveProduct: function (req, res) {
        var data = req.body
        var newProduct = new collection.product.basis()
        var sync = new Array
        data.files.forEach(file => {
            sync.push(new Promise((resolve, reject) => {
                var filePath = data.path + '/' + file;
                saveFileToStore(filePath, (err, docs) => {
                    resolve(config.url + '/store/' + docs._id)
                })
            }))
        })
        Promise.all(sync)
            .then(result => {
                newProduct.name = data.fields.name;
                newProduct.image = result;
                newProduct.sale = data.fields.sale;
                newProduct.price = data.fields.price;
                res.redirect(`/ad/detail/${id}`, {
                    images: result
                })
            })

    }
}
