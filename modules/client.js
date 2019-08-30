var { collection } = require('./mlab')
var config = require('../models/config')
var { QuillDeltaToHtmlConverter } = require('quill-delta-to-html');

module.exports = {
    home: function (req, res) {
        Promise.all([
            new Promise((resolve, reject) => {
                collection.attribute.find({},
                    (err, docs) => {
                        resolve(docs)
                    })
            }),
            new Promise((resolve, reject) => {
                collection.product.basis.find(
                    {}
                    , (err, docs) => {
                        resolve(docs)
                    }
                ).limit(6).sort({ createDate: 'desc' })
            }),
            new Promise((resolve, reject) => {
                collection.product.basis.find(
                    {}
                    , (err, docs) => {
                        resolve(docs)
                    }
                ).limit(9).sort({ modifyDate: 'desc' })
            }),
            new Promise((resolve, reject) => {
                collection.banner.find({},
                    (err, docs) => {
                        resolve(docs)
                    })
            }),
        ])
            .then(result => {
                res.render('pages/index', {
                    setting: config.setting,

                    categorys: result[0],
                    newProducts: result[1],
                    bestsellerProducts: result[2],
                    banners: result[3]
                })

            })
    },
    detail: function (req, res) {
        Promise.all([
            new Promise((resolve, reject) => {
                collection.attribute.find({},
                    (err, docs) => {
                        resolve(docs)
                    })
            }),
            new Promise((resolve, reject) => {
                collection.product.basis.findById(
                    req.params.id
                    , (err, docs) => {
                        resolve(docs)
                    }
                )
            })
        ])
            .then(result => {
                res.render('pages/detail', {
                    setting: config.setting,

                    categorys: result[0],
                    product: result[1]
                })

            })
    },
    catalog: function (req, res) {
        Promise.all([
            new Promise((resolve, reject) => {
                collection.attribute.find({},
                    (err, docs) => {
                        resolve(docs)
                    })
            })
        ])
            .then(result => {
                res.render('pages/catalog', {
                    setting: config.setting,
                    categorys: result[0],
                    searchProducts: []
                })

            })
    },
    search: function (req, res) {
        Promise.all([
            new Promise((resolve, reject) => {
                collection.attribute.find({},
                    (err, docs) => {
                        resolve(docs)
                    })
            }),
            new Promise((resolve, reject) => {
                var keyword = new RegExp(req.query.keyword, 'i')
                collection.product.basis.find({
                    name: keyword
                },
                    (err, docs) => {
                        resolve(docs)
                    })
            })
        ])
            .then(result => {
                res.render('pages/catalog', {
                    setting: config.setting,
                    categorys: result[0],
                    searchProducts: result[1]
                })

            })
    },
    searchBasis: function (req, res) {
        new Promise((resolve, reject) => {
            var keyword = new RegExp(req.query.keyword, 'i')
            collection.product.basis.find({
                name: keyword
            },
                (err, docs) => {
                    res.send({
                        storeUri: config.storeUri,
                        data: docs
                    })
                }).limit(6)
        })
    },
    post: function (req, res) {

        Promise.all([
            new Promise((resolve, reject) => {
                collection.attribute.find({},
                    (err, docs) => {
                        resolve(docs)
                    })
            }),
            new Promise((resolve, reject) => {
                collection.post.information.findOne({
                    pointName: req.params.pointName
                }, (err, docs) => {
                    var html = new QuillDeltaToHtmlConverter(docs.delta, {}).convert()
                    resolve(html)
                })
            })
        ])
            .then(result => {
                res.render('pages/post', {
                    setting: config.setting,
                    categorys: result[0],
                    post: result[1]
                })

            })

    },
    getDetail: function (req, res) {
        Promise.all([
            new Promise((resolve, reject) => {
                collection.product.attribute.find(
                    { pointId: req.params.id },
                    (err, docs) => {
                        var result = new Object
                        config.setting.product.attributes.forEach(attr => {
                            result[attr.name] = {
                                content: attr.content,
                                data: new Array
                            }
                        })
                        docs.forEach(attr => {
                            if (attr.content) result[attr.name].data.push(attr.content)
                        })
                        resolve(result)
                    }
                )
            }),
            new Promise((resolve, reject) => {
                collection.product.information.find(
                    { pointId: req.params.id },
                    (err, docs) => {

                        var result = new Object
                        config.setting.product.informations.forEach(inf => {
                            result[inf.name] = {
                                content: inf.content
                            }
                        })
                        docs.forEach(inf => {
                            if (inf.delta) result[inf.name].html = new QuillDeltaToHtmlConverter(inf.delta, {}).convert()
                        })
                        resolve(result)
                    }
                )
            })
        ])
            .then(result => {
                res.send({
                    attributes: result[0],
                    informations: result[1]
                })
            })
    },
    getProductByAttribute: function (req, res) {
        collection.attribute.findById(req.params.id,
            (err, docs) => {
                collection.product.attribute.find(
                    {
                        name: docs.name,
                        content: docs.content
                    }
                    , (err, docs) => {
                        var products = new Array
                        docs.forEach(attr => {
                            products.push(
                                new Promise((reslove, reject) => {
                                    collection.product.basis.findById(attr.pointId,
                                        (err, docs) => {
                                            reslove(docs)
                                        })
                                })
                            )
                        })
                        Promise.all(products)
                            .then(result => {
                                res.send({
                                    storeUri: config.storeUri,
                                    data: result
                                })
                            })
                    }
                )

            }
        )
    }
}