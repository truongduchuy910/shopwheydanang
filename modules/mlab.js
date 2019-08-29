var formidable = require('formidable')
var fs = require('fs')
var database = require('../models/mlab')
var config = require('../models/config')
var mongoose = require('mongoose')

module.exports = {
    initialize: function () {
        mongoose.connect(config.mongoose.uri, { useNewUrlParser: true }, (err) => {
            if (!err) {
                console.log('Kết nối thành công tới mongodb');
                config.setting.banner.forEach(banner => {
                    database.banner.find({
                        name: banner.name
                    }, (err, docs) => {
                        if (!docs.length) {
                            var data = new database.banner()
                            data.name = banner.name
                            data.content = banner.content
                            data.type = banner.type
                            data.save((err, docs) => {
                                console.log(docs)
                            })

                        }
                    })
                })
                config.setting.post.forEach(post => {
                    post.informations.forEach(inf => {
                        database.post.information.find({
                            name: inf.name,
                            pointName: post.name
                        }, (err, docs) => {
                            if (!docs.length) {
                                var data = new database.post.information()
                                data.name = inf.name
                                data.pointName = post.name
                                data.save((err, docs) => {
                                    console.log(docs)
                                })
                            }
                        })
                    })
                })
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
    },
    removeFilesStore: function (listId) {
        var { store } = database
        listId.forEach(id => {
            store.findByIdAndRemove(id, (err, docs) => {

            })
        })

    }
}