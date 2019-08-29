var { collection, saveFileToStore, removeFilesStore } = require('./mlab')
var config = require('../models/config')
var { QuillDeltaToHtmlConverter } = require('quill-delta-to-html');
var fs = require('fs')
module.exports = {
    banner: function (req, res) {
        Promise.all([
            new Promise((resolve, reject) => {
                collection.banner.find({},
                    (err, docs) => {
                        resolve(docs)
                    })
            })
        ])
            .then(result => {
                res.render('admin/pages/banner', {
                    active: {
                        banner: "active"
                    },
                    setting: config.setting,
                    banners: result[0]
                })
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
                collection.attribute.find({
                }, (err, docs) => {
                    resolve(docs)
                })
            }),
            new Promise((resolve, reject) => {
                collection.product.attribute.find({ pointId: req.params.id }, (err, docs) => {
                    resolve(docs)
                })
            }),
            new Promise((resolve, reject) => {
                collection.product.information.find({ pointId: req.params.id }, (err, docs) => {
                    var result = new Object
                    docs.forEach(inf => {
                        result[inf.name] = new QuillDeltaToHtmlConverter(inf.delta, {}).convert()
                    })
                    resolve(result)
                })
            })
        ])
            .then(result => {
                var product = ''
                if (result[0]) product = result[0];
                var attributes = ''
                if (result[1]) attributes = result[1];
                var productAttributes = ''
                if (result[2]) productAttributes = result[2];
                var productInformation = ''
                if (result[3]) productInformation = result[3];
                res.render('admin/pages/detail', {
                    setting: config.setting,
                    product: product,
                    attributes: attributes,
                    productAttributes: productAttributes,
                    productInformation: productInformation,
                    active: {
                        detail: "active"
                    }
                })
            })

    },
    login: function (req, res) {
        res.render('admin/pages/login')
    },
    post: function (req, res) {
        Promise.all([
            new Promise((resolve, reject) => {
                collection.post.information.find({}, (err, docs) => {
                    var result = new Array
                    docs.forEach(inf => {
                        result.push(
                            {
                                name: inf.name,
                                pointName: inf.pointName,
                                html: new QuillDeltaToHtmlConverter(inf.delta, {}).convert()
                            }
                        )
                    })
                    console.log(result)
                    resolve(result)
                })
            })
        ])
            .then(result => {
                res.render('admin/pages/post', {
                    setting: config.setting,
                    active: {
                        detail: "active"
                    },
                    informations: result[0]
                })
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
                    setting: config.setting,

                    active: {
                        product: "active"
                    },

                    products: result[0],
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
                    resolve(docs._id)

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
                    fs.rmdir(data.path, (err, docs) => { })
                    res.redirect(`/ad/detail/${docs._id}`)
                })

            })

    },
    removeProduct: function (req, res) {
        collection.product.basis.findById(
            req.params.id,
            (err, docs) => {
                if (docs) {
                    removeFilesStore(docs.images)

                    collection.product.information.remove({
                        pointId: docs._id
                    }, (err, docs) => {

                    })

                    collection.product.attribute.remove({
                        pointId: docs._id
                    }, (err, docs) => {

                    })
                    collection.product.basis.findByIdAndDelete(req.params.id,
                        (er, docs) => { })
                }

                res.redirect('/ad/product')
            }
        )
    },
    updateName: function (req, res) {
        collection.product.basis.findByIdAndUpdate(
            req.params.id,
            { name: req.body.fields.name },
            (err, docs) => {
                fs.rmdir(req.body.path, (err, docs) => { })
                res.redirect(`/ad/detail/${req.params.id}`)
            })
    },
    updatePrice: function (req, res) {
        collection.product.basis.findByIdAndUpdate(
            req.params.id,
            { price: req.body.fields.price },
            (err, docs) => {
                fs.rmdir(req.body.path, (err, docs) => { })
                res.redirect(`/ad/detail/${req.params.id}`)
            })
    },
    updateSale: function (req, res) {
        collection.product.basis.findByIdAndUpdate(
            req.params.id,
            { sale: req.body.fields.sale },
            (err, docs) => {
                fs.rmdir(req.body.path, (err, docs) => { })
                res.redirect(`/ad/detail/${req.params.id}`)
            })
    },
    updateImage: function (req, res) {
        var data = req.body
        var newProduct = new collection.product.basis()
        var sync = new Array
        collection.product.basis.findById(req.params.id,
            (err, docs) => {
                removeFilesStore(docs.images)
            })
        data.files.forEach(file => {
            sync.push(new Promise((resolve, reject) => {
                var filePath = data.path + '/' + file;
                saveFileToStore(filePath, (err, docs) => {
                    resolve(docs._id)

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
                        fs.rmdir(data.path, (err, docs) => {
                            console.log(data.path, err, docs)

                        })
                        res.redirect(`/ad/detail/${docs._id}`)
                    })
            })
    },
    saveAttribute: function (req, res) {
        collection.attribute.find({
            name: req.params.name,
            content: req.body.fields.name
        }, (err, docs) => {
            if (docs) {
                collection.attribute.insertMany({
                    name: req.params.name,
                    content: req.body.fields.name
                }, (err, docs) => {
                    fs.rmdir(req.body.path, (err, docs) => { })
                    res.redirect(`/ad/detail/${req.params.id}`)
                })
            } else {
                console.log(docs)
                res.redirect(`/ad/detail/${req.params.id}`)


            }
        })

    },
    removeAttribute: function (req, res) {
        collection.attribute.findByIdAndRemove(
            req.params.attrId,
            (err, docs) => {
                res.redirect(`/ad/detail/${req.params.id}`)

            }
        )
    },
    saveProductAttribute: function (req, res) {
        collection.product.attribute.insertMany({
            pointId: req.params.id,
            name: req.params.name,
            content: req.body.fields.name
        }, (err, docs) => {
            fs.rmdir(req.body.path, (err, docs) => { })

            res.send(docs)
        })
    },
    removeProductAttribute: function (req, res) {
        collection.product.attribute.deleteMany({
            name: req.params.name,
            content: req.body.fields.name
        }, (err, docs) => {
            fs.rmdir(req.body.path, (err, docs) => { })
            res.send(docs)
        })
    },
    saveProductInfomation: function (req, res) {
        collection.product.information.deleteMany({
            name: req.params.name,
            pointId: req.params.id
        }, (err, docs) => {
            collection.product.information.insertMany({
                pointId: req.params.id,
                name: req.params.name,
                delta: JSON.parse(req.body.fields.delta)
            }, (err, docs) => {
                fs.rmdir(req.body.path, (err, docs) => { })

                res.send()
            })
        })

    },
    uploadBanner: function (req, res) {
        var data = req.body
        var sync = new Array
        collection.banner.findOne({
            name: req.params.name
        }, (err, docs) => {
            removeFilesStore(docs.images)
        })
        data.files.forEach(file => {
            sync.push(new Promise((resolve, reject) => {
                var filePath = data.path + '/' + file;
                saveFileToStore(filePath, (err, docs) => {
                    resolve(docs._id)
                })
            }))
        })
        Promise.all(sync)
            .then(result => {
                fs.rmdir(data.path, (err, docs) => { })
                collection.banner.findOneAndUpdate(
                    {
                        name: req.params.name
                    },
                    {
                        images: result
                    }, (err, docs) => {
                        console.log(docs)
                        res.redirect('/ad/banner')
                    })
            })

    },
    savePostInfomation: function (req, res) {
        collection.post.information.findOneAndUpdate(
            {
                pointName: req.params.pointName,
                name: req.params.infName,
            },
            {
                delta: JSON.parse(req.body.fields.delta)
            },
            (err, docs) => {
                fs.rmdir(req.body.path, (err, docs) => { })
                console.log(docs)
                res.send()
            })
    }
}
