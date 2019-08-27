var admin = require('../modules/admin')
var formidable = require('formidable')
var fs = require('fs')
module.exports = function (app) {
    app
        .get('/ad/banner', admin.banner)
        .get('/ad/detail', admin.detail)
        .get('/ad/login', admin.login)
        .get('/ad/news', admin.news)
        .get('/ad/product', admin.product)
        .get('/ad/search', admin.search)

        .post('/ad/saveProduct', handPost, admin.saveProduct)
}
function handPost(req, res, next) {
    var form = new formidable.IncomingForm()
    var path = `./public/upload/${Math.floor(Math.random() * Math.floor(999999999999)).toString()}`
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
                            req.body = {
                                fields: fields,
                                files: files,
                                path: path
                            }
                            next()
                        }
                    })
                }
            })
        }
    })
}