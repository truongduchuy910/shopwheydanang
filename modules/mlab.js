var formidable = require('formidable')
var mongoose = require('mongoose')
var fs = require('fs')
var database = require('../models/mlab')
module.exports = {
    initialize: function (config, app) {
        require('../models/mlab').initialize(config)
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
    saveStore: database.saveStore
}