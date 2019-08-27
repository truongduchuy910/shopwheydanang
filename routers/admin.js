var admin = require('../modules/admin')
var formidable = require('formidable')
var fs = require('fs')
module.exports = function (app) {
    app
        .get('/ad/banner', admin.banner)
        .get('/ad/detail/:id', admin.detail)
        .get('/ad/login', admin.login)
        .get('/ad/news', admin.news)
        .get('/ad/product', admin.product)
        .get('/ad/search', admin.search)

        .post('/ad/saveProduct', handPost, admin.saveProduct)
        .post('/ad/updateName/:id', handPost, admin.updateName)
        .post('/ad/updatePrice/:id', handPost, admin.updatePrice)
        .post('/ad/updateSale/:id', handPost, admin.updateSale)
        .post('/ad/updateImage/:id', handPost, admin.updateImage)

        .post('/ad/saveAttribute/:id/:name', handPost, admin.saveAttribute)
        .get('/ad/removeAttribute/:id/:attrId', handPost, admin.removeAttribute)
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