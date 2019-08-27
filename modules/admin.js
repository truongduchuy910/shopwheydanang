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
        Promise.all([
            new Promise((resolve, reject) => {
                collection.product.basis.findById(req.params.id, (err, docs) => {
                    resolve(docs)
                })
            }),
            new Promise((resolve, reject) => {
                collection.attributes.find({
                }, (err, docs) => {
                    resolve(docs)
                })
            })
        ])
            .then(result => {
                res.render('admin/pages/detail', {
                    active: {
                        detail: "active"
                    },
                    product: result[0],
                    attributes: result[1]
                })
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
        Promise.all([
            new Promise((resolve, reject) => {
                collection.product.basis.find({}, (err, docs) => {
                    resolve(docs)
                })
            })
        ])
            .then(result => {
                res.render('admin/pages/product', {
                    active: {
                        product: "active"
                    },
                    products: result[0]
                })
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
                newProduct.images = result;
                newProduct.sale = data.fields.sale;
                newProduct.price = data.fields.price;
                newProduct.save((err, docs) => {
                    res.redirect(`/ad/detail/${docs._id}`)
                })

            })

    },
    updateName: function (req, res) {
        collection.product.basis.findByIdAndUpdate(
            req.params.id,
            { name: req.body.fields.name },
            (err, docs) => {
                res.redirect(`/ad/detail/${req.params.id}`)
            })
    },
    updatePrice: function (req, res) {
        collection.product.basis.findByIdAndUpdate(
            req.params.id,
            { price: req.body.fields.price },
            (err, docs) => {
                res.redirect(`/ad/detail/${req.params.id}`)
            })
    },
    updateSale: function (req, res) {
        collection.product.basis.findByIdAndUpdate(
            req.params.id,
            { sale: req.body.fields.sale },
            (err, docs) => {
                res.redirect(`/ad/detail/${req.params.id}`)
            })
    },
    updateImage: function (req, res) {
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
                collection.product.basis.findByIdAndUpdate(req.params.id,
                    {
                        images: result
                    },
                    (err, docs) => {
                        res.redirect(`/ad/detail/${docs._id}`)
                    })
            })
    },
    saveAttribute: function (req, res) {
        collection.attributes.insertMany({
            name: req.params.name,
            content: req.body.fields.name
        }, (err, docs) => {
            res.redirect(`/ad/detail/${req.params.id}`)
        })
    },
    removeAttribute: function (req, res) {
        collection.attributes.findByIdAndRemove(
            req.params.attrId,
            (err, docs) => {
                res.redirect(`/ad/detail/${req.params.id}`)

            }
        )
    }
}
