var formidable = require('formidable')
var mongoose = require('mongoose')
var fs = require('fs')
var database = require('../models/mlab')
module.exports = {
    initialize: function (config, app) {
        require('../models/mlab').initialize()
        require('../routers/mlab')(app)
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
            console.log(err, docs)
            if (err) throw err
            callback(err, docs)
        })
    }
}