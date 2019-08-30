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
    check: function (req, res) {
        res.render('pages/check')
    },
    policy: function (req, res) {
        res.render('pages/policy')
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
    }
}