var { collection } = require('./mlab')
var config = require('../models/config')

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
    product: function (req, res) {
        res.render('pages/product')
    },
    check: function (req, res) {
        res.render('pages/check')
    },
    policy: function (req, res) {
        res.render('pages/policy')
    },
}