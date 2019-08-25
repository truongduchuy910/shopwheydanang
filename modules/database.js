var formidable = require('formidable')
var mongoose = require('mongoose')
var fs = require('fs')

module.exports = {
    initialize: function (config, app) {
        require('../models/database').initialize(config)
        require('../routers/database')(app)
    },
    getStore: function (req, res) {
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