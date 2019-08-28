var formidable = require('formidable')
var fs = require('fs')
var database = require('../models/mlab')
var config = require('../models/config')
var mongoose = require('mongoose')

module.exports = {
    initialize: function (app) {
        mongoose.connect(config.mongoose.uri, { useNewUrlParser: true }, (err) => {
            if (!err) {
                console.log('Kết nối thành công tới mongodb');
            } else {
                console.log(err)
                throw err
            }
        })
    },
    collection: database,
    getStore: function (req, res) {
        var { store } = database
        store.findById(req.params.id, (err, docs) => {
            if (docs) {
                res.contentType(docs.contentType)
                res.send(docs.data)
            } else {
                res.redirect('/assets/img/no-image.png')
            }
        })
    },
    saveFileToStore: function (filePath, callback) {
        var { store } = database
        var data = new store()
        data.contentType = 'image/png'
        data.data = fs.readFileSync(filePath)
        data.save((err, docs) => {
            if (err) throw err
            fs.unlink(filePath, err => {
                callback(err, docs)

            })
        })
    }
}